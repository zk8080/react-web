import axios from 'axios';

const roleListUrl = '/api/roleList';

class Service {
    getRoleList = req => {
        return new Promise((resolve, reject) => {
            axios.get(roleListUrl, {
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
