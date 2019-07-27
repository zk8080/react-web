import axios from 'axios';

// 查询代办列表
const getQueryDataList = '/warningAgent/getList';
// 处理代办数据
const dealDataUrl = '/warningAgent/deal';

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

    dealData = req => {
        return new Promise((resolve, reject) => {
            axios.get(dealDataUrl, {
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
