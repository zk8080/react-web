import axios from 'axios';

// 查询订单详情url
const queryDetailUrl = '';
// 修改url
const editProductUrl = '/order/updateOrder';

class Service {

    queryDetail = req => {
        return new Promise((resolve, reject) => {
            axios.post(queryDetailUrl, req)
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
