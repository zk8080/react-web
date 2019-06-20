import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '商家名称',
        dataIndex: 'merchant',
        width: '200px'
    },
    {
        title: '品牌',
        dataIndex: 'brand',
        width: '100px'
    },
    {
        title: '联系人',
        dataIndex: 'contact',
        width: '80px'
    },
    {
        title: '联系人电话',
        dataIndex: 'contactPhone',
        width: '200px'
    },
    {
        title: '公司地址',
        dataIndex: 'address'
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 100,
        fixed: 'right',
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