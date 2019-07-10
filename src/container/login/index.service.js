import axios from 'axios';

// 查询字典表
const getDictUrl = '/dict/loadAll';
// 登录
const loginUrl = '/user/login';

class Service {
    // 查询字典表
    getDict = req => {
        return new Promise((resolve, reject) => {
            axios.get(getDictUrl, {
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

    login = req => {
        return new Promise((resolve, reject) => {
            axios.post(loginUrl, req)
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
