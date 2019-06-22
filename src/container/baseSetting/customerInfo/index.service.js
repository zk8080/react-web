import axios from 'axios';

//查询接口
const customerListUrl = '/customer/loadGrid';
//新增接口
const addCustomerUrl = '/customer/add';
//修改接口
const editCustomerUrl = '/customer/update';
//删除接口
const deleteCustomerUrl = '/customer/updateDelete';

class Service {
    getCustomerList = req => {
        return new Promise((resolve, reject) => {
            axios.post(customerListUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    addCustomer = req => {
        return new Promise((resolve, reject) => {
            axios.post(addCustomerUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    editCustomer = req => {
        return new Promise((resolve, reject) => {
            axios.post(editCustomerUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    deleteCustomer = req => {
        return new Promise((resolve, reject) => {
            axios.post(deleteCustomerUrl, req)
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
