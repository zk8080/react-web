const menuData = [
    {
        title: '首页',
        key: '00',
        icon: 'home',
        url: '/home'
    },
    {
        title: '用户管理',
        key: '01',
        icon: 'user',
        children: [
            {
                title: '用户列表',
                key: '01-01',
                url: '/user/list'
            },
            {
                title: '增加用户',
                key: '01-02',
                url: '/user/add'
            }
        ]
    },
    {
        title: '文章管理',
        key: '02',
        icon: 'file',
        children: [
            {
                title: '文章列表',
                key: '02-01',
                url: '/article/list'
            },
            {
                title: '发布文章',
                key: '02-02',
                url: '/article/add'
            }
        ]
    }
]

export default menuData;