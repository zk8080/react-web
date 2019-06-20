import React, { Component, Fragment } from 'react';
import {Button} from 'antd';

class Index extends Component {

    state = {
        url: ''
    }

    downloadClick = () => {
        
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
                <iframe title='导出' frameborder="0" style={{display: 'none'}} src={this.state.url}></iframe>
            </Fragment>
        );
    }
}

export default Index;