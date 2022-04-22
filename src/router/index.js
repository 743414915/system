import {createRouter, createWebHistory} from "vue-router"

const Login = () => import('components/common/login/login')
const Main = () => import('components/content/mainTableBar/mainTabBar')

const Index = () => import('views/date/date')

const SelectRepair = () => import('views/repair/repairChild/selectRepair')
const AddRepair = () => import('views/repair/repairChild/addRepair')

const ModifyPassword = () => import('views/user/modifyPassword/modifyPassword')
const PerfectInfo = () => import('views/user/perfectInfo/perfectInfo')
const UploadAvatar = () => import('views/user/uploadAvatar/uploadAvatar')

const SelectInfo = () => import('views/lostandfound/selectInfo/selectInfo')
const AddInfo = () => import('views/lostandfound/addInfo/addInfo')

const SelectRecode = () => import('views/accountManagement/selectRecode/selectRecode')
const Lock = () => import('views/accountManagement/lock/lock')
// 1.安装router
const routes = [
  {
    path: '/',
    redirect: '/main/index'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/main',
    component: Main,
    children: [
      {
        path: '/main/index',
        component: Index
      },
      {
        path: '/repair/selectRepair',
        component: SelectRepair,
      },
      {
        path: '/repair/addRepair',
        component: AddRepair,
      },
      {
        path: '/user/modifyPassword',
        component: ModifyPassword
      },
      {
        path: '/user/perfectInfo',
        component: PerfectInfo
      },
      {
        path: '/user/uploadAvatar',
        component: UploadAvatar
      },
      {
        path: '/lostandfound/selectInfo',
        component: SelectInfo
      },
      {
        path: '/lostandfound/addInfo',
        component: AddInfo
      },
      {
        path: '/accountManagement/selectRecode',
        component: SelectRecode
      },
      {
        path: '/lock/lock',
        component: Lock
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router