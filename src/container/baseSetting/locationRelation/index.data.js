import React from 'react';
import State from './index.state';
import {AuthButton} from '@pubComs';

const colums = [
    {
        title: '商家',
        dataIndex: 'customerName',
        width: 150
    },
    {
        title: '商品名称',
        dataIndex: 'skuName',
        width: 200
    },
    {
        title: '库位',
        dataIndex: 'storeCode',
        width: 80
    },
    {
        title: '库容',
        dataIndex: 'storeNums',
        width: 80
    },
    {
        title: '库位可用量',
        dataIndex: 'availabelNums',
        width: 80
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 100,
        // fixed: 'right',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                <AuthButton
                    menuCode='storehouseRelationConfigUpdate'
                    tableBtn={true}
                >
                    <a onClick={State.editClick.bind(this, record)}>修改</a>
                </AuthButton>
                <AuthButton
                    menuCode='storehouseRelationConfigDelete'
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
