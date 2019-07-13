import React from 'react';
import { ColumnProps } from 'antd/es/table';

/**
 * 导入订单查询列表columns
 * @type {*[]}
 */
export const orderImportColumns: ColumnProps[] = [
	{
		title: '订单号',
		dataIndex: 'orderNo',
		sorter: true,
		width: 200
	},{
		title: '商家名称',
		dataIndex: 'customerName',
		sorter: true,
		width: 300
	},{
		title: '收件人',
		dataIndex: 'reciptName',
		sorter: true,
		width: 100
	},{
		title: '手机号',
		dataIndex: 'reciptPhone',
		sorter: true,
		width: 100
	},{
		title: '地址',
		dataIndex: 'reciptAddr',
		sorter: true,
		width: 300
	}, {
		title: '拣货单',
		dataIndex: 'billState',
		width: 200,
		render: ((text, record, index) =>
			 '正常'
		)
	},
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
