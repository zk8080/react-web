import {Form} from 'antd';

class FormUtils {
    //  将mobx中观察的数据 转换为mapPropsToFields所需要的结构
    objToForm = (obj = {}) => {
        const target = {};
        for(const [key,value] of Object.entries(obj)){
            target[key] = Form.createFormField(value);
            if(typeof value == 'object'){
                target[key] = Form.createFormField(value);
            }else{
                target[key] = Form.createFormField({value});
            }
        }
        return target;
    }
    //  将changeFileds的数据 转换为mobx中需要的数据结构
    formToObj = (obj = {}) => {
        const target = {};
        for(const [key,value] of Object.entries(obj)){
            target[key] = value;
        }
        return target;
    }

    // 将form数据结构 转换为接口所需借口
    formToParams = (obj = {}) => {
        const target = {};
        for(const [key,value] of Object.entries(obj)){
            target[key] = value.value;
        }
        return target;
    }

    // 将接口返回数据转换为form所需要的结构
    objDataToForm = (obj = {}) => {
        const target = {};
        for(const [key,value] of Object.entries(obj)){
            if(typeof value == 'object'){
                target[key] = value;
            }else{
                target[key] = {value};
            }
        }
        return target;
    }
}

export default new FormUtils();