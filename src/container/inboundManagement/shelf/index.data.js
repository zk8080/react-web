import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '采购单号',
        dataIndex: 'purchaseNo',
        width: 150
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
        width: 150
    },
    {
        title: '商家',
        dataIndex: 'customerName',
        width: 150
    },
    {
        title: '联系人',
        dataIndex: 'contacts',
        width: 200
    },
    {
        title: '联系电话',
        dataIndex: 'contactsTel',
        width: 80
    },
    {
        title: '地址',
        dataIndex: 'address',
        width: 80
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 200,
        fixed: 'right',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                <a onClick={State.detailClick.bind(this, record)}>查看</a>
                <a disabled={record.billState != 'recevied'} onClick={State.shelfModal.bind(this, record)}>上架</a>
                <a disabled={record.billState != 'stored'} onClick={State.auditClick.bind(this, record)}>审核</a>
            </div>;
        }
    }
];

export {
    colums
};