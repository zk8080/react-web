import React, { Component } from 'react';
import './index.less';

class Index extends Component {

    render() {
        return (
            <div className='package_box'>
                <h1 className='title'>商品信息</h1>
                <div className='column_count'>
                    1
                </div>
                <div className='product_info'>
                    <div>
                        <span>商品名称：</span><span>西门子洗衣机</span>
                    </div>
                    <div>
                        <span>商品条码：</span><span>693214324243</span>
                    </div>
                    <div>
                        <span>商品规格：</span><span>100*80*120</span>
                    </div>
                    <div>
                        <span>商品类型：</span><span>电器</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
