import {observable, action, toJS} from 'mobx';
import Service from './index.service';
import { message } from 'antd';

class State {

    // 查询组件数据
    @observable queryForm = {};
    @action setQueryForm = (obj = {}) => {
        this.queryForm = obj;
    }

    // 分页数据
    @observable pageObj = {
        current: 1,
        size: 10
    }
    @action setPageObj = (obj) => {
        this.setPageObj = obj;
    }

    // 表格数据
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }

    //获取表格数据
    @action getCustomerList = async (params = {}) => {
        const paramsObj = {...params, ...{
            current: 1,
            size: 10
        }};
        const res = await Service.getCustomerList(paramsObj);
        try{
            if(res.data.code === 0){
                const {rows} = res.data.data;
                this.setTableList(rows);
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

    // 弹窗状态标识，从新增进入还是修改进入 新增： true; 修改：false;
    @observable isAdd = false;
    @action setIsAdd = (bol = false) => {
        this.isAdd = bol;
    }

    // 新增按钮
    @action addClick = () => {
        this.setEditForm();
        this.setIsAdd(true);
        this.toggleDisabled(false);
        this.toggleVisible();
    }

    // 点击修改
    @action editClick = (record) => {
        this.toggleDisabled(true);
        this.setIsAdd(false);
        this.setEditForm(record);
        this.toggleVisible();
    }

    // 保存
    @action saveData = async (obj) => {
        let res;
        if(this.isAdd){
            res = await Service.addCustomer(obj);
        }else{
            res = await Service.editCustomer(obj);
        }
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.toggleVisible();
                this.getCustomerList();
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
        const param = {
            id: record.id
        };
        const res = await Service.deleteCustomer(param);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.getCustomerList();
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 当前选中的客户信息 
    @observable curCustomerInfo = {};
    @action setCurCustomerInfo = (obj = {}) => {
        this.curCustomerInfo = obj;
    }

    // 客户-商品列表
    @observable productList = [];
    @action setProductList = (arr = []) => {
        this.productList = arr;
    }

    // 商品列表弹窗显示标识
    @observable productVisible = false;
    @action toggleProductVisible = () => {
        this.productVisible = !this.productVisible;
    }

    // 点击关联商品按钮
    @action relateGoods = (record) => {
        this.toggleProductVisible();
        this.setCurCustomerInfo(record);
        this.getProductList();
    }

    // 查询客户-商品数据
    @action getProductList = async() => {
        
        const params = {
            customerId: this.curCustomerInfo.id
        };
        const res = await Service.getProductList(params);
        try{
            if(res.data.code === 0){
                const {rows} = res.data.data;
                this.setProductList(rows);
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 商品列表弹窗 新增按钮
    @action addProduct = () => {
        this.setDetailFormData();
        this.toggleProductDisabled(false);
        this.toggleDetailVisible();
        this.toggleProductVisible();
        this.setIsDetailAdd(true);
    }

    // 商品列表 修改按钮
    @action updateProduct = (record) => {
        this.setDetailFormData(record);
        this.toggleProductDisabled(true);
        this.toggleDetailVisible();
        this.toggleProductVisible();
        this.setIsDetailAdd(false);
    }

    // 商品详情弹窗标识
    @observable detailVisible = false;
    @action toggleDetailVisible = () => {
        this.detailVisible = !this.detailVisible;
    }

    // 商品详情数据
    @observable detailFormData = {};
    @action setDetailFormData = (obj = {}) => {
        this.detailFormData = obj;
    }

    // 详情弹窗取消按钮
    @action cancelProdiuct = () => {
        this.toggleDetailVisible();
        this.toggleProductVisible();
        this.toggleProductDisabled(true);
    }

    // 详情弹窗是否可编辑
    @observable productDisabled = true;
    @action toggleProductDisabled = (bol = false) => {
        this.productDisabled = bol;
    }

    // 商品详情弹窗状态标识，从新增进入还是修改进入 新增： true; 修改：false;
    @observable isDetailAdd = false;
    @action setIsDetailAdd = (bol = false) => {
        this.isDetailAdd = bol;
    }

    // 商品详情保存按钮
    @action productSave = async (obj = {}) => {
        const customerInfo = toJS(this.curCustomerInfo);
        const params = {
            ...obj,
            customerId: customerInfo.id,
            commodityCode: obj.barCode
        };
        console.log( params, '----params-----' );
        let res;
        if( this.isDetailAdd ){
            res = await Service.addProduct(params);
        }else{
            res = await Service.updateProduct(params);
        }
        try{
            if(res.data.code === 0){
                this.getProductList();
                this.toggleDetailVisible();
                this.toggleProductVisible();
                message.success(res.data.msg);
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 删除商品
    @action deleteProduct = async (record = {}) => {
        const params = {
            id: record.id
        };
        console.log( params, '----params---' );
        const res = await Service.deleteProduct(params);
        try{
            if(res.data.code === 0){
                this.getProductList();
                message.success(res.data.msg);
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }    

    // 所有商品
    @observable allProductList = [];
    @action setAllProductListUrl = (arr = []) => {
        this.allProductList = arr;
    }

    // 查询所有商品
    @action getAllProduct = async () => {
        const res = await Service.getAllProduct({});
        if(res.data.code === 0){
            const {rows} = res.data.data;
            this.setAllProductListUrl(rows);
        }else{
            message.error(res.data.msg);
        }
    }

}

export default new State();