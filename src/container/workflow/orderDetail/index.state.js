import { observable, action, toJS } from 'mobx';
import Service from './index.service';
import {message} from 'antd';
import {formUtils} from '@utils';
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

    // 查询详情数据
    @action getDetailData = async (obj) => {
        const res = await Service.queryDetail(obj);
        try{
            if(res.data.code === 0){
                // this.setDetailData(obj);
                const {orderDetails, orderMails, orderInfo} = res.data.data;
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
        console.log( formUtils.formToParams(toJS(this.detailData)), 'formUtils.formToParams(this.queryForm)' );
        const params = {
            ...formUtils.formToParams(toJS(this.detailData))
        };
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
}

export default new State();
