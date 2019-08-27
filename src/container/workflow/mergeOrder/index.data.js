import React from 'react';

const colums = [
    {
		title: '商家名称',
		dataIndex: 'customerName',
		sorter: true,
		width: 300
	}, 
    {
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
        width: 300,
        render: (text, record) => {
            return text;
        }
	},
    {
		title: '订单号',
		dataIndex: 'orderNo',
		sorter: true,
		width: 300
	},{
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
    },
];

export {
    colums
};