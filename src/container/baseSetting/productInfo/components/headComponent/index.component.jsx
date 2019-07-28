import React, { Component } from 'react';
import {Button} from 'antd';
import {DownLoad} from '@pubComs';

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
                {/* <DownLoad
                    path='/excel/exportUser'
                /> */}
            </div>
        );
    }
}


export default Index;