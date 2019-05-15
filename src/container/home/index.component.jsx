import React, { Component } from 'react';
import Child from './components/child.component';

class Index extends Component {
    constructor(props) {
        super(props);
        console.log('constructor---Parent');
        this.state={
            count: 0
        }
    }

    componentWillMount() {
        console.log('componentWillMount---Parent');
    }

    componentDidMount() {
        console.log('componentDidMount---Parent');
        this.setState({
            count: 1
        })
    }
    
    componentWillUpdate(){
        console.log('componentWillUpdate---Parent')
    }

    componentDidUpdate(){
        console.log('componentDidUpdate---Parent');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount---Parent')
    }

    render() {
        console.log('render---Parent');
        return (
            <div>
                <Child />
            </div>
        )
    }
}

export default Index