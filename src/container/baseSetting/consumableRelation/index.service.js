import axios from 'axios';

//查询接口
const getQueryDataUrl = '/consumable/loadGrid';
//新增接口
const addDataUrl = '/consumable/batchConfig';
//修改接口
const editCustomerUrl = '/customer/update';
//删除接口
const deleteCustomerUrl = '/customer/updateDelete';
// 查询商品接口
const productListUrl = '/commoditySku/loadGrid';
// 查询耗材列表
const queryConsumableUrl = '/commoditySku/consumable';

class Service {
    getQueryData = req => {
        return new Promise((resolve, reject) => {
            axios.post(getQueryDataUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    addData = req => {
        return new Promise((resolve, reject) => {
            axios.post(addDataUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    editCustomer = req => {
        return new Promise((resolve, reject) => {
            axios.post(editCustomerUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    deleteCustomer = req => {
        return new Promise((resolve, reject) => {
            axios.post(deleteCustomerUrl, req)
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

    queryConsumable = req => {
        return new Promise((resolve, reject) => {
            axios.get(queryConsumableUrl, {
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
