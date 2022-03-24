import Layout from '@/layout'

export const routerList = [
  {
    path: '/spareParts',
    component: Layout,
    meta: {
      title: '备件管理',
      icon: 'icon-chanpinPIguanli-01'
    },
    children: [
      {
        path: '/spareParts/stock',
        component: () => import('@/views/SpareParts/Stock/Index'),
        name: 'sparePartsStock',
        meta: { title: '备件库存', affix: false }
      },
      {
        path: '/spareParts/apply',
        component: () => import('@/views/SpareParts/Apply/Index'),
        name: 'sparePartsApply',
        meta: { title: '备件申领', affix: false }
      },
      {
        path: '/spareParts/amount',
        component: () => import('@/views/SpareParts/Amount/Index'),
        name: 'sparePartsAmount',
        meta: { title: '备件出入库', affix: false }
      },
      {
        path: '/spareParts/approve',
        component: () => import('@/views/SpareParts/Approve/Index'),
        name: 'sparePartsApprove',
        meta: { title: '备件审批', affix: false }
      },
      {
        path: '/spareParts/approve/detail',
        component: () => import('@/views/SpareParts/Approve/Detail'),
        name: 'sparePartsApproveDetail',
        hidden: true,
        meta: { title: '备件审批详情', affix: false }
      }
    ]
  }
]
