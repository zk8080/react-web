import React from 'react';
import moment from 'moment';
import State from './index.state';
import {AuthButton} from '@pubComs';

const colums = [
    {
        title: '补货单号',
        dataIndex: 'replenishmentNo',
        width: 200
    },
    {
        title: '商家名称',
        dataIndex: 'customerName',
        width: 250
    },
    {
        title: '日期',
        dataIndex: 'createTime',
        width: 120,
        render:(text) => {
            return text?moment(text).format('YYYY-MM-DD'):null;
        }
    },
    // {
    //     title: '补货人',
    //     dataIndex: 'commodityName',
    //     width: 150
    // },
    {
        title: '商品名称',
        dataIndex: 'skuName',
        width: 250
    },
    {
        title: '型号',
        dataIndex: 'modelNo',
        width: 80
    },
    {
        title: '规格',
        dataIndex: 'spec',
        width: 80
    },
    {
        title: '单位',
        dataIndex: 'singleUnit',
        width: 80
    },
    {
        title: '数量',
        dataIndex: 'stockoutNums',
        width: 80
    },
    {
        title: '商品条码',
        dataIndex: 'commodityCode',
        width: 200
    },
    {
        title: '零拣库位',
        dataIndex: 'storeCode',
        width: 150
    },
    {
        title: '存储库位',
        dataIndex: 'ccStores',
        width: 200,
        render: (text, record) => {
            const storeArr = text && text.map(item => item.storeCode) || [];
            return storeArr.join(',');
        }   
    },
    {
        title: '操作',
        dataIndex: 'operate',
        width: 100,
        fixed: 'right',
        render: (text, record, index) => {
            return <AuthButton
                menuCode='ReplenishProdcutAffirm'
                tableBtn={true}
            >
                <a disabled={record.isFinally == 1} onClick={State.confirmRestock.bind(this, record)}>确认补货</a>;
            </AuthButton>;
        }
    }
];

export default colums;