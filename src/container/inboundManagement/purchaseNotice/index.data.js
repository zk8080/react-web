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
        width: 100,
        fixed: 'right',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                <span onClick={State.editClick.bind(this, record)}>修改</span>
                <span onClick={State.deleteClick.bind(this, record)}>删除</span>
            </div>;
        }
    }
];

export {
    colums
};