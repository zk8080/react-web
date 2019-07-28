import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '采购单号',
        dataIndex: 'purchaseNo',
        width: 200
    },
    {
        title: '采购单名称',
        dataIndex: 'name',
        width: 200
    },
    {
        title: '状态',
        dataIndex: 'billState',
        render: (text) => {
            if(text == 'save'){
                return <span>保存</span>;
            }
            if(text == 'recevieing'){
                return <span>待收货</span>;
            }
            if(text == 'recevied'){
                return <span>已收货</span>;
            }
            if(text == 'stored'){
                return <span>已入库</span>;
            }
            if(text == 'approved'){
                return <span>已审核</span>;
            }
        },
        width: 150
    },
    {
        title: '采购日期',
        dataIndex: 'purchaseDate',
        width: 200
    },
    {
        title: '商家',
        dataIndex: 'customerName',
        width: 200
    },
    {
        title: '联系人',
        dataIndex: 'contacts',
        width: 100
    },
    {
        title: '联系电话',
        dataIndex: 'contactsTel',
        width: 100
    },
    {
        title: '地址',
        dataIndex: 'address',
        width: 200
    },
    {
        title: '制单人',
        dataIndex: 'maker',
        width: 100
    },
    {
        title: '制单时间',
        dataIndex: 'makeDate',
        width: 200
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 200,
        fixed: 'right',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                <a onClick={State.lookClick.bind(this, record)}>查看</a>
                <a disabled={record.billState != 'save'} onClick={State.editClick.bind(this, record)}>修改</a>
                <a disabled={record.billState != 'save'} onClick={State.receiptClick.bind(this, record)}>收货</a>
                <a disabled={record.billState != 'save'} onClick={State.deleteClick.bind(this, record)}>删除</a>
            </div>;
        }
    }
];

export {
    colums
};