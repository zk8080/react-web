import {observable, action} from 'mobx';
import Service from './index.service';
import { message } from 'antd';

class State {

    //用户列表
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }

    // 获取用户列表
    @action getUserList = async () => {
        const res = await Service.getUserList({});
        console.log(res, 'res');
        try{
            if(res.data.ret === 0){
                const {userList} = res.data.data;
                this.setTableList(userList);
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }
}

export default new State();
