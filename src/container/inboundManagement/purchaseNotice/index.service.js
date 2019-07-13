import axios from 'axios';

// 查询url
const productListUrl = '/warehousing/purchaseBill/selectList';
// 新增url
const addProductUrl = '/warehousing/purchaseBill/add';
// 修改url
const editProductUrl = '/warehousing/purchaseBill/update';
// 删除url
const deleteUrl = '/warehousing/purchaseBill/delete';


class Service {

    getTableList = req => {
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

    deleteData = req => {
        return new Promise((resolve, reject) => {
            axios.get(`${deleteUrl}/${req.id}`)
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
