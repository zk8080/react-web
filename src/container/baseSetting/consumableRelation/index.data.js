import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '商品',
        dataIndex: 'skuName',
        width: 200
    },
    {
        title: '商品条码',
        dataIndex: 'commodityCode',
        width: 200
    },
    {
        title: '数量',
        dataIndex: 'rightValue',
        width: 100
    },
    {
        title: '耗材',
        dataIndex: 'useSkuName',
        width: 300
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 100,
        render: (text, record, index) => {
            return <div className='opreat-right'>
                {/* <span onClick={State.editClick.bind(this, record)}>修改</span> */}
                <span onClick={State.deleteClick.bind(this, record)}>删除</span>
            </div>;
        }
    }
    
];

export {
    colums
};