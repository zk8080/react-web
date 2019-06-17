import {Form} from 'antd';

class FormUtils {
    //  将mobx中观察的数据 转换为mapPropsToFields所需要的结构
    objToForm = (obj = {}) => {
        const target = {};
        for(const [key,value] of Object.entries(obj)){
            target[key] = Form.createFormField({value});
        }
        return target;
    }
    //  将changeFileds的数据 转换为mobx中需要的数据结构
    formToObj = (obj = {}) => {
        const target = {};
        for(const [key,value] of Object.entries(obj)){
            target[key] = value.value;
        }
        return target;
    }
}

export default new FormUtils();