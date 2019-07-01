import session from './sessionStorage';
import ComService from '@deploy/service';

class pubFunction {
    // 获取字典表
    getDictSelect = (key) => {
        try{
            const allDict = session.getItem('dictAll');
            // if(Object.keys(allDict).length === 0){
            //     const res = await ComService.getDict({});
            //     if(res.data.code === 0){
            //         const {data} = res.data;
            //         session.setItem('dictAll', data);
            //         allDict = data;
            //     }
            
            // }
            return allDict[key];
        }
        catch(e){
            console.log(e);
        }
    }
}

export default new pubFunction();