// 公共store
import {observable, action} from 'mobx';

class Store {
    @observable globalData = {
        name: '测试101'
    };
    @action setGlobalData = (obj = {}) => {
        this.globalData = obj;
    }
}

export default new Store();
