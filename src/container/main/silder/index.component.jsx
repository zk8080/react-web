import React, { Component } from 'react';
import './index.less';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';
import MenuData from './index.data';

const SubMenu = Menu.SubMenu;


class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openKeys: ['01-01']
        }
    }

    rootSubmenuKeys = ['01', '02']

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    renderMenu = (arr) => {
        return arr.map( item => {
            return <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                    {item.children && this.renderChildMenu(item.children)}
                </SubMenu>
        })
    }

    renderChildMenu = (arr) => {
        return arr.map( item => {
            return <Menu.Item key={item.key}><Link to={item.url}>{item.title}</Link></Menu.Item>
        } )
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                className='silder'
            >
                {
                    this.renderMenu(MenuData)
                }
            </Menu>
        )
    }
}

export default Index