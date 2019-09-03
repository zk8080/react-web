import React, { Component } from 'react';
import './index.less';
import { Menu, Icon } from 'antd';
import {Link, withRouter} from 'react-router-dom';
// import MenuData from './index.data';
import {inject, observer} from 'mobx-react';
import {session} from '@utils';

const SubMenu = Menu.SubMenu;

@withRouter
@inject('appStore')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MenuData: [],
            rootSubmenuKeys: [],
            openKeys: ['00'],
            selectedKeys: ['00']
        };
    }

    // rootSubmenuKeys = ['00', '01', '02', '03', '04', '05', '06', '07']

    //  打开时回调
    onOpenChange = (openKeys) => {
        const {rootSubmenuKeys} = this.state;
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    // 渲染父菜单
    renderMenu = (arr) => {
        return arr.map( item => {
            if( item.childMenu && item.menuGrade == '2' ){
                return <SubMenu key={item.menuCode} title={<span><Icon type={item.icon} /><span>{item.menuName}</span></span>}>
                    {item.childMenu && this.renderChildMenu(item.childMenu)}
                </SubMenu>;
            }else{
                return <Menu.Item 
                    key={item.menuCode}
                    className='first-menu'
                >
                    <span>
                        <Icon
                            type='home'
                        />
                        <span>
                            <Link to={item.routeUrl}>{item.menuName}</Link>
                        </span>
                    </span>
                </Menu.Item>;
            }
            
        });
    }

    // 渲染子菜单
    renderChildMenu = (arr) => {
        return arr.map( item => {
            return <Menu.Item key={item.menuCode}><Link to={item.routeUrl}>{item.menuName}</Link></Menu.Item>;
        } );
    }

    // 选择时的回调
    onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
        this.setState({
            selectedKeys
        });
    }

    // 获取当前路径 设置selectKey
    getCurSelectKeys = () => {
        const {pathname} = this.props.location;
        const {MenuData} = this.state;
        // 循环菜单路由数据，拿到当前路径对应的key
        for (let i = 0; i < MenuData.length; i++) {
            const element = MenuData[i];
            if( element.childMenu ){
                const childArr = element.childMenu;
                for (let j = 0; j < childArr.length; j++) {
                    if( childArr[j].routeUrl === pathname ){
                        return {
                            selectedKeys: childArr[j].menuCode,
                            openKeys: element.menuCode,
                            title: childArr[j].menuName
                        };
                    }
                }
            }else{
                if( element.url === pathname ){
                    return {
                        selectedKeys: element.menuCode,
                        openKeys: element.menuCode,
                        title: element.menuName
                    };
                }
            }   
        }
        return {};
    }

    componentWillMount() {
        const keyObj = this.getCurSelectKeys();
        if(keyObj){
            this.setState({
                selectedKeys: [keyObj.selectedKeys],
                openKeys: [keyObj.openKeys]
            });
            document.title = keyObj.title;
        }
        
    }

    componentDidMount() {
        const userInfo = session.getItem('userInfo');
        const allPermissionData = userInfo.menuList;
        const MenuData = allPermissionData[0].childMenu;
        const rootSubmenuKeys = MenuData.map(item => item.menuCode);
        this.setState({
            MenuData,
            rootSubmenuKeys
        });
    }

    componentDidUpdate(prevProps, prevState){
        try{
            const keyObj = this.getCurSelectKeys();
            if( prevState.selectedKeys[0] !== keyObj.selectedKeys ){
                this.setState({
                    selectedKeys: [keyObj.selectedKeys],
                    openKeys: [keyObj.openKeys]
                });
                document.title = keyObj.title;
            }
        }catch(e){
            console.log(e);
        }
        
    }

    componentWillUnmount() {

    }

    render() {
        const {appStore} = this.props;
        const {MenuData} = this.state;
        return (
            <div
                className={!appStore.collapsed ? 'silder collapsed' : 'silder'}
            >
                <Menu
                    mode="inline"
                    // theme="dark"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    selectedKeys={this.state.selectedKeys}
                    onSelect={this.onSelect}
                    inlineCollapsed={this.props.appStore.collapsed}
                >
                    {
                        this.renderMenu(MenuData)
                    }
                </Menu>
            </div>
            
        );
    }
}

export default Index;