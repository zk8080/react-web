import {observable, action, toJS} from 'mobx';
import Service from './index.service';
import Lodash from 'lodash';

class State {

    // 是否已经扫描拣货单
    @observable isAlreadyReview = false;
    @action setIsAlreadyReview = (bol) => {
        this.isAlreadyReview = bol;
    }

    // 拣货单数据
    @observable reviewList = [];
    @action setReviewList = (arr = []) => {
        this.reviewList = arr;
    }

    // 查询拣货单数据
    @action getTableList = async (code) => {
        const params = {
            pickNo: code
        };
        const res = await Service.getTableList(params);
        console.log(res, '----res---');
        try{
            if(res.data.code === 0){
                const {data} = res.data;
                this.setReviewList(data);
                this.setIsAlreadyReview(true);
                this.dealPackageArr(data);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 包裹栏位数据
    @observable packageList = [];
    @action setPackageList = (arr = []) => {
        this.packageList = arr;
    }

    // 处理包裹数据
    dealPackageArr = (arr = []) => {
        const dataArr = [];
        arr.map(item => {
            const allData = item.packageCommodities.length;
            const lastData = item.packageCommodities.length;
            dataArr.push({
                allData,
                lastData,
                ...item
            });
        });
        this.setPackageList(dataArr);
    }

    // 扫描商品 修改栏位数据、
    @action dealProductArr = (code) => {
        const packageList = toJS(this.packageList);
        // packageList.map(item => {
            
        // });
        for (let i = 0; i < packageList.length; i++) {
            const item = packageList[i];
            const productList = item.packageCommodities;
            const productIndx = Lodash.findIndex(productList, prodItem => prodItem.commodityCode == code);
            if(productIndx >= 0){
                item.lastData --;
                productList.splice(productIndx, 1);
                // item.packageCommodities = productList;
                break;
            }
        }
        console.log(packageList, '---packageList---'  );
        this.setPackageList(packageList);
    }
}
export default new State();
