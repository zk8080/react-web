import React from 'react';
import State from './index.state';

const colums = [
    {
        title: '订单号',
        dataIndex: 'orderNo',
        width: 150
    },
    {
        title: '商家名称',
        dataIndex: 'customerName',
        width: 200
    },
    {
        title: '商品名称',
        dataIndex: 'commodityName',
        width: 150
    },
    {
        title: '商家规格',
        dataIndex: 'spec',
        width: 150
    },
    {
        title: '商品型号',
        dataIndex: 'modelNo',
        width: 150
    },
    {
        title: '商品状态',
        dataIndex: 'commodityState',
        width: 200,
        render: (text) => {
            return text == 'normal'? '正常' : text == 'residual' ? '残次' : '';
        }
    },
    {
        title: '发货数量',
        dataIndex: 'deliveryNums',
        width: 100
    },
    {
        title: '退货数量',
        dataIndex: 'returnNums',
        width: 100
    },
    {
        title: '退货时间',
        dataIndex: 'createTime',
        width: 200
    },
    {
        title: '退货备注',
        dataIndex: 'returnRemark',
        width: 200
    },
    {
        title: '收件人姓名',
        dataIndex: 'reciptName',
        width: 200
    },
    {
        title: '收件人电话',
        dataIndex: 'reciptPhone',
        width: 200
    },
    // {
    //     title: '操作',
    //     dataIndex: 'opreate',
    //     width: 200,
    //     fixed: 'right',
    //     render: (text, record, index) => {
    //         return <div className='opreat-right'>
    //             <a onClick={State.detailClick.bind(this, record)}>查看</a>
    //             <a disabled={(record.detail && record.detail.billState) != 'recevied'} onClick={State.shelfModal.bind(this, record)}>上架</a>
    //             <a disabled={(record.detail && record.detail.billState) != 'stored'} onClick={State.auditClick.bind(this, record)}>审核</a>
    //         </div>;
    //     }
    // }
];

export {
    colums
};