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
    @action getProductList = async (params = {}) => {
        const paramsObj = {...params, ...{
            currentPage: 1,
            pageSize: 15
        }};
        const res = await Service.getProductList(paramsObj);
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

    // 处理数据
    @action dealClick = async (record) => {
        console.log( record, '----record---' );
        const params = {
            id: record.id
        };
        const res = await Service.dealData(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
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