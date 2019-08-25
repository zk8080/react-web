import {observable, action, toJS, computed, autorun} from 'mobx';
import Service from './index.service';
import Lodash from 'lodash';
import { message } from 'antd';
import {template} from '@assets/trackOrder.js';
import {packageTemplate} from '@assets/packageTemplate.js';
import {getLodop} from '@assets/LodopFuncs';
import _ from 'lodash';

class State {

    // 是否已经扫描拣货单
    @observable isAlreadyReview = false;
    @action setIsAlreadyReview = (bol) => {
        this.isAlreadyReview = bol;
    }

    // 是否已经扫描拣货人
    @observable isAlreadyPicker = false;
    @action setIsAlreadyPicker = (bol) => {
        this.isAlreadyPicker = bol;
    }

    // 拣货单号
    @observable pickNo = null;
    @action setPickNo = (str) => {
        this.pickNo = str;
    }

    // 拣货单数据
    @observable reviewList = [];
    @action setReviewList = (arr = []) => {
        this.reviewList = arr;
    }

    // 查询拣货单数据
    @action getTableList = async (code) => {
        this.setPickNo(code);
        const params = {
            pickNo: code
        };
        const res = await Service.getTableList(params);
        try{
            if(res.data.code === 0){
                const {data} = res.data;
                this.setReviewList(data);
                if(data.length > 0){
                    this.setIsAlreadyReview(true);
                }
                this.dealPackageArr(data);
                this.getAllProductData(data);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    //  当前拣货人
    @observable pickUser = null;
    @action setPickUser = (str) => {
        this.pickUser = str;
        this.setIsAlreadyPicker(true);
    }

    // 包裹栏位数据
    @observable packageList = [];
    @action setPackageList = (arr = []) => {
        this.packageList = arr;
    }

    // 当前扫描商品信息
    @observable curProductInfo = {};
    @action setCurProductInfo = (obj) => {
        this.curProductInfo = obj;
    }

    // 处理包裹数据
    dealPackageArr = (arr = []) => {
        const dataArr = [];
        arr.map(item => {
            const allData = item.packageCommodities && item.packageCommodities.reduce((sum, cur) => sum += cur.packageNums, 0) || 0;
            const lastData = allData - item.packageCommodities.reduce((sum, cur) => sum += cur.pickNums, 0);
            dataArr.push({
                allData,
                lastData,
                ...item
            });
        });
        this.setPackageList(dataArr);
    }

    // 全量商品
    @observable allProductData = [];
    @action setAllProductData = (arr = []) => {
        this.allProductData = arr;
    }

    // 获取全量商品
    getAllProductData = (arr = []) => {
        const productArr = arr.map(item => item.packageCommodities).flat();
        const hash = {};
        const allProductData = productArr.reduce((all, cur) => {
            hash[cur.commodityCode]? hash[cur.commodityCode] += cur.packageNums : (hash[cur.commodityCode] = cur.packageNums) && all.push(cur);
            return all;
        }, []);
        allProductData.map(item => {
            item.packageNums = hash[item.commodityCode];
        });
        this.setAllProductData(allProductData);
    }

    // 已扫描商品
    @observable alreadyPickArr = [];
    @action setAlreadyPickArr = (arr = []) => {
        this.alreadyPickArr = arr;
    }

    // 扫描商品 修改栏位数据、
    @action dealProductArr = (code) => {
        // 包裹列表
        const packageList = toJS(this.packageList);
        // 所有商品列表
        const allProductData = toJS(this.allProductData);
        const allProductIndx = Lodash.findIndex(allProductData, prodItem => prodItem.commodityCode == code);
        if(allProductIndx >= 0){
            const curAllProductInfo = allProductData[allProductIndx];
            if(curAllProductInfo.pickNums == curAllProductInfo.packageNums){
                message.warning('该商品已拣完，请勿重复拣货！');
                return;
            }else{
                curAllProductInfo.pickNums ++;
                for (let i = 0; i < packageList.length; i++) {
                    const item = packageList[i];
                    const productList = item.packageCommodities || [];
                    const productIndx = Lodash.findIndex(productList, prodItem => prodItem.commodityCode == code && item.lastData > 0);
                    if(productIndx >= 0){
                        const curProductInfo = productList[productIndx];
                        item.lastData --;
                        item.pickNums ++;
                        this.setCurProductInfo({
                            ...item,
                            ...curProductInfo
                        });
                        if( item.lastData == 0 ){
                            this.curPickPrint(item);
                        }
                        break;
                    }
                }
                this.setAllProductData(allProductData);
                this.setPackageList(packageList);
                // 判断所有拣货单有没有全部拣完
                this.isCheckFinished();
            }
        }else{
            message.warning('该商品不在拣货单内！');
            return;
        }
        
    }

    // 判断当前包裹拣货完成，进行打印清单和面单
    curPickPrint = (obj) => {
        this.printData(obj);
        this.printPickData(obj);
    }

    // 监听拣货完成
    isCheckFinished () {
        const packageList = toJS(this.packageList);
        const lastArr = packageList.filter(item => item.lastData === 0);
        if(lastArr.length == packageList.length){
            this.checkFinished();
        }
    }

    // 拣货完成修改状态
    @action checkFinished = async () => {
        const params = {
            pickNo: this.pickNo,
            pickOperator: this.pickUser
        };
        const res = await Service.checkFinished(params);
        try{
            if(res.data.code == 0){
                message.success('拣货完成，请扫描下一单！');
                this.setIsAlreadyReview(false);
                this.setIsAlreadyPicker(false);
                this.setReviewList([]);
                this.setPackageList([]);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 漏检
    @action checkOmit = async () => {
        const params = {

        };
        const res = await Service.checkOmit(params);
        try{
            if(res.data.code == 0){
                message.success('拣货完成，请扫描下一单！');
                this.setIsAlreadyReview(false);
                this.setIsAlreadyPicker(false);
                this.setReviewList([]);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 获取漏检商品库位
    @action getOmitStore = async() => {
        const packageList = toJS(this.packageList);
        let commodityCodes = [];
        let customerCode = null;
        packageList.map(item => {
            const productList = item.packageCommodities || [];
            if(productList.length > 0){
                commodityCodes = [...commodityCodes, ...productList.map(prodItem => prodItem.commodityCode)];
            }
            customerCode = item.customerCode;
        });
        const params = {
            customerCode,
            commodityCodes
        };
        const res = await Service.getOmitStore(params);
        try{
            if(res.data.code == 0){
                message.success('拣货完成，请扫描下一单！');
                this.setIsAlreadyReview(false);
                this.setIsAlreadyPicker(false);
                this.setReviewList([]);
            }
        }
        catch(e){
            console.log(e);
        }
    };

    // 打印快快递单
    @action printData = (data) => {
        const Lodop = new getLodop();
        // 模板
        const htmlStr = _.template(template)(data);
        Lodop.PRINT_INIT('');
        Lodop.SET_PRINTER_INDEX('123');
        // 条形码
        // Lodop.ADD_PRINT_BARCODE('5%','40%','30%','50px','128A','2019082146546');
        // html内容模板
        Lodop.ADD_PRINT_HTM('1%', '1%', '98%', '94%', htmlStr);
        // 打印表格
        // Lodop.ADD_PRINT_TABLE('35%', '1%', '98%', '74%', tableHtmlStr);
        // Lodop.SET_PRINT_STYLEA(0,"AngleOfPageInside",-90);
        // Lodop.PREVIEW();
        Lodop.PRINT();
        console.log(htmlStr, 'document');
    }

    // 打印包裹清单
    @action printPickData = (data) => {
        const Lodop = new getLodop();
        // 模板
        const htmlStr = _.template(packageTemplate)(data);
        Lodop.PRINT_INIT('');
        Lodop.SET_PRINTER_INDEX('456');
        // 条形码
        // Lodop.ADD_PRINT_BARCODE('5%','40%','30%','50px','128A','2019082146546');
        // html内容模板
        Lodop.ADD_PRINT_HTM('1%', '1%', '98%', '94%', htmlStr);
        // 打印表格
        // Lodop.ADD_PRINT_TABLE('35%', '1%', '98%', '74%', tableHtmlStr);
        // Lodop.SET_PRINT_STYLEA(0,"AngleOfPageInside",-90);
        // Lodop.PREVIEW();
        Lodop.PRINT();
        console.log(htmlStr, 'document231321');
    }
    
}
export default new State();
