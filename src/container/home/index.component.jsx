import React, { Component } from 'react';
// import Child from './components/child.component';

class Index extends Component {
    constructor(props) {
        super(props);
        console.log('constructor---Parent');
        this.state={
            count: 0
        };
    }

    componentWillMount() {
        // debugger;
        console.log('componentWillMount---Parent');
    }

    componentDidMount() {
        // debugger;
        console.log('componentDidMount---Parent');
        // this.setState({
        //     count: 1
        // })
        // console.log(window._.difference([3, 2, 1], [4, 2]));
        
    }
    
    componentWillUpdate(){
        console.log('componentWillUpdate---Parent');
    }

    componentDidUpdate(){
        console.log('componentDidUpdate---Parent');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount---Parent');
    }

    push = () => {
        
        // window.appHistory.push({
        //     pathname: '/home',
        //     state: {
        //         a: '1'
        //     }
        // })
        // window.print()
    }



    render() {
        console.log('render---Parent');
        return (
            <div>
                首页
                {/* <Child /> */}
                {/* <button
                    onClick={this.push}
                >点击</button> */}
            </div>
        );
    }
}

export default Index;