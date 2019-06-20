const Mock = require('mockjs');

var Random = Mock.Random;

// 用户列表
Mock.mock('/api/userlist', {
    data: {
        'data|10-50': [
            {
                'id|+1': 1, 
                'userName': () => Random.cname(),
                'userNo': () => Random.name(),
                'role': () => Random.ctitle(5, 9)
            }
        ]
    },
    ret: 0,
    msg: '查询成功！'
});

// 角色列表
Mock.mock('/api/roleList', {
    data: {
        'data|10-50': [
            {
                'id|+1': 1, 
                'roleName': () => Random.cname(),
                'remark': () => Random.ctitle(5, 9)
            }
        ]
    },
    ret: 0,
    msg: '查询成功！'
});

// 商品档案
Mock.mock('/api/product/list', {
    data: {
        'data|10-50': [
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

// 客户档案
Mock.mock('/api/customer/list', {
    data: {
        'data|10-50': [
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

// 采购通知
Mock.mock('/api/purchaseNotice/list', {
    data: {
        'data|10-50': [
            {
                'id|+1': 1, 
                'num': () => Random.natural(8),
                'merchant': () => Random.ctitle(6, 10),
                'productName': () => Random.ctitle(5, 9),
                'model': () => Random.csentence(3),
                'size': () => Random.csentence(2),
                'barCode': () => Random.natural(14),
                'volume': () => Random.natural(2, 3),
                'weight': () => Random.natural(2, 3),
                'purchaseNum': () => Random.natural(2, 3),
                'purchaseDate': () => Random.date('yyyy-MM-dd'),
                'arrivalDate': () => Random.date('yyyy-MM-dd'),
                'remark': () => Random.cparagraph(0, 2)
            }
        ]
    },
    ret: 0,
    msg: '查询成功！'
});
