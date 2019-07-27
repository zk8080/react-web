import axios from 'axios';

//查询接口
const customerListUrl = '/customer/loadGrid';
//新增接口
const addCustomerUrl = '/customer/add';
//修改接口
const editCustomerUrl = '/customer/update';
//删除接口
const deleteCustomerUrl = '/customer/updateDelete';
//查询客户下商品列表
const getProductListUrl = '/customer/loadCommodities';
// 绑定商品
const batchBindCommoditiesUrl = '/customer/batchBindCommodities';
// 删除商品
const deleteProductUrl = '/customer/batchUnbindCommodities';
//查询客户未关联的商品
const getAllProductUrl = '/customer/notBindCommodities';

class Service {
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

    addCustomer = req => {
        return new Promise((resolve, reject) => {
            axios.post(addCustomerUrl, req)
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
            axios.post(`${getProductListUrl}/${req.customerId}`, {})
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    batchBindCommodities = req => {
        return new Promise((resolve, reject) => {
            axios.post(batchBindCommoditiesUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    deleteProduct = req => {
        return new Promise((resolve, reject) => {
            axios.post(deleteProductUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    getAllProduct = req => {
        return new Promise((resolve, reject) => {
            axios.post(getAllProductUrl, req)
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
