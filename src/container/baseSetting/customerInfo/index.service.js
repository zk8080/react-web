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
const getCurProductUrl = '/customer/notBindCommodities';
// 查询未关联客户的库位
const getNocustomerStoreUrl = '/storehouse/comboGridNotBind';
// 批量关联客户
const batchBindUrl = '/storehouseConfig/batchBind';
// 查询客户已关联库位
const bindCustomerStoreUrl = '/storehouseConfig/loadGrid';
// 删除已关联库位
const deleteStoreUrl = '/storehouseConfig/delete';

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
            axios.post(`${getProductListUrl}/${req.customerId}`, req.loadGrid)
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

    getCurProduct = req => {
        return new Promise((resolve, reject) => {
            axios.post(getCurProductUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }
    
    getNocustomerStore = req => {
        return new Promise((resolve, reject) => {
            axios.post(getNocustomerStoreUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    batchBind = req => {
        return new Promise((resolve, reject) => {
            axios.post(batchBindUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    bindCustomerStore = req => {
        return new Promise((resolve, reject) => {
            axios.post(bindCustomerStoreUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    deleteStore = req => {
        return new Promise((resolve, reject) => {
            axios.get(deleteStoreUrl, {
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
