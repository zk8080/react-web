import axios from 'axios';

const CustomerListUrl = '/api/customer/list';

class Service {

    getCustomerList = req => {
        return new Promise((resolve, reject) => {
            axios.get(CustomerListUrl, {
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
