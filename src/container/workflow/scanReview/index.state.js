import {observable, action, toJS, computed, autorun} from 'mobx';
import Service from './index.service';
import Lodash from 'lodash';
import { message } from 'antd';
import {template} from '@assets/trackOrder.js';
import {packageTemplate} from '@assets/packageTemplate.js';
import {omitTemplate} from '@assets/omitTemplate.js';
import {getLodop} from '@assets/LodopFuncs';
import _ from 'lodash';
import {Modal} from '@pubComs';

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
            if(res.data.code == 0){
                const {data} = res.data;
                this.setReviewList(data);
                if(data.length > 0){
                    this.setIsAlreadyReview(true);
                }
                this.dealPackageArr(data);
                this.getAllProductData(data);
            }else if(res.data.code == 50012){
                Modal.confirm({
                    title: '拣货单锁定',
                    content: '拣货单已锁定，是否需要解锁？',
                    okText: '解锁',
                    onOk: () => {this.unLockPick();},
                    cancelText: '取消',
                    onCancel: () => {}
                });
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 解除锁定
    @action unLockPick = async () => {
        const params = {
            pickNo: this.pickNo
        };
        const res = await Service.unLockPick(params);
        try{
            if(res.data.code == 0){
                message.success('解锁成功！');
                this.getTableList(this.pickNo);
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
            const pickNums = (item.packageCommodities && item.packageCommodities.reduce((sum, cur) => sum += cur.pickNums, 0)) || 0;
            const lastData = allData - pickNums;
            dataArr.push({
                allData,
                lastData,
                pickNums,
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
                    const productIndx = Lodash.findIndex(productList, prodItem => prodItem.commodityCode == code && prodItem.pickNums != prodItem.packageNums);
                    if(productIndx >= 0){
                        const curProductInfo = productList[productIndx];
                        item.lastData --;
                        item.pickNums ++;
                        curProductInfo.pickNums ++;
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
        // this.printPickData(obj);
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

    // 处理漏检单所需信息
    dealOmitData = () => {
        const packageList = toJS(this.packageList);
        const omitStoreObj = toJS(this.omitStoreObj);

        const omitDataArr = [];
        packageList.map(item => {
            if( item.lastData != 0 ){
                const productList = [];
                item.packageCommodities && item.packageCommodities.map(prodItem => {
                    if( prodItem.pickNums != prodItem.packageNums ){
                        productList.push({
                            ...prodItem,
                            storeCode: omitStoreObj[prodItem.commodityCode],
                            omitNums: prodItem.packageNums - prodItem.pickNums
                        });
                    }
                });
                omitDataArr.push({
                    ...item,
                    totalOmitNums: productList.reduce((sum, cur) => sum += cur.omitNums, 0),
                    productList
                });
            }
        });
        return omitDataArr;
    }

    // 漏检
    @action checkOmit = async () => {
        const packageList = toJS(this.packageList);
        const mails = [];
        packageList.map(item => {
            if( item.lastData != 0 ){
                const commodities = [];
                item.packageCommodities && item.packageCommodities.map(prodItem => {
                    if( prodItem.pickNums != prodItem.packageNums ){
                        commodities.push({
                            commodityCode: prodItem.commodityCode,
                            omitNums: prodItem.packageNums - prodItem.pickNums
                        });
                    }
                });
                mails.push({
                    mailNo: item.mailNo,
                    orderNo: item.systemOrderNo,
                    commodities
                });
            }
        });
        const params = {
            pickNo: this.pickNo,
            pickOperator: this.pickUser,
            mails: mails
        };
        const res = await Service.checkOmit(params);
        try{
            if(res.data.code == 0){
                const omitArr = this.dealOmitData();
                this.printOmit(omitArr);
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

    // 漏检商品库位
    @observable omitStoreObj = {};
    @action setOmitStoreObj = (obj = {}) => {
        this.omitStoreObj = obj;
    }

    // 获取漏检商品库位
    @action getOmitStore = async() => {
        
        const packageList = toJS(this.packageList);
        if(packageList.length < 1){
            message.warning('请扫描拣货单！');
            return;
        }
        const allProductData = toJS(this.allProductData);
        const commodityCodes = [];
        allProductData.map(item => {
            if(item.pickNums != item.packageNums){
                commodityCodes.push(item.commodityCode);
            }
        });
        const customerCode = packageList[0].customerCode;
        const params = {
            customerCode,
            commodityCodes
        };
        const res = await Service.getOmitStore(params);
        try{
            if(res.data.code == 0){
                const {data} = res.data;
                this.setOmitStoreObj(data);
                this.checkOmit();
            }
        }
        catch(e){
            console.log(e);
        }
    };

    // 处理快递单据需要的信息
    dealPrintData = (obj) => {
        const cityArr = obj.city.split(',');
        const cityStr = cityArr[0];
        const county = cityArr[1];
        const detailAdress = `${obj.prov}${cityStr}${county}${obj.reciptAddr}`;
        const totalCount = obj.packageCommodities.reduce((sum, cur) => sum += cur.packageNums, 0);
        obj['cityStr'] = cityStr;
        obj['county'] = county;
        obj['detailAdress'] = detailAdress;
        obj['totalCount'] = totalCount;
        return obj;
    };

    // 打印快快递单
    @action printData = (data) => {
        const newData = this.dealPrintData(data);
        const Lodop = new getLodop();
        if(!Lodop){
            return;
        }
        // 模板
        // const htmlStr = _.template(template)(newData);
        Lodop.PRINT_INITA(-1,0,380,570,'邮政快递电子面单打印');
        Lodop.SET_PRINTER_INDEX('Microsoft XPS Document Writer');
        // Lodop.On_Return=function(TaskID,Value){
        //     if(Value>=0){
        //         message.success('选择成功!'); 
        //     }else {
        //         message.error('选择失败！');
        //     }
        // };
        // Lodop.SELECT_PRINTER();
        Lodop.SET_PRINT_PAGESIZE(1,1000,1500,'');
        Lodop.ADD_PRINT_BARCODE(9,148,190,60,'128C',newData.mailNo);
        Lodop.ADD_PRINT_LINE(80,5,79,375,2,1);
        Lodop.ADD_PRINT_TEXT(88,38,100,30,'快递包裹');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',16);
        Lodop.SET_PRINT_STYLEA(0,'Bold',1);
        Lodop.ADD_PRINT_TEXT(88,315,45,30,newData.basketNum);
        Lodop.SET_PRINT_STYLEA(0,'FontSize',16);
        Lodop.SET_PRINT_STYLEA(0,'Bold',1);
        Lodop.ADD_PRINT_LINE(121,5,120,375,2,1);
        Lodop.ADD_PRINT_TEXT(135,10,30,67,'收件');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',14);
        Lodop.SET_PRINT_STYLEA(0,'Bold',1);
        Lodop.ADD_PRINT_TEXT(133,65,70,24,newData.reciptName);
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(133,228,115,24,newData.reciptPhone);
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(158,65,304,35,newData.detailAdress);
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_LINE(210,4,209,374,2,1);
        Lodop.ADD_PRINT_TEXT(215,10,65,24,'订单号：');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(215,76,100,24,newData.orderNo);
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(215,204,90,24,'收件人签名：');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(238,203,75,24,'签收时间：');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(238,281,20,24,'月');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(238,310,20,24,'日');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(238,339,20,24,'时');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(248,10,100,20,'品名：');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        const skuNameArr = [];
        // 循环商品名称
        newData.packageCommodities && newData.packageCommodities.map(item => {
            skuNameArr.push(`${item.skuName}*${item.packageNums}${String.fromCharCode(13)}`);
        });
        const skuNameStr = skuNameArr.join('');
        Lodop.ADD_PRINT_TEXT(267,10,346,20, skuNameStr);
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(312,12,90,20,'重量（克）：');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(312,105,65,20, newData.presetWeight * 1000);
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_TEXT(312,218,135,20,'上海徐汇30局已检视');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',10);
        Lodop.ADD_PRINT_LINE('90.28mm',5,340,375,2,1);
        Lodop.ADD_PRINT_BARCODE(362,22,175,50,'128C',newData.mailNo);
        Lodop.ADD_PRINT_TEXT(420,10,25,45,'收件');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',12);
        Lodop.SET_PRINT_STYLEA(0,'Bold',1);
        Lodop.ADD_PRINT_TEXT(419,66,65,20,newData.reciptName);
        Lodop.ADD_PRINT_TEXT(419,216,100,20,newData.reciptPhone);
        Lodop.ADD_PRINT_TEXT(438,51,322,20,newData.detailAdress);
        Lodop.ADD_PRINT_LINE(474,4,475,374,2,1);
        Lodop.ADD_PRINT_TEXT(491,11,25,55,'寄件');
        Lodop.SET_PRINT_STYLEA(0,'FontSize',12);
        Lodop.SET_PRINT_STYLEA(0,'Bold',1);
        Lodop.ADD_PRINT_TEXT(496,51,100,20,'滨中信息');
        Lodop.ADD_PRINT_TEXT(518,51,313,20,'上海市浦东新区龙东大道4877号二期大楼2层徐汇邮政');
        // Lodop.PREVIEW();
        Lodop.PRINT();
    }

    // 打印包裹清单
    @action printPickData = (data) => {
        const newData = this.dealPrintData(data);
        const Lodop = new getLodop();
        if(!Lodop){
            return;
        }
        // 模板
        const htmlStr = _.template(packageTemplate)(newData);
        Lodop.PRINT_INIT('');
        Lodop.SET_PRINTER_INDEX('package_print');
        //水印效果begin----
		Lodop.ADD_PRINT_TEXT('40%', '40%', 300,300, data.basketNum);
		Lodop.SET_PRINT_STYLEA(0,'FontSize',100);
		Lodop.SET_PRINT_STYLEA(0,'FontColor','#eee');
		Lodop.SET_PRINT_STYLEA(0,'ItemType',1);
		//水印效果end-----
        // html内容模板
        Lodop.ADD_PRINT_HTM('1%', '1%', '98%', '94%', htmlStr);
        // Lodop.PREVIEW();
        Lodop.PRINT();
    }

    // 打印漏检清单
    @action printOmit = (arr) => {
        const Lodop = getLodop();
        if(!Lodop){
            return;
        }
        arr.map(item => {
            // 模板
            const htmlStr = _.template(omitTemplate)(item);
            Lodop.PRINT_INIT('');
            Lodop.SET_PRINTER_INDEX('package_print');
            Lodop.ADD_PRINT_TEXT('2%','44%','30%','50px','缺货清单');
            Lodop.SET_PRINT_STYLEA(1, 'FontSize', 20);
            Lodop.SET_PRINT_STYLEA(1, 'FontWeight', 600);
            // 条形码
            Lodop.ADD_PRINT_BARCODE('5%','40%','30%','50px','128A',this.pickNo);
            // html内容模板
            Lodop.ADD_PRINT_HTM('10%', '1%', '98%', '94%', htmlStr);
            // Lodop.PREVIEW();
            Lodop.PRINT();
        });

    }

    // 复检完毕
    @action allCheckFinished = () => {
        const packageList = toJS(this.packageList);
        if(packageList.length < 1){
            message.warning('请扫描拣货单！');
            return;
        }
        packageList.map(item => {
            this.curPickPrint(item);
        });
        // this.checkFinished();
    }

}
export default new State();
