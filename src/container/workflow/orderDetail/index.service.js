import axios from 'axios';

// 查询订单详情url
const queryDetailUrl = '/order/loadDetails';
// 修改url
const editOrderUrl = '/order/updateOrder';
// 拆包规则
const generateUrl = '/splitRule/generate';
// 生成包裹
const splitPackageUrl = '/order/splitPackage';

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

    generate = req => {
        return new Promise((resolve, reject) => {
            axios.post(generateUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    splitPackage = req => {
        return new Promise((resolve, reject) => {
            axios.get(splitPackageUrl, {
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
