import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '商家编码',
        dataIndex: 'customerCode',
        width: 150
    },
    {
        title: '商家名称',
        dataIndex: 'customerName',
        width: 150
    },
    {
        title: '商品条码',
        dataIndex: 'skuCode',
        width: 150
    },
    {
        title: '商品名称',
        dataIndex: 'commodityName',
        width: 150
    },
    {
        title: '型号',
        dataIndex: 'modelNo',
        width: 100
    },
    {
        title: '规格',
        dataIndex: 'spec',
        width: 100
    },
    {
        title: '入库数量',
        dataIndex: 'inStorehouseNum',
        width: 100
    }
];

export {
    colums
};