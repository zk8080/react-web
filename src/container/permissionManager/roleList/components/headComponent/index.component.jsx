import React, { Component } from 'react';
import {Button} from 'antd';

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