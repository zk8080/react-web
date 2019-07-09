import axios from 'axios';

// 查询仓库信息url
const getQueryDataList = '/storehouse/loadGrid';
// 新增库位信息url
const addHouseUrl = '/storehouse/add';
// 修改仓库信息url
const editHouseUrl = '/storehouse/update';
// 删除仓库信息
const deleteHouseUrl = '/storehouse/delete';


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
    editHouse = req => {
        return new Promise((resolve, reject) => {
            axios.post(editHouseUrl, req)
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
