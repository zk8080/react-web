import React from 'react';

const data = [
    {
        title: '序号',
        dataIndex: 'seq',
        width: 100,
        render: (text, record, index) => {
            return index + 1;
        }
    },
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


export {
    data,
};
