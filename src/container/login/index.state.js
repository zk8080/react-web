import {observable, action, toJS} from 'mobx';
import {session} from '@utils/index';
import appStore from '@deploy/store';
import Service from './index.service';
import ComService from '@deploy/service';
import { message } from 'antd';

class State {
    //请求参数
    @observable formData = {};
    @action setFormData = (obj = {}) => {
        this.formData = obj;
    }

    // 点击登录 发送请求
    @action loginClick = async(obj) => {
        const res = await Service.login(obj);
        try{
            if(res.data.code === 0){
                const {data} = res.data;
                appStore.setIsAuthority(true);
                session.setItem('isAuthority', {login: true});
                this.getAllDict(); 
                session.setCookie('Wms-Token', data.token);
                window.appHistory.push('/');
            }else{
                message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
        
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
}

export default new State();
