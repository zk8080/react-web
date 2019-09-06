import React, { Component } from 'react';
import {Button} from 'antd';
import {AuthButton} from '@pubComs';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div className='header-component'>
                <AuthButton
                    menuCode='uploadMailNoAdd'
                >
                    <Button
                        type='primary'
                        onClick={this.props.addClick}
                    >
                        新增
                    </Button>
                </AuthButton>
                <div className='nums'>
                    <span>可用单量：</span>
                    <span>{this.props.expressNums}</span>
                </div>
            </div>
        );
    }
}


export default Index;