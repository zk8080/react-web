import axios from 'axios';

const getDataListUrl = '/api/purchaseNotice/list';

class Service {

    getDataList = req => {
        return new Promise((resolve, reject) => {
            axios.get(getDataListUrl, {
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
