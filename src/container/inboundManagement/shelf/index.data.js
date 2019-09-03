import React from 'react';
import State from './index.state';
import {AuthButton} from '@pubComs';

const colums = [
    {
        title: '采购单号',
        dataIndex: 'purchaseNo',
        width: 150
    },
    {
        title: '采购单名称',
        dataIndex: 'name',
        width: 200
    },
    {
        title: '状态',
        dataIndex: 'billState',
        render: (text, record) => {
            if(record.detail && record.detail.billState == 'save'){
                return <span>保存</span>;
            }
            if(record.detail && record.detail.billState == 'recevieing'){
                return <span>待收货</span>;
            }
            if(record.detail && record.detail.billState == 'recevied'){
                return <span>已收货</span>;
            }
            if(record.detail && record.detail.billState == 'stored'){
                return <span>已入库</span>;
            }
            if(record.detail && record.detail.billState == 'approved'){
                return <span>已审核</span>;
            }
        },
        width: 150
    },
    {
        title: '采购日期',
        dataIndex: 'purchaseDate',
        width: 150
    },
    {
        title: '商家',
        dataIndex: 'customerName',
        width: 150
    },
    {
        title: '联系人',
        dataIndex: 'contacts',
        width: 200
    },
    {
        title: '联系电话',
        dataIndex: 'contactsTel',
        width: 80
    },
    {
        title: '地址',
        dataIndex: 'address',
        width: 200
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 200,
        fixed: 'right',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                <AuthButton
                    menuCode='PurchaseInformDetail'
                    tableBtn={true}
                >
                    <a onClick={State.detailClick.bind(this, record)}>查看</a>
                </AuthButton>
                <AuthButton
                    menuCode='PurchaseInformUpLine'
                    tableBtn={true}
                >
                    <a disabled={(record.detail && record.detail.billState) != 'recevied'} onClick={State.shelfModal.bind(this, record)}>上架</a>  
                </AuthButton>
                <AuthButton
                    menuCode='PurchaseInformApprove'
                    tableBtn={true}
                >
                    <a disabled={(record.detail && record.detail.billState) != 'stored'} onClick={State.auditClick.bind(this, record)}>审核</a>
                </AuthButton>
            </div>;
        }
    }
];

export {
    colums
};