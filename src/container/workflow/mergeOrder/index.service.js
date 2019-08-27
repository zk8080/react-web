import axios from 'axios';

// 查询url
const queryTableDataUrl = '/order/loadCanMergeGrid';
// 合包
const mergeOrderUrl = '/order/mergeOrders';

class Service {

    getTableData = req => {
        return new Promise((resolve, reject) => {
            axios.post(queryTableDataUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    mergeOrder = req => {
        return new Promise((resolve, reject) => {
            axios.post(mergeOrderUrl, req)
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
