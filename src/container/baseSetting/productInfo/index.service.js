import axios from 'axios';

const productListUrl = '/api/product/list';

class Service {

    getProductList = req => {
        return new Promise((resolve, reject) => {
            axios.get(productListUrl, {
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
