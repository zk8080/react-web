import axios from 'axios';

// 查询角色列表
const getRoleUrl = '/roleInfo/getRoleList';
// 查看列表
const userListUrl = '/user/getUserList';
// 新增用户
const addUserUrl = '/user/addUser';
// 查询用户角色信息
const getUserRoleInfoUrl = '/user/queryUserRoleMenu';
// 修改和删除
const editUserInfoUrl = '/user/updateUser';

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

    getUserRoleInfo = req => {
        return new Promise((resolve, reject) => {
            axios.get(getUserRoleInfoUrl, {
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

    addUser = req => {
        return new Promise((resolve, reject) => {
            axios.post(addUserUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    getRoleList = req => {
        return new Promise((resolve, reject) => {
            axios.post(getRoleUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    editUserInfo = req => {
        return new Promise((resolve, reject) => {
            axios.post(editUserInfoUrl, req)
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
