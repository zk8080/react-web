import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '仓库区',
        dataIndex: 'houseName',
        width: '10%'
    },
    {
        title: '区域编号',
        dataIndex: 'areaCode',
        width: '10%'
    },
    {
        title: '库位编号',
        dataIndex: 'storeCode',
        width: '10%'
    },
    {
        title: '库位状态',
        dataIndex: 'state',
        width: '10%',
        render: (text) => {
            if(text === 1){
                return <span>正常</span>;
            }
            if(text === 3){
                return <span>停用</span>;
            }
        }
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: '15%',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                { record.state == 1 &&  <span onClick={State.stopClick.bind(this, record)}>停用</span> }
                { record.state == 3 &&  <span onClick={State.deleteClick.bind(this, record)}>激活</span> }
                <span onClick={State.deleteClick.bind(this, record)}>删除</span>
            </div>;
        }
    }
];

export {
    colums
};