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

    // 表格数据
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
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
    @action setCurrent = (num = 1) => {
        this.pageInfo.current = num;
    }


    //获取表格数据
    @action getTableList = async (page = {}) => {
        const paramsObj = {
            ...formUtils.formToParams(this.queryForm),
            ...this.pageInfo,
            ...page
        };
        const res = await Service.getTableList(paramsObj);
        try{
            if(res.data.code === 0){
                const {records, current, pageSize, total} = res.data.data;
                this.setTableList(records);
                this.setPageInfo({
                    current,
                    pageSize,
                    total
                });
            }
        }
        catch(e){
            console.log(e);
        }
    }


    // 点击查看
    @action detailClick = records => {
        this.setEditForm(records);
        this.setProductList(records.detailList || []);
        this.setLogisticsList(records.logisticsInfo || []);
        this.toggleVisible();
    }


//--------------------------------查看弹窗-----------------------------------------------------------------------------------------------------
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

    // 表单编辑数据
    @observable editForm = {};
    @action setEditForm = (obj = {}) => {
        this.editForm = obj;
    }

    // 详情弹窗是否可编辑
    @observable disabled = true;
    @action toggleDisabled = (bol = false) => {
        this.disabled = bol;
    }

    // 商品信息
    @observable productList = [];
    @action setProductList = (arr = []) => {
        this.productList = arr;
    }

    // 物流信息
    @observable logisticsList = [];
    @action setLogisticsList = (arr = []) => {
        this.logisticsList = arr;
    }

    //点击提交
    @action saveClick = () => {

    }
}

export default new State();