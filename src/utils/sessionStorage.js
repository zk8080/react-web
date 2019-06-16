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
}

export default new SessionStorage();