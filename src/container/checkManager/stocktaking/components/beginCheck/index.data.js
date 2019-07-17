import React from 'react';
import State from './index.state';
import { Input } from 'antd';

const colums = [
    {
        title: '1盘点数量',
        dataIndex: 'pandian1',
        width: 100,
        render: (text, record, index) => {
            return <Input value={text} placeholder='请输入'/>;
        }
    },
    {
        title: '2盘点数量',
        dataIndex: 'pandian2',
        width: 100,
        render: (text, record, index) => {
            return <Input value={text} placeholder='请输入'/>;
        }
    },
    {
        title: '3盘点数量',
        dataIndex: 'pandian3',
        width: 100,
        render: (text, record, index) => {
            return <Input value={text} placeholder='请输入'/>;
        }
    },
    {
        title: '差异',
        dataIndex: 'diff',
        width: 100
    }
];

export default colums;