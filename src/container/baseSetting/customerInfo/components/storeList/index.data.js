import React from 'react';
import {pubFunction} from '@utils';

const colums = [
    {
        title: '仓库区',
        dataIndex: 'houseCode',
        width: '25%',
        render: (text) => {
            const tableDictData = pubFunction.getTableDict('CK-GN');
            return <span>{tableDictData[text]}</span>;
        }
    },
    {
        title: '区域编号',
        dataIndex: 'areaCode',
        width: '25%'
    },
    {
        title: '库位编号',
        dataIndex: 'storeCode',
        width: '25%'
    },
    {
        title: '库位状态',
        dataIndex: 'state',
        width: '25%',
        render: (text) => {
            if(text === 1){
                return <span>正常</span>;
            }
            if(text === 3){
                return <span>停用</span>;
            }
        }
    },
];

export {
    colums
};