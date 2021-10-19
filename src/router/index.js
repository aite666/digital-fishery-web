import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {path: '/opening/promotion', 
    component: () => import('@/views/opening/promotion/index'),
    hidden: true,
  },
  {path: '/opening/giftedFish', 
    component: () => import('@/views/opening/giftedFish/index'),
    hidden: true,
  },
  {path: '/opening/bigscreenMap', 
    component: () => import('@/views/opening/map/index'),
    hidden: true,
  },
  {path: '/opening/riceTurtl', 
    component: () => import('@/views/opening/riceTurtl/index'),
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  }
]

export const asyncRouterMap = [
  {
    path:'/iot',
    component: Layout,
    redirect: '/iot/visual',
    name: 'iot',
    meta: {title: '物联环控', icon: 'product'},
    children: [
      {
        path: 'visual',
        name: 'visual',
        component: () => import('@/views/iot/visual/index'),
        meta: {title: '可视化控制', icon: 'iot-visual'}
      },
      {
        path: 'display',
        name: 'display',
        component: () => import('@/views/iot/display/index'),
        meta: {title: '数据检测', icon: 'display'}
      },
      {
        path: 'monitor',
        name: 'monitor',
        component: () => import('@/views/iot/monitor/index'),
        meta: {title: '监控预警', icon: 'product-list'}
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/iot/video/index'),
        meta: {title: '视频监控', icon: 'product-list'}
      },
    ]
  },
  {
    path:'/farm',
    component: Layout,
    redirect: '/farm/product',
    name: 'farm',
    meta: {title: '农事管理', icon: 'product'},
    children: [
      {
        path: 'product',
        name: 'product',
        component: () => import('@/views/farm/product/index'),
        meta: {title: '生产管理', icon: 'product-list'}
      },
      {
        path: 'inspection',
        name: 'inspection',
        component: () => import('@/views/farm/inspection/index'),
        meta: {title: '区试管理', icon: 'product-list'}
      },
      {
        path: 'addInspection',
        name: 'addInspection',
        component: () => import('@/views/farm/inspection/add'),
        meta: {title: '新增区试数据'},
        hidden: true
      },
      {
        path: 'updateInspection',
        name: 'updateInspection',
        component: () => import('@/views/farm/inspection/update'),
        meta: {title: '编辑区试数据'},
        hidden: true
      },
      {
        path: 'advice',
        name: 'advice',
        component: () => import('@/views/farm/advice/index'),
        meta: {title: '农事建议', icon: 'product-list'}
      },
      {
        path: 'addAdvice',
        name: 'addAdvice',
        component: () => import('@/views/farm/advice/add'),
        meta: {title: '新增农事建议数据'},
        hidden: true
      },
      {
        path: 'updateAdvice',
        name: 'updateAdvice',
        component: () => import('@/views/farm/advice/update'),
        meta: {title: '编辑农事建议数据'},
        hidden: true
      },
      {
        path: 'updateAdviceDetail',
        name: 'updateAdviceDetail',
        component: () => import('@/views/farm/advice/updateAdviceDetail'),
        meta: {title: '编辑农事建议详情'},
        hidden: true
      },
      {
        path: 'storage',
        name: 'storage',
        component: () => import('@/views/farm/storage/index'),
        meta: {title: '仓储管理', icon: 'product-list'}
      },
      {
        path: 'addStorage',
        name: 'addStorage',
        component: () => import('@/views/farm/storage/add'),
        meta: {title: '新增农资库存'},
        hidden: true
      },
      {
        path: 'updateStorage',
        name: 'updateStorage',
        component: () => import('@/views/farm/storage/update'),
        meta: {title: '编辑农资库存'},
        hidden: true
      },
      {
        path: 'viewStorage',
        name: 'viewStorage',
        component: () => import('@/views/farm/storage/view'),
        meta: {title: '农资库存详情'},
        hidden: true
      },
      {
        path: 'storageRecord',
        name: 'storageRecord',
        component: () => import('@/views/farm/storageRecord/index'),
        meta: {title: '仓储记录', icon: 'product-list'}
      },
      {
        path: 'addStorageRecord',
        name: 'addStorageRecord',
        component: () => import('@/views/farm/storageRecord/add'),
        meta: {title: '新增仓储记录'},
        hidden: true
      },
      {
        path: 'updateStorageRecord',
        name: 'updateStorageRecord',
        component: () => import('@/views/farm/storageRecord/update'),
        meta: {title: '编辑仓储记录'},
        hidden: true
      },
      {
        path: 'addStorageUse',
        name: 'addStorageUse',
        component: () => import('@/views/farm/storageRecord/addStorageUse'),
        meta: {title: '新增农资使用记录'},
        hidden: true
      },
      {
        path: 'sale',
        name: 'sale',
        component: () => import('@/views/farm/sale/index'),
        meta: {title: '销售管理', icon: 'product-list'}
      },
      {
        path: 'addSale',
        name: 'addSale',
        component: () => import('@/views/farm/sale/add'),
        meta: {title: '新增销售数据'},
        hidden: true
      },
      {
        path: 'updateSale',
        name: 'updateSale',
        component: () => import('@/views/farm/sale/update'),
        meta: {title: '编辑销售数据'},
        hidden: true
      },
    ]
  },
  {
    path:'/info',
    component: Layout,
    redirect: '/info/enterprise',
    name: 'info',
    meta: {title: '基础信息', icon: 'order'},
    children: [
      {
        path: 'block',
        name: 'block',
        component: () => import('@/views/info/block/index'),
        meta: {title: '区块管理', icon: 'product-list'}
      },
      {
        path: 'addBlock',
        name: 'addBlock',
        component: () => import('@/views/info/block/add'),
        meta: {title: '新增区块信息'},
        hidden: true
      },
      {
        path: 'updateBlock',
        name: 'updateBlock',
        component: () => import('@/views/info/block/update'),
        meta: {title: '编辑区块信息'},
        hidden: true
      },
      {
        path: 'viewBlock',
        name: 'viewBlock',
        component: () => import('@/views/info/block/view'),
        meta: {title: '区块详情'},
        hidden: true
      },
      {
        path: 'enterprise',
        name: 'enterprise',
        component: () => import('@/views/info/enterprise/index'),
        meta: {title: '企业信息管理', icon: 'product-list'}
      },
      {
        path: 'addEnterprise',
        name: 'addEnterprise',
        component: () => import('@/views/info/enterprise/add'),
        meta: {title: '新增企业信息'},
        hidden: true
      },
      {
        path: 'updateEnterprise',
        name: 'updateEnterprise',
        component: () => import('@/views/info/enterprise/update'),
        meta: {title: '编辑企业信息'},
        hidden: true
      },
      {
        path: 'qrCode',
        name: 'qrCode',
        component: () => import('@/views/info/qrCode/index'),
        meta: {title: '推广追溯管理', icon: 'product-list'}
      },
      {
        path: 'addQrCode',
        name: 'addQrCode',
        component: () => import('@/views/info/qrCode/add'),
        meta: {title: '新增推广追溯'},
        hidden: true
      },
      {
        path: 'updateQrCode',
        name: 'updateQrCode',
        component: () => import('@/views/info/qrCode/update'),
        meta: {title: '编辑推广追溯'},
        hidden: true
      },
      {
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/info/productCate/index'),
        meta: {title: '农资种类管理', icon: 'product-list'}
      },
      {
        path: 'addProductCate',
        name: 'addProductCate',
        component: () => import('@/views/info/productCate/add'),
        meta: {title: '添加农资种类'},
        hidden: true
      },
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        component: () => import('@/views/info/productCate/update'),
        meta: {title: '修改农资种类'},
        hidden: true
      },
      {
        path: 'equipmentCate',
        name: 'equipmentCate',
        component: () => import('@/views/info/equipmentCate/index'),
        meta: {title: '设备种类管理', icon: 'product-list'}
      },
      {
        path: 'addEquipmentCate',
        name: 'addEquipmentCate',
        component: () => import('@/views/info/equipmentCate/add'),
        meta: {title: '添加设备种类'},
        hidden: true
      },
      {
        path: 'updateEquipmentCate',
        name: 'updateEquipmentCate',
        component: () => import('@/views/info/equipmentCate/update'),
        meta: {title: '修改设备种类'},
        hidden: true
      },
    ]
  },
  {
    path:'/bigscreen',
    component: Layout,
    redirect: '/bigscreen/map',
    name: 'bigscreen',
    meta: {title: '大屏管理', icon: 'product'},
    children: [
      {
        path: 'map',
        name: 'map',
        component: () => import('@/views/bigscreen/map/index'),
        meta: {title: '基地一张图', icon: 'product-list'}
      },
      {
        path: 'riceTurtl',
        name: 'riceTurtl',
        component: () => import('@/views/bigscreen/riceTurtl/index'),
        meta: {title: '稻鳖共生模式', icon: 'product-attr'}
      },
      {
        path: 'giftedFish',
        name: 'giftedFish',
        component: () => import('@/views/bigscreen/giftedFish/index'),
        meta: {title: '天赋渔鲜品牌', icon: 'product-attr'}
      },
    ]
  },
  {
    path:'/knowledge',
    component: Layout,
    redirect: '/knowledge/fish',
    name: 'knowledge',
    meta: {title: '渔业知识库', icon: 'product'},
    children: [
      {
        path: 'fish',
        name: 'fish',
        component: () => import('@/views/knowledge/fish/index'),
        meta: {title: '渔业知识库', icon: 'product-list'}
      },
      {
        path: 'viewFish',
        name: 'fiviewFishsh',
        component: () => import('@/views/knowledge/fish/view'),
        meta: {title: '查看渔业知识'},
        hidden: true
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('@/views/knowledge/news/index'),
        meta: {title: '知识库管理', icon: 'product-list'}
      },
      {
        path: 'addNews',
        name: 'addNews',
        component: () => import('@/views/knowledge/news/add'),
        meta: {title: '添加知识库'},
        hidden: true
      },
      {
        path: 'updateNews',
        name: 'updateNews',
        component: () => import('@/views/knowledge/news/update'),
        meta: {title: '修改知识库'},
        hidden: true
      },
    ]
  },
  {
    path:'/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: {title: '权限', icon: 'ums'},
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {title: '用户列表', icon: 'ums-admin'}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: {title: '角色列表', icon: 'ums-role'}
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/ums/role/allocMenu'),
        meta: {title: '分配菜单'},
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/ums/role/allocResource'),
        meta: {title: '分配资源'},
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: {title: '菜单列表', icon: 'ums-menu'}
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('@/views/ums/menu/add'),
        meta: {title: '添加菜单'},
        hidden: true
      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('@/views/ums/menu/update'),
        meta: {title: '修改菜单'},
        hidden: true
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/ums/resource/index'),
        meta: {title: '资源列表', icon: 'ums-resource'}
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/ums/resource/categoryList'),
        meta: {title: '资源分类'},
        hidden: true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

