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
    // 表格数据
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }

    //获取表格数据
    @action getTableList = async (page) => {
        const params = {
            search: formUtils.formToParams(this.queryForm),
            ...this.pageInfo,
            ...page
        };
        const res = await Service.getTableList(params);
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

    // 新增弹窗显示标识
    @observable addVisible = false;
    @action setAddVisible = (bol) => {
        this.addVisible = bol;
    }

    // 新增按钮
    @action addClick = () => {
        // this.setEditForm();
        this.setAddVisible(true);
    }

    // 关闭新增弹窗
    @action closeAddModal = () => {
        this.setAddVisible(false);
    }
    
    // 点击修改
    @action editClick = (record) => {
        this.toggleDisabled(true);
        this.setEditForm({
            ...record
        });
        this.getProductList(record.customerId, record.customerCode);
        this.toggleVisible();
    }

    // 新增保存
    @action saveData = async (obj) => {
        const res = await Service.addLocation(obj);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.setAddVisible(false);
                this.setProductList([]);
                this.setAllStoreList([]);
                this.getTableList();
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 修改保存
    @action updateData = async (obj) => {
        const res = await Service.updateLocation(obj);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.toggleVisible();
                this.setProductList([]);
                this.setAllStoreList([]);
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
    @action deleteClick = async(record) => {
        const params = {
            id: record.id
        };
        const res = await Service.deleteLocation(params);
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

    // 商家数据
    @observable customerList = [];
    @action setCustomerList = (arr = []) => {
        this.customerList = arr;
    }

    // 查询所有商家
    @action getCustomerList = async() => {
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

    // 商家下的商品数据
    @observable productList = [];
    @action setProductList = (arr = []) => {
        this.productList = arr;
    }

    // 查询客户-商品数据(由商家带出商品和库位)
    @action getProductList = async(id, option) => {
        if(!id){
            this.setProductList([]);
            this.setAllStoreList([]);
        }
        const customerCode = option.props? option.props.att.customerCode: option;
        const params = {
            customerId: id,
            loadGrid: {
                current: 1,
                pageSize: 10000
            }
        };
        const res = await Service.getProductList(params);
        try{
            if(res.data.code === 0){
                const {rows} = res.data.data;
                this.setProductList(rows);
                // 查询库位
                this.getStroeList(customerCode);
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 所有库位
    @observable allStoreList = [];
    @action setAllStoreList = (arr = []) => {
        this.allStoreList = arr;
    }

    // 查询库位
    @action getStroeList = async(id) => {
        const params = {
            customerCode: id,
            current: 1,
            pageSize: 10000
        };
        const res = await Service.getStroeList(params);
        try{
            if(res.data.code === 0){
                const {rows} = res.data.data;
                this.setAllStoreList(rows);
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