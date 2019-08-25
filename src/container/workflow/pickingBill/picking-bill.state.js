import React from 'react';
import { action,observable, toJS } from 'mobx';
import { $http } from '../../../utils/http';
import { defaultPage, LoadGrid } from '../../../utils/load-serve';
import { message, notification } from 'antd';
import { BaseState } from '../../../deploy/state/base-state';
import {session} from '@utils/index';
import {getLodop} from '@assets/LodopFuncs';
import {template, tableTemplate} from '@assets/pickTemplate.js';
import _ from 'lodash';
import moment from 'moment';
/**
 * 拣货单组件状态管理
 */
class PickingBillState extends BaseState{
    // eslint-disable-next-line no-useless-constructor
    constructor(...rest){
        super(...rest);
    }
	@observable visible = false;

	@observable pickNo = '';
	@observable basketNum;

	@observable page = defaultPage;
	@observable lockDataList = [];

	@observable invoices = [{
		barCode: 6925303722562,
		bayNums: 100,
		storeCode: 'SK-25-A1023',
		skuName: 'SK-2',
		single: '瓶',
		spec: '蓝色',
		modelNo: '720S'
	}, {
		barCode: 6925303722562,
		bayNums: 10,
		storeCode: 'SK-25-A1028',
		skuName: 'SK-3',
		single: '瓶',
		spec: '蓝色',
		modelNo: '720SQ'
	}];

	/**
	 * 加载数据
	 * @param param
	 */
	loadGrid = (param: LoadGrid = {}) => {
		this.post('pickBill/loadGrid', param, result => {

			if (result.status === 1) {
				// this.refreshDataList(result.data.rows);
				// this.refreshPage(result.data);
				this.loadGridFinished(result.data);
				// this.rowSelect.selectedRowKeys = [];
			}

		});

	}

	/**
	 * 关闭拣货单复检功能
	 */
	invoiceCheckClose = () => {

		if (!this.pickNo) {
			message.warning('请先锁定件货单号！');
		} else {

			this.get('order/invoiceCheckClose', {pickNo: this.pickNo}, result => {
				if (result.code !== 0) {
					notification.error({
						message: result.msg
					});
				} else {
					if (result.status === 1) {
						notification.warning({
							message: '拣货单复检结束',
							description: '复检异常情况已记录，请及时处理'
						});
					} else {
						message.success('拣货单复检结束');
					}
				}
			});
		}

	}

	generatorPickBill = () => {
		// message.info('功能并未开放');
		this.get('/pickBill/executeGenerator', {}, result => {

			if (result.code === 0) {
				this.loadGrid();
				message.info('已生成拣货单，请及时处理');
			}

		});
	}
	checkCommodity = (value) => {
		if (value) {
			if (!this.pickNo) {
				message.warning('请先锁定件货单号！');
			} else {
				this.get('pickBill/invoiceCheck', {
					pickNo: this.pickNo,
					commodityCode: value
				}, result => {
					if (result.code !== 0) {
						notification.error({
							message: result.msg
						});
					} else {
						this.lockPickBillData();
						this.visible = !this.visible;
						this.basketNum = result.data;
					}
				});
			}
		}
	}
	lockPickBill = (value) => {

		if (this.pickNo !== value) {
			this.pickNo = value;

			if (this.pickNo !== ''){
				this.lockPickBillData();
			}
		}

	}
	lockPickBillData = () => {
		this.get('pickBill/lockPickBillData', {pickNo: this.pickNo}, result => {

			if (result.code !== 0) {
				notification.error({
					message: result.msg
				});
			} else {
				this.lockDataList = result.data;
			}


		});
	}
	tipConfirm = () => {
		this.visible = !this.visible;
    }
    
    // 作废拣货单
    @action closePickBill = async (record) => {
        this.get('pickBill/cancel', {pickNo: record.pickNo}, result => {

			if (result.code == 0) {
				this.loadGrid();
			} else {
				notification.error({
					message: result.msg
				});
			}
		});
    }

    // 拣货单详情数据
    @observable pickBillDetailArr = [];
    @action setPickBillDetailArr = (arr = []) => {
        this.pickBillDetailArr = arr; 
    }

    // 查询拣货单信息并且打印
    @action queryPickBillDetail = (selectedRows, fn) => {
        const pickNos = selectedRows.map(item => item.pickNo);
        this.post('pickBill/generationInvoices', {pickNos: pickNos}, result => {

			if (result.code == 0) {
                this.setPickBillDetailArr(result.data);
                this.printPickBill(result.data);
                fn();
			} else {
				notification.error({
					message: result.msg
				});
			}
		});
    }

    // 打印拣货单
    printPickBill = (arr = []) => {
        const Lodop = getLodop();
        if(!Lodop.VERSION){
            return;
        }
        arr.map(item => {
            // 模板
            const htmlStr = _.template(template)({...item, date: moment().format('YYYY-MM-DD HH:mm')});
            // 表格模板
            const tableHtmlStr = _.template(tableTemplate)({tableData: item.commodities});
            Lodop.PRINT_INIT('');
            Lodop.ADD_PRINT_TEXT('2%','44%','30%','50px',`${item.customerName}拣货单`);
            Lodop.SET_PRINT_STYLEA(1, 'FontSize', 20);
            Lodop.SET_PRINT_STYLEA(1, 'FontWeight', 600);
            // 条形码
            Lodop.ADD_PRINT_BARCODE('5%','40%','30%','50px','128A',item.pickNo);
            // html内容模板
            Lodop.ADD_PRINT_HTM('10%', '1%', '98%', '94%', htmlStr);
            // 打印方向
            Lodop.SET_PRINT_PAGESIZE(1,'','', 'A4');
            // 打印表格
            Lodop.ADD_PRINT_TABLE('15%', '1%', '98%', '74%', tableHtmlStr);
            // Lodop.SET_PRINT_STYLEA(0,"AngleOfPageInside",-90);
            // Lodop.PREVIEW();
            // 打印返回结果
            Lodop.On_Return = (TaskID, value) => {
                // 打印成功
                if(value == true){
                    this.printPickSuccess([item.pickNo]);
                }
            };
            // 直接打印
            Lodop.PRINT();
        });
    }

    // 打印成功后 告诉后台修改打印次数
    @action printPickSuccess = (pickNos) => {
        this.post('pickBill/print', {pickNos: pickNos}, result => {

			if (result.code == 0) {
                this.loadGrid();
			}
		});
    }

    // 打印商品条码
    @action printBarCode = () => {
        const pickBillData = toJS(this.pickBillDetailArr);
        const Lodop = getLodop();
        if(!Lodop){
            return;
        }
        Lodop.PRINT_INIT('');
        pickBillData.map(item => {
            item.commodities.map((childItem, index) => {
                Lodop.ADD_PRINT_TEXT(`${5 * (1 + index)}%`,'1%','30%','50px',childItem.skuName);
                // 条形码
                Lodop.ADD_PRINT_BARCODE(`${5 * (1 + index)}%`,'30%','30%','50px','128A',childItem.barCode);
            });
        });
        Lodop.PREVIEW();
    }
}

export default new PickingBillState();