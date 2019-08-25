import axios from 'axios';

// 查询url
const productListUrl = '/check/countCheck';
// 开始盘点
const beginCheckUrl = '/check/checkRecordStart';
// 修改url
const editProductUrl = '/commoditySku/update';

//查询商家
const getMerchantsListUrl = '/customer/loadGrid';

// 根据商家查询库存
const getAreaCodeListUrl = '/check/queryAreaCodeList';

// 根据商家查询商品
const getCommodityIdListUrl = '/check/queryCusCommdityList';

class Service {

    getProductList = req => {
        return new Promise((resolve, reject) => {
            axios.post(productListUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    addProduct = req => {
        return new Promise((resolve, reject) => {
            axios.post(addProductUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    editProduct = req => {
        return new Promise((resolve, reject) => {
            axios.post(editProductUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    getMerchantsList = req => {
        return new Promise((resolve, reject) => {
            axios.post(getMerchantsListUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    beginCheck = req => {
        return new Promise((resolve, reject) => {
            axios.post(beginCheckUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    getAreaCodeList = req => {
        return new Promise((resolve, reject) => {
            axios.get(getAreaCodeListUrl, {
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


    getCommodityIdList = req => {
        return new Promise((resolve, reject) => {
            axios.get(getCommodityIdListUrl, {
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
