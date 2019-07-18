import {observable, action, toJS} from 'mobx';
import {session} from '@utils/index';
import appStore from '@deploy/store';
import Service from './index.service';
import ComService from '@deploy/service';

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
        this.getAllDict();
        window.appHistory.push('/');
    }

    // 查询字典表
    @action getAllDict = async () => {
        const res = await ComService.getDict({});
        try{
            if(res.data.code === 0){
                const {data} = res.data;
                session.setItem('dictAll', data);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    //调用登陆接口
    @action login = async() => {
        
    }
}

export default new State();
