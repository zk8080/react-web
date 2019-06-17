import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '商家',
        dataIndex: 'merchant',
        width: 150
    },
    {
        title: '品牌',
        dataIndex: 'brand',
        width: 100
    },
    {
        title: '商品名称',
        dataIndex: 'productName',
        width: 200
    },
    {
        title: '规格',
        dataIndex: 'size',
        width: 80
    },
    {
        title: '内部条形码',
        dataIndex: 'size1',
        width: 150
    },
    {
        title: '商品条形码',
        dataIndex: 'size2',
        width: 150
    },
    {
        title: '商品类型',
        dataIndex: 'size3',
        width: 80
    },
    {
        title: '零拣库位',
        dataIndex: 'size4',
        width: 80
    },
    {
        title: '储存库位',
        dataIndex: 'size5',
        width: 80
    },
    {
        title: '备注',
        dataIndex: 'size6',
        width: 150
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