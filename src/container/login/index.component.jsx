import React, { Component } from 'react';
import './index.less';
import {Form} from 'antd';
import {observer, inject} from 'mobx-react';
import LoginModal from './loginModal/index.component';
import LoginState from './index.state';

@inject('appStore')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount() {
        console.log('login-willMount');
    }

    componentDidMount() {
        console.log('login-didMount');
        // eslint-disable-next-line no-undef
        Particles.init({
            selector: '.background',
            minDistance: 10,
            speed: 1,
            maxParticles: 130,
            sizeVariations: 5,
            color: '#fff'
        });
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {
        console.log('login-WillUpdate');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('login-DidUpdate');
    }

    componentWillUnmount() {

    }

    onLogin = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                LoginState.loginClick(values);
            }
        });
        
    }
    render() {
        return (
            <div className='login'>
                <Form onSubmit={this.onLogin}>
                    <LoginModal
                        form={this.props.form}
                        submitLogin={this.onLogin}
                    />
                </Form>
                <canvas className="background"></canvas>
            </div>
        );
    }
}


export default Form.create()(Index);
