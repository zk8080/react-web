import axios from 'axios';

// 查询拣货单数据url
const tableListUrl = '/pickBill/lockPickBillData';
// 拣货完毕后更新拣货单状态
const checkFinishedUrl = '/pickBill/invoiceCheckFinished';
// 漏拣
const checkOmitUrl = '/pickBill/invoiceCheckOmit';
// 查询漏拣商品url
const getOmitStoreUrl = 'pickBill/omitStoke';
// 解锁拣货单
const unLockPickUrl = '/pickBill/unlockPick';

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

    unLockPick = req => {
        return new Promise((resolve, reject) => {
            axios.get(unLockPickUrl, {
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

    checkFinished = req => {
        return new Promise((resolve, reject) => {
            axios.get(checkFinishedUrl, {
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
