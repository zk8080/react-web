import React, { Component } from 'react'
import './index.less';
import {Button} from 'antd';
import {observer, inject} from 'mobx-react'

@inject('appStore')
@observer
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {
        console.log('login-willMount')
    }

    componentDidMount() {
        console.log('login-didMount')
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {
        console.log('login-WillUpdate')
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('login-DidUpdate')
    }

    componentWillUnmount() {

    }

    onLogin = () => {
        this.props.appStore.setIsAuthority(true)
        this.props.history.replace('/')
    }

    render() {
        return (
            <div className='login'>
                <Button
                    onClick={this.onLogin}
                >
                    点击登录
                </Button>
            </div>
        )
    }
}


export default Index