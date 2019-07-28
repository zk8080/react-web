import axios from 'axios';

// 查询url
const tableListUrl = '/warehousing/purchaseBill/selectList';
// 新增url
const addProductUrl = '/commoditySku/add';
// 修改url
const editProductUrl = '/commoditySku/update';
// 查询商品url
const productListUrl = '/commoditySku/loadGrid';
// 查询商家url
const customerListUrl = '/customer/loadGrid';
// 查询推荐库位
const getRecommendStoreUrl = '/storehouseConfig/recommendStore';
// 上架提交url
const confirmReceiveUrl = '/warehousing/purchaseBill/confirm';


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

    confirmReceive = req => {
        return new Promise((resolve, reject) => {
            axios.post(confirmReceiveUrl, req)
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
