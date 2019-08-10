import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '商家Code',
        dataIndex: 'customerCode',
        width: 150
    },
    {
        title: '商家名称',
        dataIndex: 'customerName',
        width: 150
    },
    {
        title: '库位类型',
        dataIndex: 'houseCode',
        width: 150
    },
    {
        title: '总库位数量',
        dataIndex: 'totalStoreNum',
        width: 150
    },
    {
        title: '已用库位数量',
        dataIndex: 'usedStoreNum',
        width: 100
    },
    {
        title: '剩余库位数量',
        dataIndex: 'residuleStoreNum',
        width: 100
    }
];

export {
    colums
};