import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '用户名',
        dataIndex: 'userName',
        width: 200
    },
    {
        title: '账号',
        dataIndex: 'userNo',
        width: 200
    },
    {
        title: '角色',
        dataIndex: 'role',
        width: 300
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 100,
        // fixed: 'right',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                <span onClick={State.editClick.bind(this, record)}>修改</span>
                <span onClick={State.deleteClick.bind(this, record)}>删除</span>
            </div>;
        }
    }
];

export {
    colums
};