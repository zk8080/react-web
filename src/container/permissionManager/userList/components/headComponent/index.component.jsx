import React, { Component } from 'react';
import {Button} from 'antd';
import {AuthButton} from '@pubComs';

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
                    menuCode='UserManageAdd'
                >
                    <Button
                        type='primary'
                        onClick={this.props.addClick}
                    >
                        新增
                    </Button>
                </AuthButton>
                {/* <Button
                    type='primary'
                >
                    导出
                </Button> */}
            </div>
        );
    }
}


export default Index;