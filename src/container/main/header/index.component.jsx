import React, { Component } from 'react';
import './index.less';
import { inject, observer } from 'mobx-react';
import { Menu, Dropdown, Icon } from 'antd';

@inject('appStore')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    logout = () => {
        this.props.appStore.setIsAuthority(false)
        window.appHistory.push('/')
    }

    menu = () => {
        return <Menu onClick={this.logout}>
          <Menu.Item key="1">安全退出</Menu.Item>
        </Menu>
    }

    render() {
        return (
            <div className='header'>
                <div className='title'>
                    React-Demo
                </div>
                <div className='header-menu'>
                    <div className='logout'>
                        <Dropdown overlay={this.menu}>
                            <span className="ant-dropdown-link">
                                {this.props.appStore.globalData.name} <Icon type="down" />
                            </span>
                        </Dropdown>
                    </div>
                </div>
            </div>
        )
    }
}

Index.propTypes = {

}

export default Index;