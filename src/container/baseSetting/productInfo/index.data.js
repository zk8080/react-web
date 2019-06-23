import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '商家',
        dataIndex: 'customerName',
        width: 150
    },
    {
        title: '品牌',
        dataIndex: 'brandName',
        width: 100
    },
    {
        title: '商品名称',
        dataIndex: 'skuName',
        width: 200
    },
    {
        title: '规格',
        dataIndex: 'spec',
        width: 80
    },
    {
        title: '内部条形码',
        dataIndex: 'skuCode',
        width: 150
    },
    {
        title: '商品条形码',
        dataIndex: 'barCode',
        width: 150
    },
    {
        title: '商品类型',
        dataIndex: 'modelNo',
        width: 80
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 100,
        // fixed: 'right',
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