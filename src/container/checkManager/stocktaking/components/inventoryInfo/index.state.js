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

    // 查询参数
    @observable queryData = {};
    @action setQueryData = (obj = {}) => {
        this.queryData = obj;
    }

    //查询条件：商家名称下拉列表获取数据
    @observable merchantsList = [];
    @action setMerchantsList = (arr = []) => {
        this.merchantsList = arr;
    }
    @action getMerchantsList = async () => {
        const res = await Service.getMerchantsList({});
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


    // 库存数据
    @observable areaCodeList = [];
    @action setAreaCodeList = (arr = []) => {
        this.areaCodeList = arr;
    }
    // 库存是根据商家联动来的
    @action getAreaCodeList = async (value) => {
        const params={
            customerId: value
        }
        console.log(value,'value');
        if(!value){
            this.setAreaCodeList([]);
            return;
        }
        const res = await Service.getAreaCodeList(params);
        try{
            if(res.data.code === 0){
                const data = res.data.data;
                let newData = [];
                data.map(item => {
                    newData.push({
                        code: item,
                        name: item
                    });
                })
                this.setAreaCodeList(newData);
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
        this.setQueryData(params);
        const paramsObj = Object.assign({},{...params});
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
        const data = toJS(this.tableList);
        if(data.length == 0){
            message.warning('暂无数据可进行盘点');
            return;
        }
        const arr = [];
        data.map(item=>{
            arr.push(item.storehouseId);
        });
        this.setStoreIdList(arr);
        const paramsObj = Object.assign({}, {
            storeIdList: arr
        });
        const res = await Service.beginCheck(paramsObj);
        try{
            // code为1代表接口成功，Code为50001代表当前正有数据处于盘点中状态
            if(res.data.code == 0 || res.data.code == 50001){
                beginCheckState.setTableList(res.data.data);
                if(callback){
                    callback();
                }
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