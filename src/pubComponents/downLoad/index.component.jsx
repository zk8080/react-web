import React, { Component, Fragment } from 'react';
import {Button} from 'antd';

class Index extends Component {

    state = {
        url: ''
    }

    // 点击按钮 拼接url
    downloadClick = () => {
        const path = this.props.path;
        const params = this.props.params;
        const paramsArr = [];
        for (const [key, value] of Object.entries(params)) {
            paramsArr.push(`${key}=${value}`);
        }
        const paramsStr = paramsArr.join('&');
        const url = `/wms${path}?${paramsStr}`;
        this.setState({
            url
        });
    }

    render() {
        return (
            <Fragment>
                <Button
                    type='primary'
                    onClick={this.downloadClick}
                >
                    导出
                </Button>
                <iframe title='导出' style={{display: 'none'}} src={this.state.url}></iframe>
            </Fragment>
        );
    }
}

export default Index;