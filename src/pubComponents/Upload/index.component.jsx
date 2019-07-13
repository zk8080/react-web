import React, { Component } from 'react';
import {Upload, message, Button} from 'antd';

class Index extends Component {
    
    onChange = (info) => {
        const file = info.file;
        if( file.status === 'done' ){
            if(file.response.code === 0){
                message.success('导入成功！');
                if(this.props.successCbk){
                    this.props.successCbk();
                }
            }else{
                message.error(file.response.msg);
            }
        }
        if(file.status === 'error'){
            message.error('上传失败，请重新上传！');
        }
    }

    render() {
        return (
            <Upload
                onChange={this.onChange}
                {...this.props}
                showUploadList={false}
            >
                <Button
                    type='primary'
                >导入</Button>
            </Upload>
        );
    }
}

export default Index;