import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '商家名称',
        dataIndex: 'customerName',
        width: 200
    },
    {
        title: '联系人',
        dataIndex: 'contactPerson',
        width: 80
    },
    {
        title: '联系人电话',
        dataIndex: 'phone',
        width: 150
    },
    {
        title: '公司地址',
        dataIndex: 'address',
        width: 200
    },
    {
        title: '库位单价',
        dataIndex: 'unitPrice',
        width: 200
    },
    {
        title: '库位面积',
        dataIndex: 'storeArea',
        width: 200
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 300,
        fixed: 'right',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                <span onClick={State.editClick.bind(this, record)}>修改</span>
                <span onClick={State.dealStore.bind(this, record)}>分配库位</span>
                <span onClick={State.relateGoods.bind(this, record)}>配置商品</span>
                <span onClick={State.deleteClick.bind(this, record)}>删除</span>
            </div>;
        }
    }
    
];

export {
    colums
};