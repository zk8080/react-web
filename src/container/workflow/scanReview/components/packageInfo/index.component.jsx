import React, { Component } from 'react';
import './index.less';

class Index extends Component {

    render() {
        const { data, reviewUser, pickerUser } = this.props;
        return (
            <div className='package_box'>
                <h1 className='title'>商品信息</h1>
                <div className='column_count'>
                    {data.basketNum}
                </div>
                <div className='product_info'>
                    <div>
                        <span>商品名称：</span><span>{data.skuName}</span>
                    </div>
                    <div>
                        <span>扫描人：</span><span>{reviewUser}</span>
                    </div>
                    <div>
                        <span>拣货人：</span><span>{pickerUser}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
