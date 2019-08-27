import {observable, action, toJS} from 'mobx';
import Service from './index.service';
import { message } from 'antd';
import {formUtils} from '@utils';

class State {

    // // 查询组件数据
    // @observable queryForm = {};
    // @action setQueryForm = (obj = {}) => {
    //     this.queryForm = obj;
    // }

    // 表格数据
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }

    // // 分页数据
    // @observable pageInfo = {
    //     current: 1,
    //     pageSize: 15,
    //     total: 15
    // }
    // @action setPageInfo = (obj = {}) => {
    //     this.pageInfo = obj;
    // }

    //获取表格数据
    @action getTableData = async (page) => {
        const params = {
            pageSize: 10000,
            current: 1
        };
        const res = await Service.getTableData(params);
        try{
            if(res.data.code === 0){
                const {rows} = res.data.data;
                this.setTableList(rows);
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 合包
    @action mergeOrder = async(orderArr = []) => {
        const params = orderArr;
        const res = await Service.mergeOrder(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.getTableData();
            }
        }
        catch(e){
            console.log(e);
        }
    }

}

export default new State();