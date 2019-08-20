import {observable, action, toJS} from 'mobx';
import Service from './index.service';
import { message } from 'antd';
import {formUtils} from '@utils';
// 点击字段打开公共的弹窗
import kuweiModalState from '../components/kuweiModal/index.state';

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

    // 点击某一列时打开库位信息的详情弹窗
    @action openModal = (key, record) => {
        const query = formUtils.formToParams(this.queryForm);
        let params = {};
        if(key == 'totalStoreNum'){
            params={
                customerCode: query.customerCode
            }
        }else if(key == 'usedStoreNum'){
            params={
                customerCode: query.customerCode,
                queryType: 1
            }
        }else if(key == 'residuleStoreNum'){
            params={
                customerCode: query.customerCode,
                queryType: 2
            }
        }
        kuweiModalState.openModal(params);
    }
}

export default new State();