import {observable, action, toJS} from 'mobx';
import Service from './index.service';
import { message } from 'antd';


class State {

    // 查询组件数据
    @observable queryForm = {};
    @action setQueryForm = (obj = {}) => {
        this.queryForm = obj;
    }

    // 表格数据
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }

    // 分页数据
    @observable pageInfo = {
        current: 1,
        pageSize: 15,
        total: 15
    }
    @action setPageInfo = (obj = {}) => {
        this.pageInfo = obj;
    }

    //获取表格数据
    @action getQueryData = async (page) => {
        const res = await Service.getQueryData({
            ...this.pageInfo,
            ...page
        });
        try{
            if(res.data.code === 0){
                const {rows, current, pageSize, total} = res.data.data;
                this.setTableList(rows);
                this.setPageInfo({
                    current,
                    pageSize,
                    total
                });
            }else{
                // message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 编辑弹窗显示标识
    @observable visible = false;
    @action toggleVisible = () => {
        this.visible = !this.visible;
    }


    // 新增按钮
    @action addClick = () => {
        this.toggleVisible();
    }

    // 可用量
    @observable expressNums = null;
    @action setExpressNums = (num) => {
        this.expressNums = num;
    }

    // 查询快递单可用量
    @action getExpressNums = async () => {
        const res = await Service.getExpressNums({});
        try{
            if(res.data.code === 0){
                // const {rows} = res.data.data;
                // this.setTableList(rows);
                this.setExpressNums(res.data.data);
            }else{
                // message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 新增快递单号
    @action saveData = async(obj) => {
        const res = await Service.addExpress(obj);
        try{
            if(res.data.code === 0){
                // const {rows} = res.data.data;
                // this.setTableList(rows);
                message.success('新增成功！');
                this.getQueryData();
                this.getExpressNums();
            }else{
                // message.error(res.data.msg);
            }
        }
        catch(e){
            console.log(e);
        }
    }
}

export default new State();