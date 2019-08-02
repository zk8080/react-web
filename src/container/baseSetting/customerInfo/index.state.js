import {observable, action, toJS} from 'mobx';
import Service from './index.service';
import { message } from 'antd';
import {formUtils} from '@utils';

class State {

    // 查询组件数据
    @observable queryForm = {};
    @action setQueryForm = (obj = {}) => {
        this.queryForm = obj;
    }

    // 分页数据
    @observable pageInfo = {
        current: 1,
        pageSize: 15,
        total: 15
    }
    @action setPageInfo = (obj = {}) => {
        this.pageInfo = obj;
    }

    // 表格数据（客户档案）
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }

    //获取表格数据（客户档案）
    @action getCustomerList = async (page) => {
        const params = {
            search: formUtils.formToParams(this.queryForm),
            ...this.pageInfo,
            ...page
        };
        const res = await Service.getCustomerList(params);
        try{
            if(res.data.code === 0){
                const {rows, current, pageSize, total} = res.data.data;
                this.setTableList(rows);
                this.setPageInfo({
                    current,
                    pageSize,
                    total
                });
            }else{
                message.error(res.data.msg);
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

    // 配置商品
    @action relateGoods = (record) => {
        this.toggleProductVisible();
        this.setCurCustomerInfo(record);
        this.getProductList();
    }

//-----------------------------新增与修改的弹窗--------------------------------------------------------------------------------------------------------------------------------------
    // 编辑弹窗显示标识（修改弹窗是否可见）
    @observable visible = false;
    @action toggleVisible = () => {
        this.visible = !this.visible;
    }

    // 详情弹窗是否可编辑（修改弹窗数据是否可修改）
    @observable disabled = true;
    @action toggleDisabled = (bol = false) => {
        this.disabled = bol;
    }

    // 弹窗状态标识，从新增进入还是修改进入 新增： true; 修改：false;
    @observable isAdd = false;
    @action setIsAdd = (bol = false) => {
        this.isAdd = bol;
    }

    // 保存(点击修改和新增的保存按钮)
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

//-----------------------------商品列表弹窗--------------------------------------------------------------------------------------------------------------------------------------

    // 当前选中的客户信息(需要展示在商品列表中)
    @observable curCustomerInfo = {};
    @action setCurCustomerInfo = (obj = {}) => {
        this.curCustomerInfo = obj;
    }

    // 商品列表弹窗显示标识
    @observable productVisible = false;
    @action toggleProductVisible = () => {
        this.productVisible = !this.productVisible;
    }

    // 客户-商品列表
    @observable productList = [];
    @action setProductList = (arr = []) => {
        this.productList = arr;
    }

    // 客户-商品分页
    @observable customerProdPage = {
        current: 1,
        pageSize: 15,
        total: 15
    }
    @action setProdPage = (obj = {}) => {
        this.customerProdPage = obj;
    }

    // 查询客户-商品数据
    @action getProductList = async(page) => {
        const params = {
            customerId: this.curCustomerInfo.id,
            loadGrid: {
                ...this.customerProdPage,
                ...page
            }
        };
        const res = await Service.getProductList(params);
        try{
            if(res.data.code === 0){
                const {rows, pageSize, total, current} = res.data.data;
                this.setProductList(rows);
                this.setProdPage({
                    current,
                    pageSize,
                    total
                });
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
        this.toggleDetailVisible();
        this.getCurProduct();
        this.toggleProductVisible();
    }

    //商品列表弹窗中删除按钮
    @action deleteProduct = async (record = {}) => {
        const params = {
            ids: [record.id]
        };
        const res = await Service.deleteProduct(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.getProductList();
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // projectList点击确定按钮，确定商家与商品间的关联关系
    @action productListSave = () => {
        this.toggleProductVisible();
    }

//-----------------------------商品详情弹窗--------------------------------------------------------------------------------------------------------------------------------------
    // 商品详情弹窗标识
    @observable detailVisible = false;
    @action toggleDetailVisible = () => {
        this.detailVisible = !this.detailVisible;
    }

    // 详情弹窗取消按钮
    @action cancelProdiuct = () => {
        this.toggleDetailVisible();
        this.toggleProductVisible();
    }

    // 商品详情数据(查询条件)
    @observable detailFormData = {};
    @action setDetailFormData = (obj = {}) => {
        this.detailFormData = obj;
    }


    // 商品详情保存按钮(批量选择，将选择的插入到商品列表中)
    @action productSave = async (obj = []) => {
        const customerInfo = toJS(this.curCustomerInfo);
        const barCodeArr = obj.map(item => item.barCode );
        const params = {
            customerId: customerInfo.id,
            commodityCodes: barCodeArr
        };
        const res = await Service.batchBindCommodities(params);
        try{
            if(res.data.code === 0){
                this.getProductList();
                this.toggleProductVisible();
                this.toggleDetailVisible();
                message.success(res.data.msg);
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 商品详情table
    @observable curProduct = [];
    @action setCurProductUrl = (arr = []) => {
        this.curProduct = arr;
    }

    // 商品详情分页
    @observable productPage = {
        current: 1,
        pageSize: 15,
        total: 15
    }
    @action setCurProdPage = (obj = {}) => {
        this.productPage = obj;
    }


    // 查询当前客户未关联的商品
    @action getCurProduct = async (obj = {}) => {
        const customerInfo = toJS(this.curCustomerInfo);
        const params = {
            customerCode: customerInfo.customerCode,
            ...this.productPage,
            ...obj
        };
        const res = await Service.getCurProduct(params);
        try{
            if(res.data.code === 0){
                const {rows, current, pageSize, total} = res.data.data;
                this.setCurProductUrl(rows);
                this.setCurProdPage({
                    current,
                    pageSize,
                    total
                });
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 关联库位弹窗
    @observable storeVisible = false;
    @action setStoreVisible = (bol) => {
        this.storeVisible = bol;
    }

    // 关闭库位弹窗
    @observable closeStoreModal = () => {
        this.setStoreVisible(false);
    }

    // 当前商家已分配库位列表
    @observable bindStoreList = [];
    @action setBindStoreList = (arr = []) => {
        this.bindStoreList = arr;
    }

    // 已分配库位分页
    @observable bindStorePage = {
        current: 1,
        pageSize: 15,
        total: 15
    }
    @action  setBindStorePage = (obj = {}) => {
        this.bindStorePage = obj;
    }

    // 查询当前商家已分配库位
    @action getBindStore = async () => {
        const customerInfo = toJS(this.curCustomerInfo);
        const params = {
            search: {
                customerCode: customerInfo.customerCode
            },
            ...this.bindStorePage
        };
        const res = await Service.bindCustomerStore(params);
        try{
            if(res.data.code === 0){
                const {rows, current, pageSize, total} = res.data.data;
                this.setBindStoreList(rows);
                this.setBindStorePage({
                    current,
                    pageSize,
                    total
                });
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }

    }

    // 点击分配库位
    @action dealStore = (record) => {
        this.setStoreVisible(true);
        this.setCurCustomerInfo(record);
        this.getBindStore();
    }

    // 分配库位确认
    @action bindStore = async (obj) => {
        const customerInfo = toJS(this.curCustomerInfo);
        const params = {
            customerId: customerInfo.id,
            ...obj
        };
        const res = await Service.batchBind(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.cancelStoreList();
                this.getBindStore();
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }

    }

    // 库位列表弹窗标识
    @observable storeListVisible = false;
    @action setStoreListVisible = (bol) => {
        this.storeListVisible = bol;
    }

    // 点击新增库位
    @action addStore = () => {
        this.getStoreList();
        this.setStoreListVisible(true);
        this.setStoreVisible(false);
    }

    // 删除已分配库位
    @action deleteStore = async (record) => {
        const params = {
            id: record.id
        };
        const res = await Service.deleteStore(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.getBindStore();
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 关闭库位列表
    @action cancelStoreList = () => {
        this.setStoreListVisible(false);
        this.setStoreVisible(true);
    }

    // 未关联的库位
    @observable storeList = [];
    @action setStoreList = (arr = []) => {
        this.storeList = arr;
    }

    // 库位列表分页
    @observable storeListPage = {
        current: 1,
        pageSize: 15,
        total: 15
    };
    @action setStoreListPage = (obj) => {
        this.storeListPage = obj;
    }

    // 查询未关联库位
    @action getStoreList = async (params) => {
        const res = await Service.getNocustomerStore({
            ...params
        });
        try{
            if(res.data.code === 0){
                const {rows, current, pageSize, total} = res.data.data;
                this.setStoreList(rows);
                this.setStoreListPage({
                    current,
                    pageSize,
                    total
                });
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
