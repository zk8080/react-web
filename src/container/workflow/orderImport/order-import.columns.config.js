import React from 'react';
import { ColumnProps } from 'antd/es/table';
import orderImportState from './order-import.state';
// const orderImportState = new OrderImportState();
/**
 * 导入订单查询列表columns
 * @type {*[]}
 */
export const orderImportColumns: ColumnProps[] = [
	{
		title: '订单号',
		dataIndex: 'orderNo',
		sorter: true,
		width: 300
	},{
		title: '商家名称',
		dataIndex: 'customerName',
		sorter: true,
		width: 300
	}, {
		title: '状态',
		dataIndex: 'billState',
		width: 100,
		render: (text, record, index) =>{
            if(text == 'cancel'){
                return <span>订单取消</span>;
            }
            if(text == 'go_out'){
                return <span>出库</span>;
            }
            if(text == 'finished'){
                return <span>完成</span>;
            }
            if(text == 'packing'){
                return <span>打包中</span>;
            }
            if(text == 'picking'){
                return <span>拣货中</span>;
            }
            if(text == 'save'){
                return <span>保存</span>;
            }
        }
	},{
		title: '是否拆包',
		dataIndex: 'isMatched',
		sorter: true,
        width: 200,
        render: (text, record, index) =>{
            if(text == '0'){
                return <span>需要拆包</span>;
            }
            if(text == '1'){
                return <span>已拆包</span>;
            }
        }
	},{
		title: '收件人',
		dataIndex: 'reciptName',
		sorter: true,
		width: 100
	},{
		title: '手机号',
		dataIndex: 'reciptPhone',
		sorter: true,
		width: 150
	},{
		title: '地址',
		dataIndex: 'reciptAddr',
		sorter: true,
		width: 300
	},
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 200,
        fixed: 'right',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                <a onClick={orderImportState.lookClick.bind(this, record)}>查看</a>
                <a disabled={record.billState == 'cancel' || record.billState == 'go_out' || record.billState == 'finished'} onClick={orderImportState.closeOrder.bind(this, record)}>取消</a>
            </div>;
        }
    }
];
/**
 * 导入订单查询列表子columns
 * @type {Array}
 */
export const orderImportChildColumns: ColumnProps[] = [
	{
		title: '商品名称',
		dataIndex: 'skuName',
		width: '20%'
	},{
		title: '商品条形码',
		dataIndex: 'barCode',
		width: '20%'
	}, {
		title: '商品规格',
		dataIndex: 'spec'
	}, {
		title: '商品型号',
		dataIndex: 'modelNo'
	}, {
		title: '购买量',
		dataIndex: 'numbers'
	}, {
		title: '单位',
		dataIndex: 'unit'
	}
];
