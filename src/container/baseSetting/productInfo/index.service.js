import axios from 'axios';

// 查询url
const productListUrl = '/commoditySku/loadGrid';
// 新增url
const addProductUrl = '/commoditySku/add';
// 修改url
const editProductUrl = '/commoditySku/update';
// 删除url
const deleteProductUrl = '/commoditySku/delete';
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
}

export default new Service();
