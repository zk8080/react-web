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
    @action getProductList = async () => {
        const params = toJS(this.queryForm);
        const res = await Service.getProductList(params);
        try{
            if(res.data.ret === 0){
                const {productList} = res.data.data;
                this.setTableList(productList);
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

    // 新增按钮
    @action addClick = () => {
        this.setEditForm();
        this.toggleVisible();
    }

    // 编辑弹窗显示标识
    @observable visible = false;
    @action toggleVisible = () => {
        this.visible = !this.visible;
    }

    // 点击修改
    @action editClick = (record) => {
        console.log( record, '修改' );
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