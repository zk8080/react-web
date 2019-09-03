import React, { Component } from 'react';
import {Button} from 'antd';
import {DownLoad, Upload, AuthButton} from '@pubComs';

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
                <AuthButton
                    menuCode='PurchaseInformAdd'
                >
                    <Button
                        type='primary'
                        onClick={this.props.addClick}
                    >
                        新增
                    </Button>
                </AuthButton>
                <AuthButton
                    menuCode='PurchaseInformImport'
                >
                    <Upload
                        action='/wms/warehousing/purchaseBill/import'
                        successCbk={this.props.successCbk}
                    />
                </AuthButton>
                <AuthButton
                    menuCode='PurchaseInformDownload'
                >
                    <DownLoad
                        path='/warehousing/purchaseBill/downloadTemplate'
                        params={{isFood: true}}
                        title='模板下载'
                    />
                </AuthButton>
            </div>
        );
    }
}


export default Index;