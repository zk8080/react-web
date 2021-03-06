import axios from 'axios';

// 查询url
const tableListUrl = '/warehousing/purchaseBill/selectList';
// 新增url
const addProductUrl = '/warehousing/purchaseBill/add';
// 修改url
const editProductUrl = '/warehousing/purchaseBill/update';
// 查询商品url
const productListUrl = '/commoditySku/loadGrid';
// 查询客户下商品url
const getCustomerProductUrl = '/customer/loadCommodities';
// 删除url
const deleteUrl = '/warehousing/purchaseBill/delete';
// 查询商家url
const customerListUrl = '/customer/loadGrid';
// 收货确认url
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

    getCustomerProduct = req => {
        return new Promise((resolve, reject) => {
            axios.post(`${getCustomerProductUrl}/${req.customerId}`, req.loadGrid)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    delete = req => {
        return new Promise((resolve, reject) => {
            axios.get(`${deleteUrl}/${req.id}`, {})
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
