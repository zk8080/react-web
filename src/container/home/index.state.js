import {observable, action, toJS} from 'mobx';
import Service from './index.service';
import { message } from 'antd';
import {formUtils} from '@utils';
import moment from 'moment';
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
    @action getQueryData = async (page = {}) => {
        const formData = formUtils.formToParams(this.queryForm);
        // if( formData.orderDate ) {
        //     formData.orderDate = moment(formData.orderDate).format('YYYY-MM-DD');
        // }
        const paramsObj = {
            ...formData, 
            ...this.pageInfo,
            ...page
        };
        const res = await Service.getQueryData(paramsObj);
        try{
            if(res.data.code === 0){
                const {records, current, size, total} = res.data.data;
                this.setTableList(records);
                this.setPageInfo({
                    current,
                    pageSize: size,
                    total
                });
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