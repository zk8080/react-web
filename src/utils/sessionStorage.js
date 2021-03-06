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

    // 删除sessionItem
    removeItem = (key) => {
        try{
            sessionStorage.removeItem(key);
        }
        catch(e){
            console.log(e);
        }
    }

    // 设置cookie
    setCookie = (name, value, liveMinutes) => {  
        if (liveMinutes === undefined || liveMinutes == null) {
            liveMinutes = 60 * 2;
        }
        if (typeof (liveMinutes) != 'number') {
            liveMinutes = 60 * 2;//默认120分钟
        }
        var minutes = liveMinutes * 60 * 1000;
        var exp = new Date();
        exp.setTime(exp.getTime() + minutes + 8 * 3600 * 1000);
        //path=/表示全站有效，而不是当前页
        document.cookie = name + '=' + value + ';path=/;expires=' + exp.toUTCString();
    }
}

export default new SessionStorage();