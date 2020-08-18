import Loadable from 'react-loadable';
import Layout from '../components/layout/Layout';
import Loading from '../components/loading/Loading';
import NotFound from '../components/not-found/NotFound';
import Auth from './Auth';
export default [
  {
    // 顶级路由 是一个单纯的路基组件，没有任何icon name这些和路由导航相关的东西
    // 路由鉴权 不管什么情况，都是需要走这个组件的 都是必须先过这个组件的关卡
    component: Auth,
    routes:[
      {
        // 1级级路由
        component: NotFound,
        path: '/404',
      },
      {
        path: '/',
        component: Layout,
        routes: [
          {
            // 路由
            component: Loadable({
              loader:()=>import('./../pages/RouteOneClass'),
              loading:Loading
            }),
            icon: '',
            name: '工作台',
            path: '/dashboard',
          },
        ],
      },
    ]
  }

]