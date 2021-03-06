import {observable, action, toJS} from 'mobx';
import Service from './index.service';
import { message } from 'antd';
import beginCheckState from '../beginCheck/index.state';
import {getLodop} from '@assets/LodopFuncs';
import {template} from '@assets/checkTemplate.js';
import _ from 'lodash';
import {formUtils, pubFunction} from '@utils';
import moment from 'moment';

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
                    item && newData.push({
                        code: item,
                        name: item
                    });
                })
                this.setAreaCodeList(newData);
            }else{
                // console.log(res.data.msg);
            }
        }catch(e){
            console.log(e);
        }
    }
    
    // 商品数据
    @observable commodityIdList = [];
    @action setCommodityIdList = (arr = []) => {
        this.commodityIdList = arr;
    }
    // 商品是根据商家联动来的
    @action getCommodityIdList = async (value) => {
        const params = {
            customerId: value
        }
        if(!value){
            this.setCommodityIdList([]);
            return;
        }
        const res = await Service.getCommodityIdList(params);
        try{
            if(res.data.code === 0){
                const data = res.data.data;
                this.setCommodityIdList(data);
            }else{
                // console.log(res.data.msg);
            }
        }catch(e){
            console.log(e);
        }
    }

    // 改变商家时
    @action changeCustomerId = (value) => {
        this.getAreaCodeList(value);
        this.getCommodityIdList(value);
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
                this.printCheckData(res.data.data)
                if(callback){
                    callback();
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 打印盘点表
    printCheckData = (arr) => {
        const Lodop = getLodop();
        if(!Lodop){
            return;
        }
        const data = {date: moment().format('YYYY-MM-DD'), user: pubFunction.getCurUser(), tableList: arr};
        const customerName = arr.length> 0? arr[0].customerName: ''
        // 模板
        const htmlStr = _.template(template)(data);
        Lodop.PRINT_INIT('');
        Lodop.ADD_PRINT_TEXT('2%','44%','30%','50px',`${customerName}盘点表`);
        Lodop.SET_PRINT_STYLEA(1, 'FontSize', 20);
        Lodop.SET_PRINT_STYLEA(1, 'FontWeight', 600);
        // html内容模板
        Lodop.ADD_PRINT_HTM('5%', '1%', '98%', '94%', htmlStr);
        // 打印方向
        Lodop.SET_PRINT_PAGESIZE(1,'','', 'A4');
        // Lodop.SET_PRINT_STYLEA(0,"AngleOfPageInside",-90);
        // Lodop.PREVIEW();
        // // 直接打印
        Lodop.PRINT();
    }

    // 组件销毁是重置state
    @action resetState = () => {
        
    }
}

export default new State();