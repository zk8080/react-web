// 公共store
import {observable, action} from 'mobx';

class Store {
    @observable globalUserData = {};
    @action setGlobalUserData = (obj = {}) => {
        this.globalUserData = obj;
    }

    //登录验证
    @observable isAuthority = false;
    @action setIsAuthority = (bol = false) => {
        this.isAuthority = bol;
    }

    //侧边栏收起标志
    @observable collapsed = false;
    @action setCollapsed = () => {
        this.collapsed = !this.collapsed;
    }
}

export default new Store();
