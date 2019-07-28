import {observable, action} from 'mobx';
import Service from './index.service';
import { message } from 'antd';
import {formUtils} from '@utils';

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

    @observable menuList = [];
    @action setMenuList = (arr = []) => {
        this.menuList = arr;
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
    
    // 查询菜单列表
    @action getMenuList = async (page) => {
        const params = {
            search: formUtils.formToParams(this.queryForm),
            ...this.pageInfo,
            ...page
        };
        const res = await Service.getMenuList(params);
        try{
            if(res.data.code === 0){
                const {data} = res.data;
                this.setMenuList(data);
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 获取用户列表
    @action getRoleList = async (params = {}) => {
        const res = await Service.getRoleList(params);
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

    // 当前选中权限
    @observable curRoleInfo = {};
    @action setCurRoleInfo = (obj = {}) => {
        this.curRoleInfo = obj;
    }

    // 点击修改
    @action editClick = (record) => {
        this.getMenuDetail(record);
        this.setIsAdd(false);
        this.setCurRoleInfo(record);
        this.setEditForm(record);
        this.toggleDisabled(true);
        this.setIsAdd(false);
        this.toggleVisible();
    }

    // 删除
    @action deleteClick = async (record) => {
        const params = {
            roleKey: record.id,
            state: 0
        };
        const res = await Service.updateRole(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.getRoleList();
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 保存
    @action saveData = async(obj) => {
        let res;
        if( this.isAdd ){
            res = await Service.addRole(obj);
        }else{
            console.log( 111, '222' );
            const params = {
                ...obj,
                roleKey: this.curRoleInfo.id,
                state: 1
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

    // 所有菜单列表
    @observable menuList = [];
    @action setMenuList = (arr = []) => {
        this.menuList = arr;
    }

    // 查询所有菜单
    @action getMenuList = async () => {
        const params = {};
        const res = await Service.getMenuList(params);
        try{
            if(res.data.code === 0){
                const {data} = res.data;
                this.setMenuList(data);
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
                const {data} = res.data;
                this.setCurRoleMenu(data);
            }
        }
        catch(e){
            console.log(e);
        }
    }
}

export default new State();
