// 公共store
import {observable, action} from 'mobx';

class Store {
    @observable globalData = {
        name: '测试101'
    };
    @action setGlobalData = (obj = {}) => {
        this.globalData = obj;
    }

    @observable isAuthority = false;
    @action setIsAuthority = (bol = false) => {
        this.isAuthority = bol;
    }
}

export default new Store();
