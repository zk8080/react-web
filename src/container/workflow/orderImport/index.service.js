import axios from 'axios';

// 修改url
const editProductUrl = '/order/updateOrder';
// 查询商品url
const productListUrl = '/commoditySku/loadGrid';
// 删除url
const deleteUrl = '/warehousing/purchaseBill/delete';

class Service {

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
}

export default new Service();
