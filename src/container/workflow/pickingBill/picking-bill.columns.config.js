import React from 'react';
import { ColumnProps } from 'antd/es/table';
import { Badge, Tag } from 'antd';
import BarcodeComponent from '../../../pubComponents/barcode/barcode.component';
import PickBillState from './picking-bill.state';
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
	title: '地区',
	dataIndex: 'areaLevel',
	render: (text) => {
        if(text == 'FIRST_AREA'){
            return <span>上海</span>;
        }
        if(text == 'SECOND_AREA'){
            return <span>江浙皖</span>;
        }
        if(text == 'OTHER_AREA'){
            return <span>全国</span>;
        }
    }
}, {
	title: '流程状态',
	dataIndex: 'processStage',
	sorter: true,
	render: (text) => {
		if(text == 'new_pick'){
            return <span>新建</span>;
        }
        if(text == 'lock'){
            return <span>锁定</span>;
        }
        if(text == 'unlock'){
            return <span>解锁</span>;
        }
        if(text == 'checkClose'){
            return <span>结束</span>;
        }
	}
}, {
	title: '单据状态',
	dataIndex: 'billState',
	sorter: true,
	render: (text) => {
        if(text == 'picking'){
            return <span>拣货中</span>;
        }
        if(text == 'save'){
            return <span>新建</span>;
        }
        if(text == 'finsih'){
            return <span>完成</span>;
        }
        if(text == 'exception'){
            return <span>异常</span>;
        }
        if(text == 'cancel'){
            return <span>取消</span>;
        }
	}
}, {
	title: '打印次数',
	dataIndex: 'printTimes',
	sorter: true,
	render: (value) => {
		return <span>{(value - 1) || 0}</span>;
	}
}, {
	title: '创建时间',
	dataIndex: 'createTime',
	sorter: true
},
{
    title: '操作',
    dataIndex: 'opreate',
    width: 100,
    fixed: 'right',
    render: (text, record, index) => {
        return <div className='opreat-right'>
            <a disabled={record.billState != 'save'} onClick={PickBillState.closePickBill.bind(this, record)}>作废</a>
        </div>;
    }
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

// commodityCode: "9505900000"
// mailNo: "1564568552887"
// modelNo: "DL-OK"
// packageNums: 4
// pickNums: 0
// singleUnit: "栈"
// skuName: "飞利浦立柱灯笼"
// spec: "黄色"
export const lockBillCommodityColumns: ColumnProps[] = [{
	title: '商品名称',
	dataIndex: 'commodityCode'
},{
	title: '商品条码',
	dataIndex: 'skuName'
},{
	title: '规格',
	dataIndex: 'spec'
},{
	title: '已检',
	dataIndex: 'pickNums'
},{
	title: '数量',
	dataIndex: 'packageNums'
},{
	title: '单位',
	dataIndex: 'singleUnit'
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
}];
