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
    @action getTableList = async (params = {}) => {
        const paramsObj = {...params, ...{
            currentPage: 1,
            pageSize: 15
        }};
        const res = await Service.getTableList(paramsObj);
        try{
            if(res.data.code === 0){
                const {records} = res.data.data;
                this.setTableList(records);
            }else{
                console.log(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 表单编辑数据
    @observable editForm = {};
    @action setEditForm = (obj = {}) => {
        this.editForm = obj;
    }

    // 采购单中的商品列表
    @observable editTable = [];
    @action setEditTable = (arr = []) => {
        this.editTable = arr;
    }

    // 所有商品数据
    @observable productList = [];
    @action setProductList = (arr = []) => {
        this.productList = arr;
    }

    // 获取商品列表
    @action getProductList = async () => {
        const res = await Service.getProductList({});
        try{
            if(res.data.code === 0){
                const {rows} = res.data.data;
                this.setProductList(rows);
            }else{
                console.log(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 商家列表
    @observable customerList = [];
    @action setCustomerList = (arr = []) => {
        this.customerList = arr;
    }
    
    // 获取商家列表
    @action getCustomerList = async () => {
        const res = await Service.getCustomerList({});
        try{
            if(res.data.code === 0){
                const {rows} = res.data.data;
                this.setCustomerList(rows);
            }else{
                console.log(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 删除商品列表数据
    @action deleteEditTable = (record) => {
        const dataSource = toJS(this.editTable);
        const newData = dataSource.filter(item => item.key !== record.key);
        this.setEditTable(newData);
    }

    // 保存商品列表数据
    @action handleSave = row => {
        const newData = toJS(this.editTable);
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setEditTable(newData);
    };

    @observable count = 0;
    @action setDataKey = (arr = []) => {
        arr.map(item => {
            item['key'] = this.count;
            this.count ++;
        });
    }

    // 新增一行商品数据
    @action handleAdd = () => {
        const dataSource = toJS(this.editTable);
        const newData = {
            key: this.count,
            commodityName: null,
            modelNo: null,
            spec: null,
            unit: null,
            barCode: null,
            volume: null,
            weight: null,
            purchaseNums: null,
            arrivalDate: null,
            productionDate: null,
            shilfLife: null,
            remark: '',
        };
        this.count ++;
        this.setEditTable([...dataSource, newData]);
    }

    // 编辑弹窗显示标识
    @observable visible = false;
    @action toggleVisible = () => {
        this.visible = !this.visible;
    }

    // 弹窗状态标识，从新增进入还是修改进入 新增： true; 修改：false;
    @observable isAdd = false;
    @action setIsAdd = (bol = false) => {
        this.isAdd = bol;
    }

    // 详情弹窗是否可编辑
    @observable disabled = true;
    @action toggleDisabled = (bol = false) => {
        this.disabled = bol;
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
        this.setDataKey(record.detailList);
        this.setEditTable(record.detailList);
        this.toggleVisible();
    }

    // 保存
    @action saveData = async (obj) => {
        let res;
        if(this.isAdd){
            res = await Service.addProduct(obj);
        }else{
            res = await Service.editProduct(obj);
        }
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.toggleVisible();
                this.getProductList();
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
        const params = {
            id: record.id
        };
        const res = await Service.delete(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.getTableList();
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 点击收货
    @action receiptClick = () => {
        this.toggleVisible();
        this.togglereceiptVisible();
    }

    // 收货确认单弹窗显示标识
    @observable receiptVisible = false;
    @action togglereceiptVisible = () => {
        this.receiptVisible = !this.receiptVisible;
    }

    // 收货确认单取消按钮
    @action cancelReceiptModal = () => {
        this.toggleVisible();
        this.togglereceiptVisible();
    }

    // 确认按钮
    @action confirmClick = (record) => {

    }

    // 审核按钮
    @action auditClick = (record) => {

    }
}

export default new State();