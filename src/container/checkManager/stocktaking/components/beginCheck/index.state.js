import {observable, action, toJS} from 'mobx';
import Service from './index.service';
import inventoryInfoState from '../inventoryInfo/index.state';
import { message } from 'antd';

class State {

    // 查询组件数据
    @observable queryForm = {};
    @action setQueryForm = (obj = {}) => {
        this.queryForm = obj;
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
    

    //取消盘点
    @action cancelCheck = async(callback) => {
        let data = toJS(this.tableList);
        let arr = [];
        data.map(item => {
            arr.push(item.id);
        })
        let params = {
            storeIdList: toJS(inventoryInfoState.storeIdList),
            checkRecordIdList: arr
        }
        let res = await Service.cancelCheck(params);
        try{
            if(res.data.code === 0){
                // 获取库存信息列表数据
                inventoryInfoState.getTableList(inventoryInfoState.queryForm);
                if(callback){
                    callback()
                }
            }else{
                console.log(res.data.msg);
            }
        }catch(e){
            console.log(e);
        }
    }

    //盘点结束
    @action endCheck = async(callback) => {
        let data = toJS(this.tableList);
        let params = {
            checkRecordIdList: data
        }
        let res = await Service.endCheck(params);
        try{
            if(res.data.code === 0){
                // 获取库存信息列表数据
                inventoryInfoState.getTableList(inventoryInfoState.queryForm);
                if(callback){
                    callback()
                }
            }else{
                console.log(res.data.msg);
            }
        }catch(e){
            console.log(e);
        }
    }
}

export default new State();