//路由按需加载
import loadComponent from './loadable';
/**
 * webpackChunkName: webpack按需加在打包时的chunk名字
 */


//基础设置
const ProductList = loadComponent(() => import(/* webpackChunkName: "productList" */ '@container/baseSetting/productInfo/index.component'));
const CustomerList = loadComponent(() => import(/* webpackChunkName: "customerList" */ '@container/baseSetting/customerInfo/index.component'));

// 入库管理
const PurchaseNotice = loadComponent(() => import(/* webpackChunkName: "PurchaseNotice" */ '@container/inboundManagement/purchaseNotice/index.component'));

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
        path: '/inboundManagement/purchaseNotice',
        exact: true,
        component: PurchaseNotice,
        breadcrumbName: '采购通知'
    }
];

export default routers;