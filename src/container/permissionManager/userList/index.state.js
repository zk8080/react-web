import {observable, action, toJS} from 'mobx';
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

    // 角色列表
    @observable roleList = [];
    @action setRoleList = (arr = []) => {
        this.roleList = arr;
    }

    // 获取用户列表
    @action getRoleList = async (params = {}) => {
        const res = await Service.getRoleList({});
        try{
            if(res.data.code === 0){
                const {data} = res.data;
                this.setRoleList(data);
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 获取用户列表
    @action getUserList = async (params = {}) => {
        const res = await Service.getUserList(params);
        console.log(res, 'res');
        try{
            if(res.data.code === 0){
                const {data} = res.data;
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
        this.toggleDisabled(false);
        this.setIsAdd(true);
        this.toggleVisible();
    }

    // 用户详情信息
    @observable userDetail = {};
    @action setUserDetail = (obj = {}) => {
        this.userDetail = obj;
    }

    // 点击修改 查询用户角色
    @action editClick = async (record) => {
        const params = {
            userKey: record.id
        };
        const res = await Service.getUserRoleInfo(params);
        if(res.data.code === 0){
            const {data} = res.data;
            const roleList = data.roleList.map(item => item.id);
            const editData = {...data, roleList};
            this.setEditForm(editData);
            this.toggleDisabled(true);
            this.setIsAdd(false);
            this.toggleVisible();
        }else{
            message.error(res.data.msg);
        }
    }

    // 删除
    @action deleteClick = async (record) => {
        const params = {
            ...record,
            userKey: record.id,
            state: 1
        };
        const res = await Service.editUserInfo(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.getUserList();
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 保存
    @action saveData = async (obj) => {
        let res;
        if( this.isAdd ){
            res = await Service.addUser(obj);
        }else{
            const params = {
                ...obj,
                state: 0
            };
            res = await Service.editUserInfo(params);
        }
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.toggleVisible();
                this.getUserList();
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
