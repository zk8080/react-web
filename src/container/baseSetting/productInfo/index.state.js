import {observable, action, toJS} from 'mobx';
import Service from './index.service';

class State {
    // 表格数据
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }

    //获取表格数据
    @action getProductList = async () => {
        const res = await Service.getProductList({});
        try{
            if(res.data.ret === 0){
                const {productList} = res.data.data;
                this.setTableList(productList);
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