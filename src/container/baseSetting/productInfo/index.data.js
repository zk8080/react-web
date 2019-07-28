import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '商品名称',
        dataIndex: 'skuName',
        width: '20%'
    },
    {
        title: '规格',
        dataIndex: 'spec',
        width: '10%'
    },
    {
        title: '商品条形码',
        dataIndex: 'barCode',
        width: '15%'
    },
    {
        title: '商品类型',
        dataIndex: 'modelNo',
        width: '15%'
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: '20%',
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