import React, { Component } from 'react'
import {observer} from 'mobx-react';
import State from './index.state';
import {Button} from 'antd';

@observer
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {

    }

    componentDidMount() {
        State.getUserList()
    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }
    addCount = () => {
        State.setCount(1)
    }
    delCount = () =>{
        State.remCount(1)
    }
    render() {
        return (
            <div>
                {State.count}
                <Button 
                    onClick={this.addCount}
                >每次加一</Button>
                <Button onClick={this.delCount}>
                    每次减一
                </Button>
            </div>
        )
    }
}


export default Index