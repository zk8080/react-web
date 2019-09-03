import React from 'react';
import State from './index.state';
import {AuthButton} from '@pubComs';

const colums = [
    {
        title: '商家名称',
        dataIndex: 'customerName',
        width: 200
    },
    {
        title: '联系人',
        dataIndex: 'contactPerson',
        width: 80
    },
    {
        title: '联系人电话',
        dataIndex: 'phone',
        width: 150
    },
    {
        title: '公司地址',
        dataIndex: 'address',
        width: 200
    },
    {
        title: '库位单价',
        dataIndex: 'unitPrice',
        width: 200
    },
    {
        title: '库位面积',
        dataIndex: 'storeArea',
        width: 200
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 300,
        fixed: 'right',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                <AuthButton
                    menuCode='customerUpdate'
                    tableBtn={true}
                >
                    <a onClick={State.editClick.bind(this, record)}>修改</a>
                </AuthButton>
                <AuthButton
                    menuCode='customerStore'
                    tableBtn={true}
                >
                    <a onClick={State.dealStore.bind(this, record)}>分配库位</a>
                </AuthButton>
                <AuthButton
                    menuCode='customerCommodity'
                    tableBtn={true}
                >
                    <a onClick={State.relateGoods.bind(this, record)}>配置商品</a>
                </AuthButton>
                <AuthButton
                    menuCode='customerDelete'
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