import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '仓库区',
        dataIndex: 'houseName',
        width: 100
    },
    {
        title: '区域编号',
        dataIndex: 'areaCode',
        width: 100
    },
    {
        title: '库位编号',
        dataIndex: 'storeCode',
        width: 100
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 50,
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