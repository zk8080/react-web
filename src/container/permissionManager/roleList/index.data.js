import React from 'react';
import State from './index.state';
import {AuthButton} from '@pubComs';

const colums = [
    {
        title: '角色名',
        dataIndex: 'roleName',
        width: 150
    },
    {
        title: '角色描述',
        dataIndex: 'roleDesc',
        width: 200
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 80,
        // fixed: 'right',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                <AuthButton
                    menuCode='RoleManageUpdate'
                    tableBtn={true}
                >
                    <a onClick={State.editClick.bind(this, record)}>修改</a>
                </AuthButton>
                <AuthButton
                    menuCode='RoleManageDelete'
                    tableBtn={true}
                >
                    <a onClick={State.deleteClick.bind(this, record)}>删除</a>
                </AuthButton>
            </div>;
        }
    }
];

const treeData = [
    {
        title: '基础设置',
        key: '0-0',
        children: [
            {
                title: '商品档案',
                key: '0-0-0',
                children: [
                    {
                        title: '新增',
                        key: '0-0-0-0'
                    },
                    {
                        title: '删除',
                        key: '0-0-0-1'
                    },
                    {
                        title: '修改',
                        key: '0-0-0-2'
                    }
                ]
            },
            {
                title: '客户档案',
                key: '0-0-1',
                children: [
                    {
                        title: '新增',
                        key: '0-0-1-0'
                    },
                    {
                        title: '删除',
                        key: '0-0-1-1'
                    },
                    {
                        title: '修改',
                        key: '0-0-1-2'
                    }
                ]
            },
            {
                title: '耗材关系设置',
                key: '0-0-2',
                children: [
                    {
                        title: '新增',
                        key: '0-0-2-0'
                    },
                    {
                        title: '删除',
                        key: '0-0-2-1'
                    },
                    {
                        title: '修改',
                        key: '0-0-2-2'
                    }
                ]
            },
        ],
    },
    {
        title: '入库管理',
        key: '0-1',
        children: [
            { title: '采购通知', key: '0-1-0' },
            { title: '收货', key: '0-1-1' },
            { title: '上架', key: '0-1-2' },
        ],
    },
    {
        title: '出库管理',
        key: '0-2',
        children: [
            { title: '发货订单', key: '0-2-0' },
            { title: '拣货单生成', key: '0-2-1' },
            { title: '拣货', key: '0-2-2' },
        ],
    },
];

export {
    colums,
    treeData
};