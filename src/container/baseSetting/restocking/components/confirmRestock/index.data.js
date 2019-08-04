import React from 'react';
import { Select } from '@pubComs';
import { Input } from 'antd';
import State from '../../index.state';
const colums = [
    {
        title: '序号',
        dataIndex: 'order',
        width: 50
    },
    {
        title: '商品名称',
        dataIndex: 'skuName',
        width: 200
    },
    {
        title: '型号',
        dataIndex: 'modelNo',
        width: 200,
    },
    {
        title: '规格',
        dataIndex: 'spec',
        width: 200,
    },
    {
        title: '单位',
        dataIndex: 'singleUnit',
        width: 200,
    },
    {
        title: '数量',
        dataIndex: 'stockoutNums',
        width: 200,
    },
    {
        title: '商品条码',
        dataIndex: 'commodityCode',
        width: 200
    },
    {
        title: '零拣库位',
        dataIndex: 'storeCode',
        width: 200,
    },
    {
        title: '存储库位',
        dataIndex: 'id',
        width: 200,
        render: (text,record,index) => {
            return <Select 
                placeholder='请选择'
                value={text}
                option={State.finalStoreData}
                valueCode='id'
                valueName='storeCode'
                showSearch
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(value) => {State.changeRow(index, 'id', value)}}
            />
        }
    },
    {
        title: '补货数量',
        dataIndex: 'nums',
        width: 200,
        render: (text,record,index) => {
            return <Input 
                    placeholder='请输入' 
                    value={text}  
                    onChange={(e) => {State.changeRow(index, 'nums', e.target.value)}}
                />
        }
    },
];

export {
    colums
};