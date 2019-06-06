const menuData = [
    {
        title: '基础设置',
        key: '01',
        icon: 'setting',
        children: [
            {
                title: '商品档案',
                key: '01-01',
                url: '/product/list'
            },
            {
                title: '客户档案',
                key: '01-02',
                url: '/customer/list'
            },
            {
                title: '耗材关系设置',
                key: '01-03',
                url: '/user/1'
            },
            {
                title: '仓库档案',
                key: '01-04',
                url: '/user/2'
            },
            {
                title: '库位关系设置',
                key: '01-05',
                url: '/user/3'
            },
            {
                title: '上架策略',
                key: '01-06',
                url: '/user/4'
            },
            {
                title: '补货策略',
                key: '01-07',
                url: '/user/5'
            },
            {
                title: '拣货策略',
                key: '01-08',
                url: '/user/6'
            },
        ]
    },
    {
        title: '入库管理',
        key: '02',
        icon: 'fullscreen-exit',
        children: [
            {
                title: '采购通知',
                key: '02-01',
                url: '/inboundManagement/purchaseNotice'
            },
            {
                title: '收货',
                key: '02-02',
                url: '/inboundManagement/receipt'
            },
            {
                title: '上架',
                key: '02-03',
                url: '/inboundManagement/shelf'
            }
        ]
    },
    {
        title: '出库管理',
        key: '03',
        icon: 'fullscreen',
        children: [
            {
                title: '发货订单',
                key: '03-01',
                url: '/outboundManagement/deliveryOrder'
            },
            {
                title: '拣货单生成',
                key: '03-02',
                url: '/article/5'
            },
            {
                title: 'B2B',
                key: '03-03',
                url: '/article/6'
            },
            {
                title: '拣货',
                key: '03-04',
                url: '/article/7'
            },
            {
                title: '打包',
                key: '03-05',
                url: '/article/8'
            },
            {
                title: '称重',
                key: '03-06',
                url: '/article/9'
            },
            {
                title: '信息跟踪',
                key: '03-07',
                url: '/article/10'
            }
        ]
    },
    {
        title: '盘点管理',
        key: '04',
        icon: 'diff',
        children: [
            {
                title: '盘点',
                key: '04-01',
                url: '/article/11'
            },
            {
                title: '冻结/解冻',
                key: '04-02',
                url: '/article/12'
            },
            {
                title: '补货',
                key: '04-03',
                url: '/article/13'
            },
            {
                title: '退货',
                key: '04-04',
                url: '/article/14'
            }
        ]
    },
    {
        title: '统计分析',
        key: '05',
        icon: 'file-excel',
        children: [
            {
                title: '入库报表',
                key: '05-01',
                url: '/article/15'
            },
            {
                title: '出库报表',
                key: '05-02',
                url: '/article/16'
            },
            {
                title: '库存报表',
                key: '05-03',
                url: '/article/17'
            },
            {
                title: '库位使用报表',
                key: '05-04',
                url: '/article/18'
            }
        ]
    },
    {
        title: '结算管理',
        key: '06',
        icon: 'transaction',
        children: [
            {
                title: '费率设置',
                key: '06-01',
                url: '/article/19'
            },
            {
                title: '费率结算',
                key: '06-02',
                url: '/article/20'
            }
        ]
    }
];

export default menuData;