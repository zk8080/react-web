import axios from 'axios';

// 取消盘点url
const cancelCheckUrl = '/check/cannelCheckRecord';
// 盘点结束
const endCheckUrl = '/check/updCheckRecord';
// 在开始盘点页面点击保存
const saveCheckUrl = '/check/saveCheckRecord';

class Service {

    cancelCheck = req => {
        return new Promise((resolve, reject) => {
            axios.post(cancelCheckUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    endCheck = req => {
        return new Promise((resolve, reject) => {
            axios.post(endCheckUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    saveCheck = req => {
        return new Promise((resolve, reject) => {
            axios.post(saveCheckUrl, req)
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
