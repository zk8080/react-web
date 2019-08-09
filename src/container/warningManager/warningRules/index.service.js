import axios from 'axios';

// 查询代办列表
const getQueryDataList = '/rulesConfig/getList';
// 新增规则
const addConfigUrl = '/rulesConfig/add';
// 修改规则
const updateConfigUrl = '/rulesConfig/update';
// 删除规则
const deleteConfigUrl = '/rulesConfig/deal';

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

    addConfig = req => {
        return new Promise((resolve, reject) => {
            axios.post(addConfigUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    updateConfig = req => {
        return new Promise((resolve, reject) => {
            axios.post(updateConfigUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    deleteConfig = req => {
        return new Promise((resolve, reject) => {
            axios.get(deleteConfigUrl, {
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
