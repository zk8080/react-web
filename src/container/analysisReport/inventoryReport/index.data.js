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
        title: '品牌',
        dataIndex: 'banner',
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
        title: '商品库存',
        dataIndex: 'availableNums',
        width: 100
    },
    {
        title: '可用库存',
        dataIndex: 'emptyAvailableNums',
        width: 100
    },
    {
        title: '占用库存',
        dataIndex: 'usedAvailableNums',
        width: 100
    },
    {
        title: '总库存量',
        dataIndex: 'totalStoreNums',
        width: 100
    },
    {
        title: '不可用库存',
        dataIndex: 'notUsedStoreNums',
        width: 100
    },
    {
        title: '出库数量',
        dataIndex: 'outStorehouseNum',
        width: 100
    },
    {
        title: '库位可用天数',
        dataIndex: 'availableDay',
        width: 100
    }
];

export {
    colums
};