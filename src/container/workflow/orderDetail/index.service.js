import axios from 'axios';

// 查询订单详情url
const queryDetailUrl = '/order/loadDetails';
// 修改url
const editOrderUrl = '/order/updateOrder';

class Service {

    queryDetail = req => {
        return new Promise((resolve, reject) => {
            axios.get(queryDetailUrl, {
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

    editOrder = req => {
        return new Promise((resolve, reject) => {
            axios.post(editOrderUrl, req)
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
