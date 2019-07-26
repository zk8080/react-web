import axios from 'axios';

// 查询列表（盘点记录）url
const productListUrl = '/check/queryCheckRecord';
// 获取盘点人列表url
const getCheckUserListUrl = '/user/getUserList';
// 审批提交url
const approveClickUrl = '/check/auditCheckRecord';

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

    getCheckUserList = req => {
        return new Promise((resolve, reject) => {
            axios.get(getCheckUserListUrl, {
                params:req
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

    approveClick = req => {
        return new Promise((resolve, reject) => {
            axios.post(approveClickUrl, req)
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
