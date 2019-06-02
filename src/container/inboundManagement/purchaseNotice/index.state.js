import {observable, action} from 'mobx';
import Service from './index.service';

class State {
    // 表格数据
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }

    //获取表格数据
    @action getQueryData = async () => {
        const res = await Service.getDataList({});
        try{
            if(res.data.ret === 0){
                const {data} = res.data.data;
                this.setTableList(data);
            }else{
                console.log(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }
}

export default new State();