import { observable, action, toJS } from 'mobx';
import { defaultPage, LoadGrid } from '../../../utils/load-serve';
import { BaseState } from '../../../deploy/state/base-state';
import Service from './index.service';
import {message} from 'antd';
/**
 * 订单导入
 */
class OrderImportState extends BaseState{
    // eslint-disable-next-line no-useless-constructor
    constructor(...rest){
        super(...rest);
    }
	@observable orderCommodityData: [];
	@action refreshOrderCommodityDate = (orderCommodityData = []) => {
		this.orderCommodityData = orderCommodityData;
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

	@action loadGrid = (param = {}) => {
		this.post('/order/loadGrid', param, result => {
            if(result.code === 0){
                const {rows, current, pageSize, total} = result.data;
                this.setTableList(rows);
                this.setPageInfo({
                    current,
                    pageSize,
                    total
                });
            }
		});
    }
    
    //点击查看
    @action lookClick = (record) => {
        window.appHistory.push({
            pathname: '/orderDetail/index',
            state: toJS(record)
        });
    }

    // 取消订单
    @action closeOrder = async(record) => {
        const params = {
            systemOrderNo: record.systemOrderNo
        };
        const res = await Service.cancelOrder(params);
        try{
            if(res.data.code == 0){
                message.success(res.data.msg);
                this.loadGrid();
            }
        }
        catch(e){
            console.log(e);
        }
    }

    // 拆包按钮
    @action unPackage = async (record) => {
        const params = {};
        const res = await Service.generate(params);
        try{
            if(res.data.code === 0){
                console.log(res.data, 'res.data');
                this.splitPackage(record);
            }
        }
        catch(e){
            console.log(e);
        }

    }

    // 生成包裹
    @action splitPackage = async (record) => {
        const { orderNo, customerCode, systemOrderNo } = record;
        const params = {
            orderNo,
            customerCode,
            systemOrderNo
        };
        const res = await Service.splitPackage(params);
        try{
            if(res.data.code === 0){
                message.success(res.data.msg);
                this.loadGrid()
            }
        }
        catch(e){
            console.log(e);
        }
    }
}

export default new OrderImportState();
