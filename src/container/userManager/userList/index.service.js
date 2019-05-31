import axios from 'axios';

const userListUrl = '/api/userlist';

class Service {
    getUserList = req => {
        return new Promise((resolve, reject) => {
            axios.get(userListUrl, {
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
