import React, { Component } from 'react';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            count: 0
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({
        //         count: 1
        //     })
        //     console.log(this.state.count)
        // }, 0)
        new Promise(resolve => {
            resolve()
        })
        .then(res => {
            this.setState({
                count: 1
            })
            console.log(this.state.count, 'then');
            
        })
        // document.querySelector('button').addEventListener('click', this.onClick, false)
    }

    componentDidUpdate(){
        
    }

    componentWillUnmount() {

    }

    onClick = () => {
        this.setState({
            count: 1
        })
        console.log(this.state.count)
    }



    render() {
        return (
            <div>
                <button>
                    测试
                </button>
            </div>
        )
    }
}

export default Index