import { BaseState } from '../../../deploy/state/base-state';
import {notification, message} from 'antd';
import { observable, action, toJS } from 'mobx';
import Service from './index.service';
import {Modal} from '@pubComs';

class OrderWeighState extends BaseState{

    // 包裹明细
    @observable tableList = [];
    @action setTableList = (arr = []) => {
        this.tableList = arr;
    }

    // 当前包裹
    @observable curPackageInfo = {};
    @action setCurPackage = (obj) => {
        this.curPackageInfo = obj;
    }

    // 查询包裹数据
    @action getTableData = async(mailNo) => {
        const params = {
            mailNo
        };
        const res = await Service.getTableList(params);
        try{
            if(res.data.code == 0){
                const {data} = res.data;
                this.setCurPackage(data);
                const tableData = toJS(this.tableList);
                if(tableData.some(item => item.mailNo == data.mailNo)){
                    tableData.map(item => {
                        if( item.mailNo == data.mailNo ){
                            item = data;
                        }
                    });
                }else{
                    tableData.push(data);
                }
                this.setTableList(tableData);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 称重对比
    @action diffWeight = (weight) => {
        const curPackageInfo = toJS(this.curPackageInfo);
        if( curPackageInfo.presetWeight ){
            const maxWeight = curPackageInfo.presetWeight * ( 1 + 0.005);
            const minWeight = curPackageInfo.presetWeight * ( 1 + 0.002);
            if( weight > maxWeight || weight < minWeight ){
                Modal.confirm({
                    title: '称重异常！',
                    content: '您称重的货物，与包裹重量不匹配！',
                    okText: '忽略异常',
                    onOk: () => {this.commitWeight(weight);},
                    cancelText: '重新称重',
                    onCancel: () => {}
                });
            }else{
                this.commitWeight(weight);
            }
        }   
    }
    
    // 提交重量
    @action commitWeight = async (weight) => {
        const mailNo = toJS(this.curPackageInfo).mailNo;
        const params = {
            mailNo: mailNo,
            realWeight:  weight
        };
        const res = await Service.ignoreWeight(params);
        try{
            if(res.data.code == 0){
                message.success('称重完成，请扫描下一个包裹！');
                this.getTableData(mailNo);
            }
        }
        catch(e){
            console.log(e);
        }
    }


}
export default new OrderWeighState();
