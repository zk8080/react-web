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
            pageSize: 15
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


    // 编辑弹窗显示标识
    @observable visible = false;
    @action toggleVisible = () => {
        this.visible = !this.visible;
    }

    // 弹窗状态标识，从新增进入还是修改进入 新增： true; 修改：false;
    @observable isAdd = false;
    @action setIsAdd = (bol = false) => {
        this.isAdd = bol;
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

    // 详情弹窗是否可编辑
    @observable disabled = true;
    @action toggleDisabled = (bol = false) => {
        this.disabled = bol;
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
        this.setEditTable(record.detailList);
        this.toggleVisible();
    }

    // 保存
    @action saveData = async (obj) => {
        let res;
        if(this.isAdd){
            res = await Service.addProduct(obj);
        }else{
            res = await Service.editProduct(obj);
        }
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.toggleVisible();
                this.getProductList();
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

}

export default new State();