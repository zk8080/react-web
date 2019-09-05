import React from 'react';
import State from './index.state';
import moment from 'moment';
import {AuthButton} from '@pubComs';

const colums = [
    {
        title: '商家名称',
        dataIndex: 'customerName',
        width: 150
    },
    {
        title: '订单号',
        dataIndex: 'orderNo',
        width: 200
    },
    {
        title: '快递单号',
        dataIndex: 'mailNo',
        width: 200
    },
    {
        title: '发送状态',
        dataIndex: 'sendState',
        render: (text, record) => {
            return text == 1 ? '已发送' : '未发送';
        },
        width: 150
    },
    {
        title: '发送失败原因',
        dataIndex: 'failReason',
        width: 150
    },
    {
        title: '是否捡货完成',
        dataIndex: 'isFinish',
        render: (text, record) => {
            return text == 1 ? '是' : '否';
        },
        width: 150
    },
    {
        title: '是否称重完成',
        dataIndex: 'isWeight',
        render: (text, record) => {
            return text == 1 ? '是' : '否';
        },
        width: 200
    },
    {
        title: '订单日期',
        dataIndex: 'orderDate',
        render: (text, record) => {
            return text && moment(text).format('YYYY-MM-DD');
        },
        width: 200
    },
    {
        title: '收件人姓名',
        dataIndex: 'reciptName',
        width: 80
    },
    {
        title: '收件人电话',
        dataIndex: 'reciptPhone',
        width: 200
    },
    {
        title: '收件人地址',
        dataIndex: 'reciptAddr',
        width: 200
    },
    {
        title: '操作',
        dataIndex: 'opreate',
        width: 100,
        fixed: 'right',
        render: (text, record, index) => {
            return <div className='opreat-right'>
                <AuthButton
                    menuCode='ScanReviewDetail'
                    tableBtn={true}
                >
                    <a onClick={State.detailClick.bind(this, record)}>查看</a>
                </AuthButton>
                
            </div>;
        }
    }
];

export {
    colums
};