import React from 'react';
import State from '../../index.state';

const colums = [
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
                <span onClick={State.deleteProduct.bind(this, record, index)}>删除</span>
            </div>;
        }
    }
];

export {
    colums
};