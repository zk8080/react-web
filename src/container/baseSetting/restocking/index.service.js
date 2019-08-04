import axios from 'axios';

// 查询url
const productListUrl = '/replenishment/loadGrid';

// 查询存储库位url
const getFinalStoreDataUrl = 'replenishment/loadStorehouse';

// 确认补货
const confirmRestockUrl = '/replenishment/update';

class Service {
    getProductList = req => {
        return new Promise((resolve, reject) => {
            axios.post(productListUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    getFinalStoreData = req => {
        return new Promise((resolve, reject) => {
            axios.get(getFinalStoreDataUrl, {
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


    confirmRestock = req => {
        return new Promise((resolve, reject) => {
            axios.post(confirmRestockUrl, req)
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
