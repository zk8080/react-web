import {observable, action, toJS} from 'mobx';
import {session} from '@utils/index';
import appStore from '@deploy/store';
import Service from './index.service';
import ComService from '@deploy/service';
import { message } from 'antd';

class State {

    // 点击登录 发送请求
    @action loginClick = async(value) => {
        const res = await Service.login(value);
        try{
            if(res.data.code === 0){
                const {data} = res.data;
                appStore.setGlobalUserData(data);
                appStore.setIsAuthority(true);
                session.setItem('isAuthority', {login: true});
                session.setItem('userInfo', data);
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

    // 处理字典表数据 可以对表格数据进行反显
    dealDictData = (obj) => {
        const tableDictObj = {};
        const keyArr = Object.keys(obj);
        keyArr.map(item => {
            const data = obj[item];
            const dataObj = {};
            data.map(dataItem => {
                dataObj[dataItem.code] = dataItem.name;
            });
            tableDictObj[item] = dataObj;
        });
        return tableDictObj;
    }

    // 查询字典表
    @action getAllDict = async () => {
        const res = await ComService.getDict({});
        try{
            if(res.data.code === 0){
                const {data} = res.data;
                const tableDictData = this.dealDictData(data);
                session.setItem('dictAll', data);
                session.setItem('tableDictData', tableDictData);
            }
        }
        catch(e){
            console.log(e);
        }
    }

}

export default new State();
