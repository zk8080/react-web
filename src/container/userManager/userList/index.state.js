import {observable, action} from 'mobx';
import Service from './index.service';

class State {

    @observable count = 0;
    @action setCount = (num) => {
        this.count += num;
    }
    @action remCount = (n)=>{
        this.count-=n;
    }

    // 获取用户列表
    @action getUserList = async () => {
        const res = await Service.getUserList({})
        console.log(res, 'res');
    }
}

export default new State();
