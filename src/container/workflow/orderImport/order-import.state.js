import { observable, action, toJS } from 'mobx';
import { defaultPage, LoadGrid } from '../../../utils/load-serve';
import { BaseState } from '../../../deploy/state/base-state';
import Service from './index.service';
import {message} from 'antd';
/**
 * 订单导入
 */
class OrderImportState extends BaseState{
    // eslint-disable-next-line no-useless-constructor
    constructor(...rest){
        super(...rest);
    }
	@observable orderCommodityData: [];
	@action refreshOrderCommodityDate = (orderCommodityData = []) => {
		this.orderCommodityData = orderCommodityData;
	}

	loadGrid = (param: LoadGrid = {}) => {
		this.post('/order/loadGrid', param, result => {
			if (result.status === 1) {
				this.loadGridFinished(result.data);
				// this.refreshDataList(result.data.rows);
				// this.refreshPage(result.data);
			}
		});
    }
    
    // 编辑弹窗显示标识
    @observable visible = false;
    @action toggleVisible = () => {
        this.visible = !this.visible;
    }

    // 详情弹窗是否可编辑
    @observable disabled = true;
    @action toggleDisabled = (bol = false) => {
        this.disabled = bol;
    }

    // 删除商品列表数据
    @action deleteEditTable = (record) => {
        const dataSource = toJS(this.editTable);
        const newData = dataSource.filter(item => item.key !== record.key);
        this.setEditTable(newData);
    }

    // 保存商品列表数据
    @action handleSave = (row, key, option) => {
        const newData = toJS(this.editTable);
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        //如果是选择的商品名称，那就自动带出型号、规格、单位、商品条码、体积、重量
        let obj = {};
        console.log(option,'optionoption');
        if(key == 'commodityName' && option){
            const { modelNo, spec, singleUnit, barCode, singleVolume, singleWeight } = option.props.att;
            obj = {
                modelNo, 
                spec,
                unit: singleUnit,
                barCode: barCode,
                volume: singleVolume,
                weight: singleWeight
            };
        }
        newData.splice(index, 1, {
            ...item,
            ...row,
            ...obj
        });
        console.log( newData, '----newData--' , key,'key');
        
        this.setEditTable(newData);
    };

    // 表单编辑数据
    @observable editForm = {};
    @action setEditForm = (obj = {}) => {
        this.editForm = obj;
    }

    // 采购单中的商品列表
    @observable editTable = [];
    @action setEditTable = (arr = []) => {
        this.editTable = arr;
    }

    @observable count = 0;
    @action setDataKey = (arr = []) => {
        arr.map(item => {
            item['key'] = this.count;
            this.count ++;
        });
    }

    // 新增一行商品数据
    @action handleAdd = () => {
        const dataSource = toJS(this.editTable);
        const newData = {
            key: this.count,
            commodityName: null,
            modelNo: null,
            spec: null,
            unit: null,
            barCode: null,
            volume: null,
            weight: null,
            purchaseNums: null,
            arrivalDate: null,
            productionDate: null,
            shilfLife: null,
            remark: '',
        };
        this.count ++;
        this.setEditTable([...dataSource, newData]);
    }

    //点击查看
    @action lookClick = (record) => {
        this.toggleDisabled(true);
        this.setEditForm(record);
        this.setDataKey(record.orderCommodities);
        this.setEditTable(record.orderCommodities);
        this.toggleVisible();
    }

    // 点击修改
    @action editClick = (record) => {
        this.toggleDisabled(true);
        this.setEditForm(record);
        this.setDataKey(record.orderCommodities);
        this.setEditTable(record.orderCommodities);
        this.toggleVisible();
    }

    // 保存
    @action saveData = async (obj) => {
        const params = {
            ...obj,
            detailList: toJS(this.editTable)
        };
        const res = await Service.editProduct(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.toggleVisible();
                this.getTableList();
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

}

export default new OrderImportState();
