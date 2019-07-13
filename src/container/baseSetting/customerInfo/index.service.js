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
// 新增商品
const addProductUrl = '/commodity/add';
// 修改商品详情
const updateProductUrl = '/commodity/update';
// 删除商品
const deleteProductUrl = '/commodity/delete';
//查询所有商品
const getAllProductUrl = '/commoditySku/loadGrid';

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

    updateProduct = req => {
        return new Promise((resolve, reject) => {
            axios.post(updateProductUrl, req)
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
            axios.get(deleteProductUrl, {
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
