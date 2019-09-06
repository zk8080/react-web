import axios from 'axios';

// 查询快递单号url
const getQueryDataList = '/expressNumber/loadGrid';
// 新增快递单号url
const addExpressUrl = '/expressNumber/batchAdd';
// 查询可用量
const getExpressNumsUrl = '/expressNumber/available';

class Service {

    getQueryData = req => {
        return new Promise((resolve, reject) => {
            axios.post(getQueryDataList, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    addExpress = req => {
        return new Promise((resolve, reject) => {
            axios.get(addExpressUrl, {
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
    getExpressNums = req => {
        return new Promise((resolve, reject) => {
            axios.get(getExpressNumsUrl, {
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
