import React, { Component } from 'react';
import {Button} from 'antd';
import {DownLoad, Upload} from '@pubComs';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='header-component'>
                <Button
                    type='primary'
                    onClick={this.props.addClick}
                >
                    新增
                </Button>
                <Upload
                    action='/wms/warehousing/purchaseBill/import'
                    successCbk={this.props.successCbk}
                />
                <DownLoad
                    path='/warehousing/purchaseBill/downloadTemplate'
                    params={{isFood: true}}
                    title='模板下载'
                />
            </div>
        );
    }
}


export default Index;