import {observable, action, toJS} from 'mobx';
import Service from './index.service';
import { message } from 'antd';
import {formUtils} from '@utils';
import {getLodop} from '@assets/LodopFuncs';
import {template} from '@assets/restockTemplate.js';
import _ from 'lodash';
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

    
    // 表格数据
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }
    //获取表格数据
    @action getTableList = async (page = {}) => {
        const paramsObj = {
            search: formUtils.formToParams(this.queryForm),
            ...this.pageInfo,
            ...page
        }
        ;
        const res = await Service.getProductList(paramsObj);
        try{
            if(res.data.code === 0){
                const {rows, current, pageSize, total} = res.data.data;
                this.setTableList(rows);
                this.setPageInfo({
                    current,
                    pageSize,
                    total
                });
            }else{
                console.log(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }
    

    // 确认补货(打开补货弹窗)
    @action confirmRestock = (record={}) => {
        this.setRestockObj(record);
        this.toggleVisible();
        this.addRow();
        this.getFinalStoreData(record.replenishmentNo);
    }



//------------------------------------确认补货弹窗---------------------------------------------------------------------------------------------------------------------------------------------------------
    @observable visible = false;
    @action toggleVisible = () => {
        this.visible = !this.visible;
    }

    // 补货列表中选中的那一条数据，用作弹窗中展示所用
    @observable restockObj = {};
    @action setRestockObj = (obj = {}) => {
        this.restockObj = obj;
    }

    // 弹窗中对应的数据（list）
    @observable restockData = [];
    @action setRestockData = (arr=[]) => {
        this.restockData = arr;
    }

    // 新增一行
    @action addRow = () => {
        const arr = toJS(this.restockData || []);
        const { skuName, modelNo, spec, singleUnit, stockoutNums, commodityCode, storeCode } = toJS(this.restockObj);
        const len = arr.length;
        arr.push({
            skuName,
            modelNo, 
            spec, 
            singleUnit, 
            stockoutNums, 
            commodityCode, 
            storeCode,
            order: len+1
        });
        this.setRestockData(arr);
    }

    // 删除一行
    @action delRow = (index, callback) => {
        const arr = toJS(this.restockData);
        arr.splice(index, 1);
        this.setRestockData(arr);
        if(callback){
            callback();
        }
    }

    // 改变某一行的数据
    @action changeRow = (index, key, value) => {
        const newData = toJS(this.restockData);
        newData[index][key] = value;
        this.setRestockData(newData);
    }

    // 点击提交
    @action onOk = async() => {
        const params = {
            replenishmentInfos: toJS(this.restockData),
            replenishmentNo: this.restockObj.replenishmentNo
        };
        const res = await Service.confirmRestock(params);
        try{
            if(res.data.code === 0){
                this.getTableList();
                this.onCancel();
            }else{
                console.log(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 关闭弹窗
    @action onCancel = () => {
        this.toggleVisible();
        this.setRestockObj({});
        this.setRestockData([]);
    }


    //存储库位对应的下拉列表数据
    @observable finalStoreData = [];
    @action setFinalStoreData = (arr=[]) => {
        this.finalStoreData = arr;
    }
    @action getFinalStoreData = async(replenishmentNo) => {
        const params = {
            replenishmentNo: replenishmentNo
        };
        const res = await Service.getFinalStoreData(params);
        try{
            if(res.data.code === 0){
                this.setFinalStoreData(res.data.data);
            }else{
                console.log(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }


// 打印补货单
    printData = (selectRow) => {
        const Lodop = getLodop();
        if(!Lodop){
            return;
        }
        selectRow.map(item => {
            const data = {...item, date: moment().format('YYYY-MM-DD HH:mm')};
            if(data.ccStores){
                const storeArr = data.ccStores.map(item => item.storeCode) || [];
                data['ccStoreStr'] = storeArr.join(',');
            }else{
                data['ccStoreStr'] = '';
            }
            // 模板
            const htmlStr = _.template(template)(data);
            Lodop.PRINT_INIT('');
            Lodop.ADD_PRINT_TEXT('2%','44%','30%','50px',`${item.customerName}补货单`);
            Lodop.SET_PRINT_STYLEA(1, 'FontSize', 20);
            Lodop.SET_PRINT_STYLEA(1, 'FontWeight', 600);
            // html内容模板
            Lodop.ADD_PRINT_HTM('5%', '1%', '98%', '94%', htmlStr);
            // 打印方向
            Lodop.SET_PRINT_PAGESIZE(1,'','', 'A4');
            // Lodop.SET_PRINT_STYLEA(0,"AngleOfPageInside",-90);
            Lodop.PREVIEW();
            // // 直接打印
            // Lodop.PRINT();
        });
    }
}

export default new State();