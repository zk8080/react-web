import axios from 'axios';

// 取消盘点url
const cancelCheckUrl = '/check/cannelCheckRecord';
// 新增url
const addProductUrl = '/commoditySku/add';
// 修改url
const editProductUrl = '/commoditySku/update';

class Service {

    cancelCheck = req => {
        return new Promise((resolve, reject) => {
            axios.post(cancelCheckUrl, req)
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

}

export default new Service();
