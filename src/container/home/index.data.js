import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '商家',
        dataIndex: 'agentName',
        width: 500
    },
    {
        title: '总订单量',
        dataIndex: 'typeName',
        width: 200
    },
    {
        title: '已分拣数量',
        dataIndex: 'agentState',
        width: 200
    },
    {
        title: '已出库数量',
        dataIndex: 'createTime',
        width: 200
    }
];

export {
    colums
};