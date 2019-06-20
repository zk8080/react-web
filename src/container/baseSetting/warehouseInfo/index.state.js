import {observable, action, toJS} from 'mobx';
import Service from './index.service';

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
    @action getCustomerList = async (params = {}) => {
        const res = await Service.getCustomerList(params);
        try{
            if(res.data.ret === 0){
                const {data} = res.data.data;
                this.setTableList(data);
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

    // 新增按钮
    @action addClick = () => {
        this.setEditForm();
        this.toggleDisabled(false);
        this.toggleVisible();
    }

    // 点击修改
    @action editClick = (record) => {
        console.log( record, '修改' );
        this.toggleDisabled(true);
        this.setEditForm(record);
        this.toggleVisible();
    }

    // 保存
    @action saveData = (obj) => {
        console.log(obj, '-----obj-----');
    }

    // 删除
    @action deleteClick = (record) => {
        console.log( '删除', record);
    }
}

export default new State();