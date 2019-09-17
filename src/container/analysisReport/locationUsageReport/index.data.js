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
        title: '库位类型',
        dataIndex: 'storeTypeName',
        width: 150
    },
    {
        title: '总库位数量',
        dataIndex: 'totalStoreNum',
        width: 150,
        render: (text, record) => {
            return <a onClick={State.openModal.bind(this,'totalStoreNum', record)}>{text}</a>;
        }
    },
    {
        title: '已用库位数量',
        dataIndex: 'usedStoreNum',
        width: 100,
        render: (text, record) => {
            return <a onClick={State.openModal.bind(this,'usedStoreNum', record)}>{text}</a>;
        }
    },
    {
        title: '剩余库位数量',
        dataIndex: 'residuleStoreNum',
        width: 100,
        render: (text, record) => {
            return <a onClick={State.openModal.bind(this,'residuleStoreNum', record)}>{text}</a>;
        }
    }
];

export {
    colums
};