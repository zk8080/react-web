import axios from 'axios';

// 查询代办列表
const getQueryDataList = '/index/orderStatistics';

class Service {

    getQueryData = req => {
        return new Promise((resolve, reject) => {
            axios.get(getQueryDataList, {
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
