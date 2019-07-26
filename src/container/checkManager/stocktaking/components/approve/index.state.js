import {observable, action, toJS} from 'mobx';
import Service from './index.service';
import { message } from 'antd';

class State {

    // 查询组件数据
    @observable queryForm = {};
    @action setQueryForm = (obj = {}) => {
        this.queryForm = obj;
    }

    // 查询参数
    @observable queryData = {};
    @action setQueryData = (obj = {}) => {
        this.queryData = obj;
    }

    //查询条件：商家下拉列表获取数据
    @observable merchantsList = [];
    @action setMerchantsList = (arr = []) => {
        this.merchantsList = arr;
    }
    @action getMerchantsList = async () => {

    }

    // 表格数据
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }
    //获取表格数据
    @action getTableList = async (params = {}) => {
        this.setQueryData(params);
        const paramsObj = {...params};
        const res = await Service.getProductList(paramsObj);
        try{
            if(res.data.code === 0){
                const rows = res.data.data;
                this.setTableList(rows);
            }else{
                console.log(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }


    //查询盘点人
    @observable checkUserList=[];
    @action setCheckUserList= (arr=[]) => {
        this.checkUserList = arr;
    }
    @action getCheckUserList = async() => {
        const res = await Service.getCheckUserList({});
        try{
            if(res.data.code === 0){
                const rows = res.data.data;
                this.setCheckUserList(rows);
            }else{
                console.log(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }


    //审核提交
    @action approveClick = async(params, callback) => {
        const res = await Service.approveClick(params);
        try{
            if(res.data.code === 0){
                this.getTableList(this.queryData);
                if(callback){
                    callback();
                }
            }else{
                console.log(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }
}

export default new State();