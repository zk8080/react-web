import React from 'react';
import State from './index.state';
import {AuthButton} from '@pubComs';
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
                <AuthButton
                    menuCode='strorehouseRecordStop'
                    tableBtn={true}
                >
                    { record.state == 1 &&  <a onClick={State.stopClick.bind(this, record)}>停用</a> }
                </AuthButton>
                <AuthButton
                    menuCode='strorehouseRecordActivate'
                    tableBtn={true}
                >
                    { record.state == 3 &&  <a onClick={State.deleteClick.bind(this, record)}>激活</a> }
                </AuthButton>
                <AuthButton
                    menuCode='strorehouseRecordDelete'
                    tableBtn={true}
                >
                    <a onClick={State.deleteClick.bind(this, record)}>删除</a>
                </AuthButton>
            </div>;
        }
    }
];

export {
    colums
};