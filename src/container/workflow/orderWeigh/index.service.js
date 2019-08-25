import axios from 'axios';

// 查询包裹数据
const tableListUrl = '/package/details';
// 称重完成
const ignoreWeightUrl = '/package/ignore';
// 漏拣
const checkOmitUrl = '/pickBill/invoiceCheckOmit';
// 查询漏拣商品url
const getOmitStoreUrl = 'pickBill/omitStoke';

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

    ignoreWeight = req => {
        return new Promise((resolve, reject) => {
            axios.get(ignoreWeightUrl, {
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

    checkOmit = req => {
        return new Promise((resolve, reject) => {
            axios.post(checkOmitUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    getOmitStore = req => {
        return new Promise((resolve, reject) => {
            axios.post(getOmitStoreUrl, req)
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
