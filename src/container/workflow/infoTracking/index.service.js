import axios from 'axios';

// 查询url
const tableListUrl = '/tracking/getPickList';
// 查询商品url
const productListUrl = '/commoditySku/loadGrid';
// 查询商家url
const customerListUrl = '/customer/loadGrid';
// 查询推荐库位
const getRecommendStoreUrl = '/storehouseConfig/recommendStore';
// 上架提交url
const groundingUrl = '/warehousing/purchaseBill/grounding';
// 审核url
const confirmReceiveUrl = '/warehousing/purchaseBill/approve';

// 获取物流信息数据
const getLogisticsListUrl = '/tracking/getLogisticsInfo';

// 手工确认接口
const confirmUrl = '/tracking/trackingConfirm';


class Service {

    getTableList = req => {
        return new Promise((resolve, reject) => {
            axios.post(tableListUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    getRecommendStore = req => {
        return new Promise((resolve, reject) => {
            axios.get(getRecommendStoreUrl, {
                params: req
            })
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }
    getCustomerList = req => {
        return new Promise((resolve, reject) => {
            axios.post(customerListUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    grounding = req => {
        return new Promise((resolve, reject) => {
            axios.post(groundingUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    confirmReceive = req => {
        return new Promise((resolve, reject) => {
            axios.get(confirmReceiveUrl, {
                params: req
            })
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    getLogisticsList = req => {
        return new Promise((resolve, reject) => {
            axios.get(getLogisticsListUrl, {
                params: req
            })
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    confirm = req => {
        return new Promise((resolve, reject) => {
            axios.get(confirmUrl, {
                params: req
            })
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }
}

export default new Service();
