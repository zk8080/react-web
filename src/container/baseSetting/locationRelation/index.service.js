import axios from 'axios';

// 查询url
const getTableListUrl = '/storehouseConfig/loadGrid';
// 新增url
const addLocationUrl = '/storehouseConfig/batchConfig';
// 修改url
const updateLocationUrl = '/storehouseConfig/update';
// 删除url
const deleteLocationUrl = '/storehouseConfig/delete';
// 查询商家url
const getCustomerListUrl = '/customer/loadGrid';
// 通过商家查询商品url
const getProductListUrl = '/customer/loadCommodities';
// 查询库位url
const getStroeListUrl = '/storehouse/comboGridBind';

class Service {

    getTableList = req => {
        return new Promise((resolve, reject) => {
            axios.post(getTableListUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    addLocation = req => {
        return new Promise((resolve, reject) => {
            axios.post(addLocationUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    updateLocation = req => {
        return new Promise((resolve, reject) => {
            axios.post(updateLocationUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    deleteLocation = req => {
        return new Promise((resolve, reject) => {
            axios.get(deleteLocationUrl, {
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
            axios.post(getCustomerListUrl, req)
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

    getStroeList = req => {
        return new Promise((resolve, reject) => {
            axios.post(getStroeListUrl, req)
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
