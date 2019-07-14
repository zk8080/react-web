import axios from 'axios';

// 查询仓库信息url
const getQueryDataList = '/check/queryCheckRecord';
// 取消盘点url
const cannelCheckUrl = '/check/cannelCheckRecord';
// 开始盘点
const startCheckUrl = '/check/checkRecordStart';
// 审核盘点url
const auditCheckUrl = '/check/auditCheckRecord';
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

    cannelCheck = req => {
        return new Promise((resolve, reject) => {
            axios.post(cannelCheckUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }
    startCheck = req => {
        return new Promise((resolve, reject) => {
            axios.post(startCheckUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    auditCheck = req => {
        return new Promise((resolve, reject) => {
            axios.get(auditCheckUrl, {
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
