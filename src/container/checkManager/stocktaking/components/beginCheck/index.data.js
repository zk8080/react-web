import React from 'react';
import State from './index.state';
import { Input } from 'antd';
import { switchCase } from '@babel/types';

const colums = [
    {
        title: '商品名称',
        dataIndex: 'commodityName',
        width: 150
    },
    {
        title: '商品条码',
        dataIndex: 'skuCode',
        width: 80
    },
    {
        title: '型号',
        dataIndex: 'modelNo',
        width: 80
    },
    {
        title: '规格',
        dataIndex: 'fspec',
        width: 80
    },
    {
        title: '库位类型',
        dataIndex: 'storeType',
        width: 80
    },
    {
        title: '库位编码',
        dataIndex: 'storeCode',
        width: 80
    },
    {
        title: '库存数量',
        dataIndex: 'storeNums',
        width: 80
    },
    {
        title: '初盘数量',
        dataIndex: 'firstCheckNums',
        width: 100,
        render: (text, record, index) => {
            return <Input defaultValue={text} placeholder='请输入' onChange={State.changeCheckNums.bind(this, 'firstCheckNums',index)} />;
        }
    },
    {
        title: '复盘数量',
        dataIndex: 'secondCheckNums',
        width: 100,
        render: (text, record, index) => {
            return <Input defaultValue={text} placeholder='请输入' onChange={State.changeCheckNums.bind(this, 'firstCheckNums',index)} />;
        }
    },
    {
        title: '终盘数量',
        dataIndex: 'thirdCheckNums',
        width: 100,
        render: (text, record, index) => {
            return <Input defaultValue={text} placeholder='请输入' onChange={State.changeCheckNums.bind(this, 'firstCheckNums',index)} />;
        }
    },
    {
        title: '差异',
        dataIndex: 'diffNums',
        width: 100
    },
    {
        title: '盘点日期',
        dataIndex: 'checkDate',
        width: 100
    },
    {
        title: '单据状态',
        dataIndex: 'billState',
        width: 100,
        render:(text)=>{
            let txt;
            switch (text){
                case 'save':
                    txt = '初始化';
                    break;
                case 'approving':
                    txt = '审批中';
                    break;
                case 'approved':
                    txt = '审批完成';
                    break;
                case 'approve_fail':
                    txt = '审批失败';
                    break;
                case 'cancel':
                    txt = '作废';
                    break;
            } 
            return txt;
        }
    }
];

export default colums;