import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '预警任务',
        dataIndex: 'agentName',
        width: 500
    },
    {
        title: '预警类型',
        dataIndex: 'typeName',
        width: 200
    },
    {
        title: '任务状态',
        dataIndex: 'agentState',
        width: 200,
        render: (text) => {
            if(text == '1'){
                return '已处理';
            }
            if(text == '0'){
                return '未处理';
            }
        }
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
            return <a disabled={record.agentState == 1} onClick={State.dealClick.bind(this, record)}>处理</a>;
        }
    }
    
];

export {
    colums
};