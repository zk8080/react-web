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

    onLogin = () => {
        this.props.appStore.setIsAuthority(true)
        this.props.history.push('/')
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