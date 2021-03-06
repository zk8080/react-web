import React from 'react';
import { Input } from 'antd';
import State from '../../index.state';
const noFoodColumns = [
    {
        title: '序号',
        dataIndex: 'seq',
        width: 100,
        render: (text, record, index) => {
            return index + 1;
        }
    },
    {
        title: '商品名称',
        dataIndex: 'commodityName',
        width: 200,
        render: (text, record, index) => {
            return <Input disabled={State.disabled} value={text} onClick={State.openSkuModal.bind(this, record, index)}/>;
        }
        // editable: true,
        // required: true,
        // type: 'select',
        // code: 'skuName',
        // name: 'skuName'
    },
    {
        title: '型号',
        dataIndex: 'modelNo',
        width: 150,
        // editable: true,
    },
    {
        title: '规格',
        dataIndex: 'spec',
        width: 200,
        // editable: true,
    },
    {
        title: '单位',
        dataIndex: 'unit',
        width: 150,
        // editable: true,
        // required: true
    },
    {
        title: '商品条码',
        dataIndex: 'barCode',
        width: 200,
        // editable: true,
        required: true
    },
    {
        title: '体积m³',
        dataIndex: 'volume',
        width: 150,
        // editable: true,
        required: true
    },
    {
        title: '重量KG',
        dataIndex: 'weight',
        width: 150,
        // editable: true,
        required: true
    },
    {
        title: '采购数量',
        dataIndex: 'purchaseNums',
        width: 150,
        editable: true,
        required: true
    },
    {
        title: '到货日期',
        dataIndex: 'arrivalDate',
        width: 200,
        editable: true,
        required: true,
        type: 'date'
    },
    {
        title: '备注',
        dataIndex: 'remark',
        width: 200,
        editable: true,
    }
];

const foodColumns = [
    {
        title: '序号',
        dataIndex: 'seq',
        width: 100,
        render: (text, record, index) => {
            return index + 1;
        }
    },
    {
        title: '商品名称',
        dataIndex: 'commodityName',
        width: 200,
        render: (text, record, index) => {
            return <Input disabled={State.disabled} value={text} onClick={State.openSkuModal.bind(this, record, index)}/>;
        }
        // editable: true,
        // required: true,
        // type: 'select',
        // code: 'skuName',
        // name: 'skuName'
    },
    {
        title: '型号',
        dataIndex: 'modelNo',
        width: 150,
        // editable: true,
    },
    {
        title: '规格',
        dataIndex: 'spec',
        width: 200,
        // editable: true,
    },
    {
        title: '单位',
        dataIndex: 'unit',
        width: 150,
        // editable: true,
        required: true
    },
    {
        title: '商品条码',
        dataIndex: 'barCode',
        width: 200,
        // editable: true,
        required: true
    },
    {
        title: '体积m³',
        dataIndex: 'volume',
        width: 150,
        // editable: true,
        required: true
    },
    {
        title: '重量KG',
        dataIndex: 'weight',
        width: 150,
        // editable: true,
        required: true
    },
    {
        title: '采购数量',
        dataIndex: 'purchaseNums',
        width: 150,
        editable: true,
        required: true
    },
    {
        title: '到货日期',
        dataIndex: 'arrivalDate',
        width: 200,
        editable: true,
        required: true,
        type: 'date'
    },
    {
        title: '生产日期',
        dataIndex: 'productionDate',
        editable: true,
        required: true,
        width: 200,
        type: 'date'
    },
    {
        title: '保质期(天)',
        dataIndex: 'shilfLife',
        editable: true,
        required: true,
        width: 200
    },
    {
        title: '备注',
        dataIndex: 'remark',
        width: 200,
        editable: true,
    }
];

export {
    noFoodColumns,
    foodColumns
};
