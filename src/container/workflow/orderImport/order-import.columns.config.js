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
		width: '20%'
	},{
		title: '商家名称',
		dataIndex: 'customerName',
		sorter: true,
		width: '20%'
	},{
		title: '收件人',
		dataIndex: 'reciptName',
		sorter: true,
		width: '10%'
	},{
		title: '手机号',
		dataIndex: 'reciptPhone',
		sorter: true,
		width: '10%'
	},{
		title: '地址',
		dataIndex: 'reciptAddr',
		sorter: true,
		width: '30%'
	}, {
		title: '拣货单',
		dataIndex: 'billState',
		width: '10%',
		render: ((text, record, index) =>
			 '正常'
		)
	},
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 200,
        fixed: 'right',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                <a onClick={orderImportState.lookClick.bind(this, record)}>查看</a>
                {/* <a onClick={orderImportState.editClick.bind(this, record)}>修改</a>
                <a>删除</a> */}
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
