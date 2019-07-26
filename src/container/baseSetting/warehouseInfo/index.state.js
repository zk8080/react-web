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
    @action getQueryData = async (params = {}) => {
        const res = await Service.getQueryData(params);
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

    // 弹窗状态标识，从新增进入还是修改进入 新增： true; 修改：false;
    @observable isAdd = false;
    @action setIsAdd = (bol = false) => {
        this.isAdd = bol;
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
        this.toggleVisible();
    }

    // 保存
    @action saveData = async (obj) => {
        let res;
        if(this.isAdd){
            res = await Service.addHouse(obj);
        }else{
            res = await Service.editHouse(obj);
        }
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.toggleVisible();
                this.getQueryData();
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
        const res = await Service.deleteHouse(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.getQueryData();
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }

    }

    // 停用
    @action stopClick = (record) => {

    }
}

export default new State();