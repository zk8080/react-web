const Mock = require('mockjs');

var Random = Mock.Random;


Mock.mock('/api/product/list', {
    data: {
        'productList|10-50': [
            {
                'id|+1': 1, 
                'merchant': () => Random.ctitle(6, 10),
                'brand': () => Random.ctitle(3, 5),
                'productName': () => Random.ctitle(5, 9),
                'size': () => Random.csentence(2),
                'remark': () => Random.cparagraph(2)
            }
        ]
    },
    ret: 0,
    msg: '查询成功！'
});

Mock.mock('/api/customer/list', {
    data: {
        'customerList|10-50': [
            {
                'id|+1': 1, 
                'merchant': () => Random.ctitle(6, 10),
                'brand': () => Random.ctitle(3, 5),
                'address': () => Random.county(true),
                'contact': () => Random.cname(),
                'contactPhone': () => Random.natural(11)
            }
        ]
    },
    ret: 0,
    msg: '查询成功！'
});