import React, { Component } from 'react';
import './index.less';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';
import MenuData from './index.data';
import {inject, observer} from 'mobx-react';

const SubMenu = Menu.SubMenu;

@inject('appStore')
@observer
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openKeys: ['']
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
            if( item.children ){
                return <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                    {item.children && this.renderChildMenu(item.children)}
                </SubMenu>
            }else{
                return <Menu.Item 
                    key={item.key}
                    className='first-menu'
                >
                    <span>
                        <Icon
                            type='home'
                        />
                        <span>
                            <Link to={item.url}>{item.title}</Link>
                        </span>
                    </span>
                </Menu.Item>
            }
            
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
        const {appStore} = this.props;
        return (
            <div
                className={!appStore.collapsed ? 'silder collapsed' : 'silder'}
            >
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    defaultSelectedKeys={['00']}
                    inlineCollapsed={this.props.appStore.collapsed}
                >
                    {
                        this.renderMenu(MenuData)
                    }
                </Menu>
            </div>
            
        )
    }
}

export default Index