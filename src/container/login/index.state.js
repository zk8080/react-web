import {observable, action, toJS} from 'mobx';
import {session} from '@utils/index';
import appStore from '@deploy/store';

class State {
    //请求参数
    @observable formData = {};
    @action setFormData = (obj = {}) => {
        this.formData = obj;
    }

    // 点击登录 发送请求
    @action loginClick = () => {
        const params = toJS(this.formData);
        appStore.setIsAuthority(true);
        session.setItem('isAuthority', {login: true});
        window.appHistory.push('/');
    }
}

export default new State();
