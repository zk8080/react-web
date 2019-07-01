//路由按需加载
import loadComponent from './loadable';
/**
 * webpackChunkName: webpack按需加在打包时的chunk名字
 */


//基础设置
const ProductList = loadComponent(() => import(/* webpackChunkName: "productList" */ '@container/baseSetting/productInfo/index.component'));
const CustomerList = loadComponent(() => import(/* webpackChunkName: "customerList" */ '@container/baseSetting/customerInfo/index.component'));
const WarehouseInfo = loadComponent(() => import(/* webpackChunkName: "WarehouseInfo" */ '@container/baseSetting/warehouseInfo/index.component'));
const ConsumableRelation = loadComponent(() => import(/* webpackChunkName: "ConsumableRelation" */ '@container/baseSetting/consumableRelation/index.component'));


// 入库管理
const PurchaseNotice = loadComponent(() => import(/* webpackChunkName: "PurchaseNotice" */ '@container/inboundManagement/purchaseNotice/index.component'));
const Receipt = loadComponent(() => import(/* webpackChunkName: "Receipt" */ '@container/inboundManagement/receipt/index.component'));
const Shelf = loadComponent(() => import(/* webpackChunkName: "Shelf" */ '@container/inboundManagement/shelf/index.component'));

// 出库管理
const DeliveryOrder = loadComponent(() => import(/* webpackChunkName: "DeliveryOrder" */ '@container/outboundManagement/deliveryOrder/index.component'));


// 权限管理
const UserList = loadComponent(() => import(/* webpackChunkName: "UserList" */ '@container/permissionManager/userList/index.component'));
const RoleList = loadComponent(() => import(/* webpackChunkName: "RoleList" */ '@container/permissionManager/roleList/index.component'));

const routers = [
    {
        path: '/product/list',
        exact: true,
        component: ProductList,
        breadcrumbName: '商品档案'
    },
    {
        path: '/customer/list',
        exact: true,
        component: CustomerList,
        breadcrumbName: '客户档案'
    },
    {
        path: '/consumableRelation/list',
        exact: true,
        component: ConsumableRelation,
        breadcrumbName: '耗材关系设置'
    },
    {
        path: '/warehouse/list',
        exact: true,
        component: WarehouseInfo,
        breadcrumbName: '仓库档案'
    },
    {
        path: '/inboundManagement/purchaseNotice',
        exact: true,
        component: PurchaseNotice,
        breadcrumbName: '采购通知'
    },
    {
        path: '/inboundManagement/receipt',
        exact: true,
        component: Receipt,
        breadcrumbName: '收货'
    },
    {
        path: '/inboundManagement/shelf',
        exact: true,
        component: Shelf,
        breadcrumbName: '上架'
    },
    {
        path: '/outboundManagement/deliveryOrder',
        exact: true,
        component: DeliveryOrder,
        breadcrumbName: '发货订单'
    },
    {
        path: '/userManager/index',
        exact: true,
        component: UserList,
        breadcrumbName: '用户管理'
    },
    {
        path: '/roleManager/index',
        exact: true,
        component: RoleList,
        breadcrumbName: '角色管理'
    }
];

export default routers;