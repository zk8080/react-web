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
            axios.get(roleListUrl, {
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
}

export default new Service();
