import { observable, action, toJS } from 'mobx';
import Service from './index.service';
import {message} from 'antd';
import {formUtils} from '@utils';
const JSONData = require('@assets/pca-code.json');
/**
 * 订单详情
 */
class State{

    // 详情数据
    @observable detailData = {};
    @action setDetailData = (obj) => {
        this.detailData = obj;
    }

    // 商品列表
    @observable productList = [];
    @action setProductList = (arr = []) => {
        this.productList = arr;
    }

    // 包裹列表
    @observable packageList = [];
    @action setPackageList = (arr = []) => {
        this.packageList = arr;
    }

    // 省份列表
    @observable provList = JSONData;
    // 市列表
    @observable cityList = [];
    @action setCityList = (arr = []) => {
        this.cityList = arr;
    }
    // 区县列表
    @observable countyList = [];
    @action setCountyList = (arr = []) => {
        this.countyList= arr;
    }

    // 修改省份
    @action onProvChange = (value) => {
        const curProv = JSONData.filter(item => item.name == value);
        const cityList = curProv[0].children || [];
        this.setCityList(cityList);
    }

    // 修改市
    @action onCityChange = (value) => {
        const curCity = toJS(this.cityList).filter(item => item.name == value);
        const countyList = curCity[0].children || [];
        this.setCountyList(countyList);
        
    }

    // 查询详情数据
    @action getDetailData = async () => {
        const { orderNo, customerCode, systemOrderNo } = toJS(this.detailData);
        const params = {
            orderNo,
            customerCode,
            systemOrderNo
        };
        const res = await Service.queryDetail(params);
        try{
            if(res.data.code === 0){
                // this.setDetailData(obj);
                const {orderDetails, orderMails, orderInfo} = res.data.data;
                // 处理默认数据展示省市区联动数据
                const {prov, city} = orderInfo;
                const curProv = JSONData.filter(item => item.name == prov);
                const cityList = curProv[0].children || [];
                const curCity = city.split(',')[0];
                const countyList = cityList.filter(item => item.name == curCity)[0].children || [];
                orderInfo.city = curCity;
                orderInfo.county = city.split(',')[1];
                this.setCityList(cityList);
                this.setCountyList(countyList);

                this.setDetailData(orderInfo);
                this.setProductList(orderDetails);
                this.setPackageList(orderMails);
            }else{
                this.setProductList([]);
                this.setPackageList([]);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 订单数据编辑标识
    @observable disabled = true;
    @action setDisable = (bol) => {
        this.disabled = bol;
    }

    // 包裹单详情数据
    @observable packageDetail = {}
    @action setPackageDetail = (obj) => {
        this.packageDetail = obj;
    }

    // 包裹单详情弹窗
    @observable visible = false;
    @action setVisible = (bol) => {
        this.visible = bol;
    }

    // 查看包裹单详情
    @action lookPackage = (record) => {
        this.setPackageDetail(record);
        this.setVisible(true);
    }

    //  关闭包裹弹窗
    @action closeModal = () => {
        this.setVisible(false);
        this.setPackageDetail({});
    }

    // 点击修改订单
    @action editOrder = () => {
        this.setDisable(false);
    }

    // 取消修改
    @action cancelEdit = () => {
        this.setDisable(true);
    }

    // 修改订单保存
    @action updateOrder = async () => {
        const params = {
            ...formUtils.formToParams(toJS(this.detailData))
        };
        params.city = `${params.city},${params.county}`;
        const res = await Service.editOrder(params);
        try{
            if(res.data.code == 0){
                message.success(res.data.msg);
                this.setDisable(true);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 拆包弹窗
    @observable unPackageVisible = false;
    @action setUnPackageVisible = (bol) => {
        this.unPackageVisible = bol;
    }

    // 点击拆包
    @action unPackageClick = () => {
        this.setUnPackageVisible(true);
    }

    // 关闭拆包
    @action closePackage = () => {
        this.setUnPackageVisible(false);
        this.setUnPackageList([]);
    }

    // 拆包列表
    @observable unPackageList = [];
    @action setUnPackageList = (arr = []) => {
        this.unPackageList = arr;
    }

    // 新增包裹按钮
    @action addPackage = (arr) => {
        const unPackageList = toJS(this.unPackageList);
        unPackageList.push({
            id: Math.ceil(Math.random() * 1000),
            productList: arr
        });
        this.setUnPackageList(unPackageList);
        this.closeProductModal();
    }

    // 删除包裹按钮
    @action deletePackage = (record) => {
        let unPackageList = toJS(this.unPackageList);
        unPackageList = unPackageList.filter(item => item != record.id);
        this.setUnPackageList(unPackageList);
    }

    //  修改包裹列表中的商品数量
    @action editPackageNums = (record, idx, e) => {
        e.persist();
        const unPackageList = toJS(this.unPackageList);
        unPackageList.map(item => {
            if(item.id === record.id){
                const curProduct = record.productList[idx];
                curProduct['packageNums'] = e.target.value;
                item.productList[idx] = curProduct;
            };
        });
        this.setUnPackageList(unPackageList);
    }


    // 拆包按钮
    @action unPackage = async () => {
        const unPackageList = toJS(this.unPackageList);
        const productList = toJS(this.productList);
        console.log( unPackageList, '---unPackageList--' );
        
        const orderCommodities = productList.map(item => {
            return {commodityCode: item.barCode, nums: item.numbers};
        });  
        const packageCommodities = unPackageList.map(item => {
            const packageArr = item.productList.map(product => {
                return {
                    commodityCode: product.barCode,
                    nums: product.packageNums
                };
            });
            return packageArr;
        });
        const params = {
            orderCommodities,
            packageCommodities
        };
        const res = await Service.generate(params);
        try{
            if(res.data.code === 0){
                console.log(res.data, 'res.data');
                this.splitPackage();
            }
        }
        catch(e){
            console.log(e);
        }

    }

    // 商品详情弹窗标识
    @observable productVisible = false;
    @action setProductVisible = (bol) => {
        this.productVisible = bol;
    }

    // 打开商品弹窗
    @action openProductModal = () => {
        this.setUnPackageVisible(false);
        this.setProductVisible(true);
    }

    //关闭商品详情弹窗
    @action closeProductModal = () => {
        this.setProductVisible(false);
        this.setUnPackageVisible(true);
    }

    // 生成包裹
    @action splitPackage = async () => {
        const { orderNo, customerCode, systemOrderNo } = toJS(this.detailData);
        const params = {
            orderNo,
            customerCode,
            systemOrderNo
        };
        const res = await Service.splitPackage(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.closePackage();
                this.getDetailData();
            }
        }
        catch(e){
            console.log(e);
        }
    }
}

export default new State();
