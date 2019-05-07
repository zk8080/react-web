let Mock = require('mockjs');

var Random = Mock.Random;


Mock.mock('/api/userlist', {
    data: {
        'userList|10-50': [
            {
                'id|+1': 1, 
                'name': () => Random.cname(),
                'remark': () => Random.cparagraph(1,3)
            }
        ]
    },
    ret: 0,
    msg: '查询成功！'
});