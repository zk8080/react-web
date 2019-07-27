import {observable, action, toJS} from 'mobx';
import Service from './index.service';
import { message } from 'antd';

class State {

    // 查询组件数据
    @observable queryForm = {};
    @action setQueryForm = (obj = {}) => {
        this.queryForm = obj;
    }

    // 表格数据
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }

    //获取表格数据
    @action getTableList = async (params = {}) => {
        const paramsObj = {...params, ...{
            currentPage: 1,
            pageSize: 15,
            billType: 1
        }};
        const res = await Service.getTableList(paramsObj);
        try{
            if(res.data.code === 0){
                const {records} = res.data.data;
                this.setTableList(records);
            }else{
                console.log(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

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


    // 商家列表
    @observable customerList = [];
    @action setCustomerList = (arr = []) => {
        this.customerList = arr;
    }
    
    // 获取商家列表
    @action getCustomerList = async () => {
        const res = await Service.getCustomerList({});
        try{
            if(res.data.code === 0){
                const {rows} = res.data.data;
                this.setCustomerList(rows);
            }else{
                console.log(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
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
            let { modelNo, spec, singleUnit, barCode, singleVolume, singleWeight } = option.props.att;
            obj = {
                modelNo, 
                spec,
                unit: singleUnit,
                barCode: barCode,
                volume: singleVolume,
                weight: singleWeight
            }
        }
        newData.splice(index, 1, {
            ...item,
            ...row,
            ...obj
        });
        console.log( newData, '----newData--' , key,'key');
        
        this.setEditTable(newData);
    };

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

    // 编辑弹窗显示标识
    @observable visible = false;
    @action toggleVisible = () => {
        this.visible = !this.visible;
    }

    // 弹窗状态标识，从新增进入还是修改进入, 新增： true; 修改：false; 
    @observable isAdd = false;
    @action setIsAdd = (bol = false) => {
        this.isAdd = bol;
    }
    // 判断是否是从查看进来的弹窗状态标识(detailsModal)
    @observable isLook = false;
    @action setIsLook = (bol = false) => {
        this.isLook = bol;
    }

    // 详情弹窗是否可编辑
    @observable disabled = true;
    @action toggleDisabled = (bol = false) => {
        this.disabled = bol;
    }

    // 新增按钮
    @action addClick = () => {
        this.setEditForm();
        this.setIsAdd(true);
        this.setIsLook(false);
        this.toggleDisabled(false);
        this.toggleVisible();
    }

    //点击查看
    @action lookClick = (record) => {
        this.toggleDisabled(true);
        this.setIsAdd(false);
        this.setIsLook(true);
        this.setEditForm(record);
        this.setDataKey(record.detailList);
        this.setEditTable(record.detailList);
        this.toggleVisible();
    }

    // 点击修改
    @action editClick = (record) => {
        this.toggleDisabled(true);
        this.setIsAdd(false);
        this.setIsLook(false);
        this.setEditForm(record);
        this.setDataKey(record.detailList);
        this.setEditTable(record.detailList);
        this.toggleVisible();
    }

    // 保存
    @action saveData = async (obj) => {
        const params = {
            ...obj,
            detailList: toJS(this.editTable)
        };
        let res;
        if(this.isAdd){
            res = await Service.addProduct(params);
        }else{
            res = await Service.editProduct(params);
        }
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

    // 删除
    @action deleteClick = async (record) => {
        const params = {
            id: record.id
        };
        const res = await Service.delete(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.getTableList();
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 点击收货
    @action receiptClick = (record) => {
        this.toggleDisabled(true);
        this.togglereceiptVisible();
        this.setEditForm(record);
        this.setDataKey(record.detailList);
        this.setEditTable(record.detailList);
    }

    

    // 审核按钮
    @action auditClick = (record) => {

    }


    //在新增和修改界面点击商品
    @action openSkuModal = (record = {}, index) => {
        this.setDetailFormData({});
        this.toggleDetailVisible();
        this.getProductList();
        this.setSkuIndex(index);
    }


//-----------------------------商家弹窗--------------------------------------------------------------------------------------------------------------------------------------
    //判断是那条数据点击了商品打开的弹窗
    @observable skuIndex = '';
    @action setSkuIndex = (num = '') => {
        this.skuIndex = num;
    }
    
    // 弹窗标识
    @observable detailVisible = false;
    @action toggleDetailVisible = () => {
        this.detailVisible = !this.detailVisible;
    }

    // 详情弹窗取消按钮
    @action cancelProdiuct = () => {
        this.toggleDetailVisible();
    }

    // 商品详情数据(查询条件)
    @observable detailFormData = {};
    @action setDetailFormData = (obj = {}) => {
        this.detailFormData = obj;
    }


    // 商品详情保存按钮
    @action productSave = async (obj = {}) => {
        let newData = toJS(this.editTable);
        const item = newData[this.skuIndex];
        //如果是选择的商品名称，那就自动带出型号、规格、单位、商品条码、体积、重量
        const { skuName, modelNo, spec, singleUnit, barCode, singleVolume, singleWeight } = obj;
        const newObj = {
            commodityName: skuName,
            modelNo, 
            spec,
            unit: singleUnit,
            barCode: barCode,
            volume: singleVolume,
            weight: singleWeight
        }
        
        newData[this.skuIndex] = {
            ...item,
            ...newObj
        };
        this.setEditTable(newData);
        this.toggleDetailVisible();
    }

    

    // 所有商品数据
    @observable productList = [];
    @action setProductList = (arr = []) => {
        this.productList = arr;
    }

    // 查询商品详情
    @action getProductList = async (value = {}) => {
        let params = {
            search: value
        }
        const res = await Service.getProductList(params);
        try{
            if(res.data.code === 0){
                const {rows} = res.data.data;
                this.setProductList(rows);
            }else{
                console.log(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }


//-----------------------------收货弹窗--------------------------------------------------------------------------------------------------------------------------------------
    // 收货确认单弹窗显示标识
    @observable receiptVisible = false;
    @action togglereceiptVisible = () => {
        this.receiptVisible = !this.receiptVisible;
    }

    // 收货确认单取消按钮
    @action cancelReceiptModal = () => {
        this.togglereceiptVisible();
    }

    //点击收货确认
    @action confirmClick = async (obj={}) => {
        const params = {
            ...obj,
            detailList: toJS(this.editTable)
        };
        const res = await Service.confirmReceive(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.togglereceiptVisible();
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

export default new State();