import React from 'react';
import {ColumnProps} from 'antd/lib/table';

/**
 * 订单打包数据列表清单数据列
 * @type {{}[]}
 */
export const orderPackageDataListColumns: ColumnProps[] = [{
	title: '订单号',
	dataIndex: 'orderNo'
}, {
	title: '商品名称',
	dataIndex: 'skuName'
}, {
	title: '购买量',
	dataIndex: 'bayNums'
}, {
	title: '使用耗材',
	dataIndex: 'useSkuName'
}, {
	title: '商品消耗范围',
	dataIndex: 'leftValue',
	render: (text, record) => text + '~' + record.rightValue
}, {
	title: '消耗基数',
	dataIndex: 'useNums'
}, {
	title: '',
	dataIndex: ''
}, {
	title: '',
	dataIndex: ''
}, {
	title: '',
	dataIndex: ''
}];
