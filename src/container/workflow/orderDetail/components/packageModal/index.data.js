import React from 'react';
import {Input} from 'antd';
import State from '../../index.state';
const column = [
    {
        title: '序号',
        dataIndex: 'seq',
        width: 50,
        render: (text, record, index) => {
            return index + 1;
        }
    },
    {
		title: '商品名称',
		dataIndex: 'skuName',
        width: 200,
        render: (text, record, index) => {
            return <div className='skuName_list'>
                {
                    record.productList && record.productList.map(item => {
                        return <div  className='skuName_name'>{item.skuName}</div>;
                    })
                }
            </div>;
        }
	},{
		title: '数量',
        dataIndex: 'numbers',
        width: 100,
        render: (text, record, index) => {
            console.log( record, '----record---' ); 
            return <div className='skuName_list'>
                {
                    record.productList && record.productList.map((item, idx) => {
                        
                        return <div  className='skuName_num'>
                            <Input
                                value={item.packageNums}
                                onChange={State.editPackageNums.bind(this, record, idx)}
                            />
                        </div>;
                    })
                }
            </div>;
        }
	},
];


export {
    column,
};
