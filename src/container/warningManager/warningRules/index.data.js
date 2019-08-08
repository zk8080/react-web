import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '规则名称',
        dataIndex: 'ruleName',
        width: 300
    },
    {
        title: '规则类型',
        dataIndex: 'ruleTypeName',
        width: 200
    },
    {
        title: '左规则值',
        dataIndex: 'leftValue',
        width: 200
    },
    {
        title: '右规则值',
        dataIndex: 'rightValue',
        width: 200
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 200
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 100,
        fixed: 'right',
        render: (text, record, index) => {
            return <a onClick={State.deleteClick.bind(this, record)}>删除</a>;
        }
    }
    
];

export {
    colums
};