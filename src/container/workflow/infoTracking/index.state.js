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
    @action detailClick = (records = {}) => {
        
    }
}

export default new State();