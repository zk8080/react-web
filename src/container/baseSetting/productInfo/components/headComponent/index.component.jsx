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
                    menuCode='productAdd'
                >
                    <Button
                        type='primary'
                        onClick={this.props.addClick}
                    >
                        新增
                    </Button>
                </AuthButton>
                {/* <DownLoad
                    path='/excel/exportUser'
                /> */}
            </div>
        );
    }
}


export default Index;