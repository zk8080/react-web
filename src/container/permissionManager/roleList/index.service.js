import axios from 'axios';

// 查询角色列表
const roleListUrl = '/roleInfo/getRoleList';
// 查询菜单列表
const getMenuListUrl = '/menu/getMenuList';
// 新增角色
const addRoleUrl = '/roleInfo/addRole';
// 修改删除角色
const updateRoleUrl = '/roleInfo/updRole';
// 查询角色-菜单详情
const getRoleMenuUrl = '/roleMenu/getRoleMenuInfo';

class Service {
    getRoleList = req => {
        return new Promise((resolve, reject) => {
            axios.post(roleListUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    getRoleMenu = req => {
        return new Promise((resolve, reject) => {
            axios.post(getRoleMenuUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    addRole = req => {
        return new Promise((resolve, reject) => {
            axios.post(addRoleUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    updateRole = req => {
        return new Promise((resolve, reject) => {
            axios.post(updateRoleUrl, req)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    getMenuList = req => {
        return new Promise((resolve, reject) => {
            axios.post(getMenuListUrl, req)
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
