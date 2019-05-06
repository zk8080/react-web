import {observable, action} from 'mobx';

class State {

    @observable count = 0;
    @action setCount = (num) => {
        this.count += num;
    }
    @action remCount = (n)=>{
        this.count-=n;
    }
}

export default new State();
