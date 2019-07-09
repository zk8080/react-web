import React from 'react';
import { ColumnProps } from 'antd/es/table';
import { Badge, Tag } from 'antd';
import BarcodeComponent from '../../../pubComponents/barcode/barcode.component';
// import BarcodeComponent from '../../../pubComponents/barcode/barcode.component';

/**
 * 拣货单列表 列配置
 * @type {{}[]}
 */
export const pickingBillColumns: ColumnProps[] = [{
	title: '拣货单号',
	dataIndex: 'pickNo',
	sorter: true
}, {
	title: '流程状态',
	dataIndex: 'processStage',
	sorter: true,
	render: (text) => {
		return <Tag color='green'> {text}</Tag>;
	}
}, {
	title: '单据状态',
	dataIndex: 'billState',
	sorter: true,
	render: (text) => {
		return <Tag color={text !== 'exception' ? 'green':'yellow'}> {text}</Tag>;
	}
}, {
	title: '打印次数',
	dataIndex: 'printTimes',
	sorter: true,
	render: (value) => {
		return <Tag color={value > 1 ? 'red' : 'green'}>{value> 1 ? '已打印' : '未打印'}</Tag>;
	}
}, {
	title: '创建时间',
	dataIndex: 'createTime',
	sorter: true
}];

export const lockPickingBillColumns: ColumnProps[] = [{
	title: '货篮号',
	dataIndex: 'basketNum'
}, {
	title: '完成状态',
	dataIndex: 'isFinish',
	render: text => {
		return text ? '拣货完成':'拣货未完成';
	}
}, {
	title: '订单号',
	dataIndex: 'orderNo'
}, {
	title: '快递单号',
	dataIndex: 'mailNo'
}, {
	title: '标准重量',
	dataIndex: 'presetWeight'
}, {
	title: '标准单位',
	dataIndex: 'weightUnit'
}];

export const lockBillCommodityColumns: ColumnProps[] = [{
	title: 'orderNo',
	dataIndex: 'orderNo'
},{
	title: 'barCode',
	dataIndex: 'barCode'
},{
	title: 'skuName',
	dataIndex: 'skuName'
},{
	title: 'modelNo',
	dataIndex: 'modelNo'
},{
	title: 'pickNumbers',
	dataIndex: 'pickNumbers'
},{
	title: 'numbers',
	dataIndex: 'numbers'
},{
	title: 'unit',
	dataIndex: 'unit'
}];
// pick_no pickNo,
// 	customer_code customerCode,
// 	bar_code barCode,
// 	SUM( numbers ) bayNums,
// 	store_code storeCode,
// 	available_nums availableNums,
// 	single_unit single,
// 	sku_name skuName,
// 	spec,
// 	model_no modelNo

export const invoiceColumns: ColumnProps[] = [{
	title: '商品条形码',
	dataIndex: 'barCode',
	render: text => {
		{/*<BarcodeUtils />*/}
		{/*<BarcodeUtils*/}
		return <BarcodeComponent code={text} height={20}/>;
	}
}, {
	title: '商品名称',
	dataIndex: 'skuName'
}, {
	title: '商品规格',
	dataIndex: 'spec'
}, {
	title: '商品型号',
	dataIndex: 'modelNo'
}, {
	title: '拣货数量',
	dataIndex: 'bayNums',
	render: (text, row) => {
		return text + ' ' + row.single;
	}

}, {
	title: '零拣库位',
	dataIndex: 'storeCode'
}]
