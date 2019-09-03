import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {session} from '@utils';

class Index extends Component {
    hasButtonPermission = (roleId) => {
        const allPermissionData = session.getItem('permissionList');
        
    }   

    render() {
        const {roleId, children} = this.props;
        return this.hasButtonPermission(roleId) ? children : null;
    }
}

Index.propTypes = {
    roleId: PropTypes.string.isRequired
};

export default Index;