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
    @action getTableList = async (params = {}) => {
        const paramsObj = {
            ...formUtils.formToParams(this.queryForm),
            ...this.pageInfo,
            ...params
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

    // 编辑弹窗显示标识
    @observable visible = false;
    @action toggleVisible = () => {
        this.visible = !this.visible;
    }

    // 详情弹窗状态标识，从查看进入还是上架和审核进入 查看：0; 上架：1; 审核：2;
    @observable isDetail = 0;
    @action setIsDetail = (str) => {
        this.isDetail = str;
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

    // 保存采购单商品列表数据
    @action handleProductSave = (row) => {
        const newData = toJS(this.editTable);
        const index = newData.findIndex(item => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row
        });
        this.setEditTable(newData);
    };

    // 当前选中采购单数据
    @observable curDataInfo = {};
    @action setCurDataInfo = (obj = {}) => {
        this.curDataInfo = obj;
    }

    // 当前选中的商品信息
    @observable curProductInfo = {};
    @action setCurProductInfo = (obj = {}) => {
        this.curProductInfo = obj;
    }

    // 点击查看
    @action detailClick = async (record) => {
        this.setIsDetail('0');
        this.setEditForm(record);
        this.setCurDataInfo(record);
        this.setEditTable([record.detail]);
        this.toggleVisible();
    }

    // 点击上架
    @action shelfModal = async (record) => {
        this.setIsDetail('1');
        this.setEditForm(record);
        this.setCurDataInfo(record);
        this.setEditTable([record.detail]);
        this.toggleVisible();
    }

    // 点击列表审核按钮
    @action auditClick = (record) => {
        this.setIsDetail('2');
        this.setEditForm(record);
        this.setCurDataInfo(record);
        this.setEditTable([record.detail]);
        this.toggleVisible();
    }

    // 上架弹窗显示标识
    @observable shelfVisible = false;
    @action setShelfVisible = (bol) => {
        this.shelfVisible = bol;
    }

    // 点击上架
    @action shelfClick = (record) => {
        if( record.storehouseInfo ){
            const storeCodeArr = record.storehouseInfo.split('/');
            const codeArr = [];
            storeCodeArr.map(item => {
                codeArr.push({
                    storeCode: item.split(':')[0],
                    num: item.split(':')[1],
                });
            });
            const storeIdArr = record.storehouseInfoId.split(';');
            storeIdArr.map((item, index) => {
                codeArr[index] = {
                    ...codeArr[index],
                    storehouseId: item.split(':')[0],
                };
            });
            this.setEditStoreList(codeArr);
        }else{
            this.setEditStoreList([]);
        }
        this.setCurProductInfo(record);
        this.setShelfVisible(true);
        this.toggleVisible();
        this.getRecommendStore(record);
    }

    // 关闭弹窗
    @action closeShelfVisible = () => {
        this.setShelfVisible(false);
        this.toggleVisible();
        this.setCurProductInfo({});
    }

    // 推荐库位列表
    @observable recommendStoreList = [];
    @action setRecommendStoreList = (arr = []) => {
        this.recommendStoreList = arr;
    }

    // 查询推荐库位
    @action getRecommendStore = async (record) => {
        const curData = toJS(this.curDataInfo);
        const params = {
            customerCode: curData.customerCode,
            barCode: record.barCode,
            type: '1'
        };
        const res = await Service.getRecommendStore(params);
        try{
            if(res.data.code === 0){
                const {data} = res.data;
                this.setRecommendStoreList(data);
            }else{
                this.setRecommendStoreList([]);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 填写的库位数据
    @observable editStoreList = [];
    @action setEditStoreList = (arr = []) => {
        this.editStoreList = arr;
    }

    // 删除库位列表
    @action deleteEditTable = (record) => {
        const dataSource = toJS(this.editStoreList);
        const newData = dataSource.filter(item => item.key !== record.key);
        this.setEditStoreList(newData);
    }

    // 保存库位列表
    @action handleSave = (row, key, option) => {
        const newData = toJS(this.editStoreList);
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        //选择库位时 保存库位编码和库位id
        let obj = {};
        if(key == 'storeCode' && option){
            const { storehouseId, storeCode } = option.props.att;
            obj = {
                storehouseId,
                storeCode
            };
        }
        newData.splice(index, 1, {
            ...item,
            ...row,
            ...obj
        });
        this.setEditStoreList(newData);
    };

    @observable count = 0;

    // 新增一行库位数据
    @action handleAdd = () => {
        const dataSource = toJS(this.editStoreList);
        const newData = {
            key: this.count,
            storehouseId: null,
            num: null
        };
        this.count ++;
        this.setEditStoreList([...dataSource, newData]);
    }

    // 库位弹窗确认按钮
    @action submitStoreList = () => {
        // 当前商品信息
        const curProduct = toJS(this.curProductInfo);
        const editTable = toJS(this.editTable);
        //库位信息
        const storeList = toJS(this.editStoreList);
        // 库位id+数量
        const storehouseInfoIdArr = storeList.map(item => `${item.storehouseId}:${item.num}`);
        const storehouseInfoIdStr = storehouseInfoIdArr.join(';');
        // 库位编码+数量
        const storehouseInfoArr = storeList.map(item => `${item.storeCode}:${item.num}`);
        const storehouseInfoStr = storehouseInfoArr.join('/');
        const index = editTable.findIndex(item => item.id === curProduct.id);
        editTable.splice(index, 1, {
            ...curProduct,
            ...{
                storehouseInfoId: storehouseInfoIdStr,
                storehouseInfo: storehouseInfoStr
            }
        });
        this.setEditTable(editTable);
        this.closeShelfVisible();
    }

    // 提交
    @action saveData = async (obj) => {
        const params = {
            ...obj,
            detail: toJS(this.editTable)[0]
        };
        const res = await Service.grounding(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.toggleVisible();
                this.getTableList();
            }else if(res.data.code == '00'){
                message.warning(res.data.msg);
            }else {
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 审核弹窗标识
    @observable auditVisible = false;
    @action setAuditVisible = (bol) => {
        this.auditVisible = bol;
    }

    // 点击审核
    @action openAuditModal = () => {
        this.toggleVisible();
        this.setAuditVisible(true);
    }

    // 关闭审核按钮
    @action closeAuditModal = () => {
        this.setAuditVisible(false);
        this.toggleVisible();
    }

    // 审核
    @action auditData = async (obj) => {
        const curData = toJS(this.curDataInfo);
        const params = {
            purchaseId: curData.id,
            ...obj,
            id: toJS(this.editTable)[0].id
        };
        const res = await Service.confirmReceive(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.setAuditVisible(false);
                this.getTableList();
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
        const res = await Service.getCustomerList({
            current: 1,
            pageSize: 100000
        });
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


    // 查询列表商品下拉数据
    @observable allProductList = [];
    @action setAllProductList = (arr = []) => {
        this.allProductList = arr;
    }

    // 查询商品详情
    @action getAllProductList = async (value = {}) => {
        const params = {
            current: 1,
            pageSize: 10000
        };
        const res = await Service.getProductList(params);
        try{
            if(res.data.code === 0){
                const {rows} = res.data.data;
                this.setAllProductList(rows);
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