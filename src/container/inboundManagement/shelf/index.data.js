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
        title: '制单人',
        dataIndex: 'maker',
        width: 150
    },
    {
        title: '制单时间',
        dataIndex: 'makeDate',
        width: 80
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 200,
        fixed: 'right',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                <span onClick={State.shelfClick.bind(this, record)}>上架</span>
                <span onClick={State.editClick.bind(this, record)}>审核</span>
                <span onClick={State.deleteClick.bind(this, record)}>删除</span>
            </div>;
        }
    }
];

export {
    colums
};