import React, { Component } from 'react'

class Index extends Component {
    constructor(props) {
        super(props)
        console.log('constructor---Child')
        this.state = {}
    }

    componentWillMount() {
        console.log('componentWillMount---Child')
    }

    componentDidMount() {
        console.log('componentDidMount---Child')
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps---Child')
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate---Child')
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate---Child')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount---Child')
    }

    render() {
        console.log('render---Child')
        return (
            <div>
                Child
            </div>
        )
    }
}

export default Index