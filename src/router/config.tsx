import React from 'react'
import Loadable from 'react-loadable'
import Auth from './Auth'
export default [
	{
		// 顶级路由 是一个单纯的路基组件
		// 路由鉴权 不管什么情况，都是需要走这个组件的 都是必须先过这个组件的关卡
		component: Auth,
		routes: [
			{
				path: '/',
				component: Loadable({
					loader: () => import('../pages/Home'),
					loading: () => <div>loading...</div>,
				}),
			},
			{
				path: '/a',
				component: Loadable({
					loader: () => import('../pages/A'),
					loading: () => <div>loading...</div>,
				}),
			},
			{
				path: '/b',
				component: Loadable({
					loader: () => import('../pages/B'),
					loading: () => <div>loading...</div>,
				}),
			},
		],
	},
]
