import axios from 'axios';

//查询商家
const getMerchantsListUrl = '/customer/loadGrid';
// 查询url
const tableListUrl = '/statistics/query/purchaseBill';

class Service {
    getTableList = req => {
        return new Promise((resolve, reject) => {
            axios.get(tableListUrl, {
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

    getMerchantsList = req => {
        return new Promise((resolve, reject) => {
            axios.post(getMerchantsListUrl, req)
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
