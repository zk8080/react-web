import axios from 'axios';

// 查询仓库信息url
const getQueryDataList = '/storehouse/loadGrid';
// 新增库位信息url
const addHouseUrl = '/storehouse/batchAdd';
// 删除仓库信息
const deleteHouseUrl = '/storehouse/delete';
// 停用仓库
const stopHouseUrl = '/storehouse/batchStop';
// 激活
const activatiUrl = '/storehouse/batchActivati';

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

    addHouse = req => {
        return new Promise((resolve, reject) => {
            axios.post(addHouseUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }
    stopHouse = req => {
        return new Promise((resolve, reject) => {
            axios.post(stopHouseUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    activatiHouse = req => {
        return new Promise((resolve, reject) => {
            axios.post(activatiUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    deleteHouse = req => {
        return new Promise((resolve, reject) => {
            axios.get(deleteHouseUrl, {
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
