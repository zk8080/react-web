import React from 'react';
import State from './index.state';

const columns = [
    {
        title: '序号',
        dataIndex: 'seq',
        width: 50,
        render: (text, record, index) => {
            return index + 1;
        }
    },
    {
		title: '商品名称',
		dataIndex: 'skuName',
		width: 200
	},{
		title: '商品条形码',
		dataIndex: 'barCode',
		width: 200
	}, {
		title: '商品规格',
        dataIndex: 'spec',
        width: 100
	}, {
		title: '商品型号',
        dataIndex: 'modelNo',
        width: 100
	}, {
		title: '购买量',
        dataIndex: 'numbers',
        width: 100
	}, {
		title: '单位',
        dataIndex: 'unit',
        width: 100
	}
];

const packageColumn = [
    {
        title: '序号',
        dataIndex: 'seq',
        width: 50,
        render: (text, record, index) => {
            return index + 1;
        }
    },
    {
		title: '订单号',
		dataIndex: 'orderNo',
		width: 200
	},{
		title: '快递单号',
		dataIndex: 'mailNo',
		width: 200
	},{
        title: '发送状态',
        dataIndex: 'sendState',
        render: (text, record) => {
            return text == 1 ? '已发送' : '未发送';
        },
        width: 150
    },{
        title: '操作',
        dataIndex: 'opreate',
        width: 150,
        render: (text, record) => {
            return <div className='opreat-right'>
                <a onClick={State.lookPackage.bind(this, record)}>查看详情</a>
            </div>;
        },
    },
];

export {
    columns,
    packageColumn
};
