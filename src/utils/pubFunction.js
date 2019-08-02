import session from './sessionStorage';

class pubFunction {
    // 获取字典表
    getDictSelect = (key) => {
        try{
            const allDict = session.getItem('dictAll');
            return allDict[key];
        }
        catch(e){
            console.log(e);
        }
    }

    // 获取反显字典表
    getTableDict = (key) => {
        try{
            const tableDict = session.getItem('tableDictData');
            return tableDict[key];
        }
        catch(e){
            console.log(e);
        }
    }
}

export default new pubFunction();