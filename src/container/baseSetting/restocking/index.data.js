import React from 'react';
import moment from 'moment';
import State from './index.state';
const colums = [
    {
        title: '补货单号',
        dataIndex: 'replenishmentNo',
        width: 200
    },
    {
        title: '商家名称',
        dataIndex: 'customerName',
        width: 200
    },
    {
        title: '日期',
        dataIndex: 'createTime',
        width: 80,
        render:(text) => {
            return text?moment(text).format('YYYY-MM-DD'):null;
        }
    },
    // {
    //     title: '补货人',
    //     dataIndex: 'commodityName',
    //     width: 150
    // },
    {
        title: '商品名称',
        dataIndex: 'skuName',
        width: 200
    },
    {
        title: '型号',
        dataIndex: 'modelNo',
        width: 80
    },
    {
        title: '规格',
        dataIndex: 'spec',
        width: 80
    },
    {
        title: '单位',
        dataIndex: 'singleUnit',
        width: 80
    },
    {
        title: '数量',
        dataIndex: 'stockoutNums',
        width: 80
    },
    {
        title: '商品条码',
        dataIndex: 'commodityCode',
        width: 80
    },
    {
        title: '零拣库位',
        dataIndex: 'storeCode',
        width: 150
    },
    {
        title: '存储库位',
        dataIndex: 'finalStoreCode',
        width: 200
    },
    {
        title: '操作',
        dataIndex: 'operate',
        width: 100,
        render: (text, record, index) => {
            return <a disabled={record.isFinally == 1} onClick={State.confirmRestock.bind(this, record)}>确认补货</a>
        }
    }
];

export default colums;