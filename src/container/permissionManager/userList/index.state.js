import {observable, action} from 'mobx';
import Service from './index.service';
import { message } from 'antd';

class State {

    //用户列表
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }

    // 查询组件数据
    @observable queryForm = {};
    @action setQueryForm = (obj = {}) => {
        this.queryForm = obj;
    }

    // 获取用户列表
    @action getUserList = async (params = {}) => {
        const res = await Service.getUserList(params);
        console.log(res, 'res');
        try{
            if(res.data.ret === 0){
                const {data} = res.data.data;
                this.setTableList(data);
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 详情数据
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

    // 新增按钮
    @action addClick = () => {
        this.setEditForm();
        this.toggleDisabled(false);
        this.toggleVisible();
    }

    // 点击修改
    @action editClick = (record) => {
        console.log( record, '修改' );
        this.setEditForm(record);
        this.toggleDisabled(true);
        this.toggleVisible();
    }

    // 删除
    @action deleteClick = (record) => {
        console.log( '删除', record);
    }

    // 保存
    @action saveData = (obj) => {
        console.log(obj, '-----obj-----');
    }
}

export default new State();
