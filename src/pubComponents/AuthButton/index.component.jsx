import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {session} from '@utils';
import './index.less';
class Index extends Component {
    constructor(props){
        super(props);
        this.flag = false; // 按钮权限标识
    }
    hasButtonPermission = (menuCode) => {
        const userInfo = session.getItem('userInfo');
        const allPermissionData = userInfo.menuList;
        return this.hasPermission(allPermissionData, menuCode);
    }   

    // 判断该按钮是否有权限
    hasPermission = (arr, menuCode,) => {
        this.flag = false;
        // debugger;
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if(item.pageBtnFlag == 1 && item.menuCode == menuCode){
                this.flag = true;
                break;
            }else{
                this.hasPermission(item.childMenu, menuCode);
            }
            if(this.flag){
                break;
            }
        }
        return this.flag;
    }

    render() {
        const {menuCode, children, tableBtn} = this.props;
        if( tableBtn ){
            if(this.hasButtonPermission(menuCode)){
                return children;
            } else{
                return <div className='disabledBtn'>
                    {children}
                </div>;
            }
        }else{
            return this.hasButtonPermission(menuCode) ? children : null;
        }
        
    }
}

Index.propTypes = {
    menuCode: PropTypes.string.isRequired
};

export default Index;