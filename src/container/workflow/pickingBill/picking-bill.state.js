import React from 'react';
import { action,observable } from 'mobx';
import { $http } from '../../../utils/http';
import { defaultPage, LoadGrid } from '../../../utils/load-serve';
import { message, notification } from 'antd';
import { BaseState } from '../../../deploy/state/base-state';

/**
 * 拣货单组件状态管理
 */
export class PickingBillState extends BaseState{
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
	loadGrid(param: LoadGrid = {}) {
		this.post('pickBill/loadGrid', param, result => {

			if (result.status === 1) {
				// this.refreshDataList(result.data.rows);
				// this.refreshPage(result.data);
				this.loadGridFinished(result.data);
				this.rowSelect.selectedRowKeys = [];
			}

		});

	}

	/**
	 * 关闭拣货单复检功能
	 */
	invoiceCheckClose() {

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

	generatorPickBill() {
		// message.info('功能并未开放');
		this.get('/pickBill/executeGenerator', {}, result => {

			if (result.code === 0) {
				this.loadGrid();
				message.info('已生成拣货单，请及时处理');
			}

		});
	}
	checkCommodity(value) {
		if (value) {
			if (!this.pickNo) {
				message.warning('请先锁定件货单号！');
			} else {
				this.get('order/invoiceCheck', {
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
	lockPickBill(value) {

		if (this.pickNo !== value) {
			this.pickNo = value;

			if (this.pickNo !== ''){
				this.lockPickBillData();
			}
		}

	}
	lockPickBillData() {
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
	tipConfirm() {
		this.visible = !this.visible;
	}
}
