let Mock = require('mockjs');

var Random = Mock.Random;


Mock.mock('/api/userlist', {
    data: {
        'userList|1-10': [
            {
                'name': () => Random.cname(),
                'intro': () => Random.cparagraph(10,20)
            }
        ]
    },
    ret: 0,
    msg: '查询成功！'
});