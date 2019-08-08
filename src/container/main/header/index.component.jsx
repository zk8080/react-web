import React, { Component } from 'react';
import './index.less';
import { inject, observer } from 'mobx-react';
import { Menu, Dropdown, Icon } from 'antd';
import {session} from '@utils';

@inject('appStore')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        const userData = session.getItem('userInfo');
        this.setState({
            name: userData.name
        });
    }

    componentWillUnmount() {

    }

    logout = () => {
        this.props.appStore.setIsAuthority(false);
        sessionStorage.clear();
        window.appHistory.push('/');
    }

    menu = () => {
        return <Menu onClick={this.logout}>
            <Menu.Item key="1">安全退出</Menu.Item>
        </Menu>;
    }

    render() {
        const {appStore} = this.props;
        return (
            <div className='header'>
                {
                    appStore.collapsed ?
                        <div className='icon'>
                            <Icon type='bank' />
                        </div>
                        :
                        <div className='title'>
                            <Icon type='bank' />
                            WMS
                        </div> 
                }
                
                <div className='header-menu'>
                    {/* <Button onClick={appStore.setCollapsed}>
                        <Icon type={appStore.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button> */}
                    <div className='logout'>
                        <Dropdown overlay={this.menu}>
                            <span className="ant-dropdown-link">
                                {this.state.name} <Icon type="down" />
                            </span>
                        </Dropdown>
                    </div>
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;
