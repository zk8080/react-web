import {observable, action, toJS} from 'mobx';
import Service from './index.service';
import { message } from 'antd';
import beginCheckState from '../beginCheck/index.state';

class State {

    // 查询组件数据
    @observable queryForm = {};
    @action setQueryForm = (obj = {}) => {
        this.queryForm = obj;
    }

    //查询条件：商家名称下拉列表获取数据
    @observable merchantsList = [];
    @action setMerchantsList = (arr = []) => {
        this.merchantsList = arr;
    }
    @action getMerchantsList = async () => {
        let res = await Service.getMerchantsList({});
        try{
            if(res.data.code === 0){
                const {rows=[]} = res.data.data;
                this.setMerchantsList(rows);
            }else{
                console.log(res.data.msg);
            }
        }catch(e){
            console.log(e);
        }
    }

    // 表格数据
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }
    //获取表格数据
    @action getTableList = async (params = {}) => {
        const paramsObj = Object.assign({},{...params}, {
            checkType: 'Y',
            customerId: '1'
        });
        const res = await Service.getProductList(paramsObj);
        try{
            if(res.data.code === 0){
                // const {rows} = res.data.data;
                this.setTableList(res.data.data);
            }else{
                console.log(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }


    //保存所有的ID，取消盘点也要用的
    @observable storeIdList = [];
    @action setStoreIdList = (arr=[]) => {
        this.storeIdList = arr;
    }

    //点击开始盘点
    @action beginCheck = async (callback) => {
        let data = toJS(this.tableList);
        let arr = [];
        data.map(item=>{
            arr.push(item.storehouseId);
        })
        this.setStoreIdList(arr);
        const paramsObj = Object.assign({}, {
            storeIdList: arr
        });
        const res = await Service.beginCheck(paramsObj);
        try{
            if(res.data.code === 0){
                // const {rows} = res.data.data;
                beginCheckState.setTableList(res.data.data);
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

    // 组件销毁是重置state
    @action resetState = () => {
        
    }
}

export default new State();