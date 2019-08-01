import {observable, action, toJS} from 'mobx';
import Service from './index.service';
import { message } from 'antd';
import {formUtils} from '@utils';

class State {

    // 查询组件数据
    @observable queryForm = {};
    @action setQueryForm = (obj = {}) => {
        this.queryForm = obj;
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

    // 表格数据
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }

    //获取表格数据
    @action getQueryData = async (page) => {
        const params = {
            search: formUtils.formToParams(this.queryForm),
            ...this.pageInfo,
            ...page
        };
        const res = await Service.getQueryData(params);
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
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 耗材全量数据
    @observable consumableData = [
        {
            code: 'a',
            name: '纸箱'
        },
        {
            code: 'b',
            name: '泡沫'
        }
    ];
    @action setConsumableData = (arr = []) => {
        this.consumableData = arr;
    }

    // 表单编辑数据
    @observable editForm = {};
    @action setEditForm = (obj = {}) => {
        this.editForm = obj;
    }

    // 编辑弹窗显示标识
    @observable visible = false;
    @action toggleVisible = () => {
        this.visible = !this.visible;
    }

    // 详情弹窗是否可编辑
    @observable disabled = true;
    @action toggleDisabled = (bol = false) => {
        this.disabled = bol;
    }

    // 弹窗状态标识，从新增进入还是修改进入 新增： true; 修改：false;
    @observable isAdd = false;
    @action setIsAdd = (bol = false) => {
        this.isAdd = bol;
    }

    // 新增按钮
    @action addClick = () => {
        this.setEditForm();
        this.setIsAdd(true);
        this.toggleDisabled(false);
        this.toggleVisible();
    }

    // 点击修改
    @action editClick = (record) => {
        this.toggleDisabled(true);
        this.setIsAdd(false);
        this.setEditForm(record);
        this.toggleVisible();
    }

    // 保存
    @action saveData = async (obj) => {
        const res = await Service.addData(obj);
        // if(this.isAdd){
        //     res = await Service.addData(obj);
        // }else{
        //     res = await Service.editCustomer(obj);
        // }
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.toggleVisible();
                this.getQueryData();
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 删除
    @action deleteClick = async (record) => {
        const param = {
            id: record.id
        };
        const res = await Service.deleteCustomer(param);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.getCustomerList();
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 商品信息
    @observable productList = [];
    @action setProductList = (arr = []) => {
        this.productList = arr;
    }

    // 查询商品
    @action getProductList = async (page) => {
        const params = {
            current: 1,
            pageSize: 1000000,
            search: {
                isConsumable: '0'
            }
        };
        const res = await Service.getProductList(params);
        try{
            if(res.data.code === 0){
                const {rows} = res.data.data;
                this.setProductList(rows);
            }else{
                this.setProductList([]);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 耗材数据
    @observable consumableData = [];
    @action setConsumableData = (arr = []) => {
        this.consumableData = arr;
    }

    // 处理耗材数据
    dealData = (obj) => {
        // 一级数据
        const parentData = Object.keys(obj);
       
        const resultData = [];
        parentData.map((item, index) => {
            resultData.push({
                skuName: item,
                barCode: `parent${index}`,
                children: obj[item]
            });
        });
        console.log( resultData, '---resultData---' );
        return resultData;
    }

    // 查询耗材
    @action getConsumableData = async () => {
        const res = await Service.queryConsumable({});
        try{
            if(res.data.code === 0){
                const {data} = res.data;
                const resultData = this.dealData(data);
                this.setConsumableData(resultData);
            }else{
                this.setConsumableData([]);
            }
        }
        catch(e){
            console.log(e);
        }
    }
}

export default new State();