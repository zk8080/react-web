import React, { Component } from 'react';
import './index.less';

export default class Index extends Component {
    render() {
        return (
            <div className='error-page'>
                <h1>
                    404
                </h1>
                <p>
                    抱歉，您访问的页面不存在！
                </p>
            </div>
        );
    }
}
