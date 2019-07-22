class SessionStorage {
    // 设置sessionItem
    setItem = (name, obj) => {
        try{
            sessionStorage.setItem(name, JSON.stringify(obj));
        }
        catch(e){
            console.log(e);
        }
    }
    // 获取sessionItem
    getItem = (key) => {
        try{
            const data = JSON.parse(sessionStorage.getItem(key) || '{}');
            return data;
        }
        catch(e){
            console.log(e);
        }
    }

    // 设置cookie
    setCookie = (name,value) => {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + '='+ escape (value) + ';expires=' + exp.toGMTString();
    }
}

export default new SessionStorage();