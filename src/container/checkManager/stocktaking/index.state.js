import {observable, action, toJS} from 'mobx';

class State {

    // 判断当前页面展示那个组件（库存信息列表1，开始盘点2，审核3）
    @observable show = 1;
    @action setShow = (num = 1) => {
        this.show = num;
    }

}

export default new State();