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
    @action getRoleList = async (params = {}) => {
        const res = await Service.getRoleList(params);
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
        this.getMenuDetail(record);
        this.setEditForm(record);
        this.toggleDisabled(true);
        this.toggleVisible();
    }

    // 删除
    @action deleteClick = (record) => {
        console.log( '删除', record);
    }

    // 保存
    @action saveData = async(obj) => {
        let res;
        if( this.isAdd ){
            res = await Service.addRole(obj);
        }else{
            const params = {
                ...obj,
                state: 0
            };
            res = await Service.updateRole(params);
        }
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.toggleVisible();
                this.getRoleList();
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 当前角色菜单详情
    @observable curRoleMenu = [];
    @action setCurRoleMenu = (obj = {}) => {
        this.curRoleMenu = obj;
    }

    // 根据角色查询菜单
    @action getMenuDetail = async (record) => {
        const params = {
            roleKey: record.id
        };
        const res = await Service.getRoleMenu(params);
        try{
            if(res.data.code === 0){
                console.log( res.data, '-----data-----' );
            }
        }
        catch(e){
            console.log(e);
        }
    }
}

export default new State();
