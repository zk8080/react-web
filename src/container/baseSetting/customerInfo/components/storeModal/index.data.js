import React from 'react';
import State from '../../index.state';

const colums = [
    {
        title: '商家名称',
        dataIndex: 'customerName',
        width: 200
    },
    {
        title: '库位',
        dataIndex: 'storeCode',
        width: 100
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 100,
        // fixed: 'right',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                <span onClick={State.deleteStore.bind(this, record, index)}>删除</span>
            </div>;
        }
    }
];

export {
    colums
};