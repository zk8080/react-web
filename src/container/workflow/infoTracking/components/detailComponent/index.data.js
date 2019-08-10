import React from 'react';
import moment from 'moment';

const columns1 = [
    {
        title: '商品名称',
        dataIndex: 'commodityName',
        width: 150
    },
    {
        title: '商品条码',
        dataIndex: 'barCode',
        width: 200
    },
    {
        title: '规格',
        dataIndex: 'spec',
        width: 100
    },
    {
        title: '商品型号',
        dataIndex: 'modelNo',
        width: 150
    },
    {
        title: '商品打包数量',
        dataIndex: 'packageNums',
        width: 150
    }
];
const columns2 = [
    {
        title: '消息唯一序列号',
        dataIndex: 'serialNo',
        width: 150
    },
    {
        title: '批次号',
        dataIndex: 'batchNo',
        width: 100
    },
    {
        title: '运单号',
        dataIndex: 'traceNo',
        width: 100
    },
    {
        title: '操作时间',
        dataIndex: 'opCode',
        width: 100
    },
    {
        title: '操作码',
        dataIndex: 'opCode',
        width: 150
    },
    {
        title: '操作名称',
        dataIndex: 'opName',
        width: 150
    },
    {
        title: '操作描述',
        dataIndex: 'opDesc',
        width: 150
    },
    {
        title: '操作网点省名',
        dataIndex: 'opOrgProvName',
        width: 150
    },
    {
        title: '操作网点城市',
        dataIndex: 'opOrgCity',
        width: 80
    },
    {
        title: '操作网点编码',
        dataIndex: 'opOrgCode',
        width: 100
    },
    {
        title: '操作网点名称',
        dataIndex: 'opOrgName',
        width: 200
    },
    {
        title: '操作员工号',
        dataIndex: 'operatorNo',
        width: 100
    },
    {
        title: '单操作员工名称',
        dataIndex: 'operatorName',
        width: 200
    },
    {
        title: '执行结果',
        dataIndex: 'responseState',
        render: (text, record) => {
            return text == 1 ? '成功' : text == 0 ?'失败' : '';
        },
        width: 80
    },
    {
        title: '错误描述信息',
        dataIndex: 'errorDesc',
        width: 200
    }
];

export {
    columns1,
    columns2
};