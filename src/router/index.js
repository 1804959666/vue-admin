import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui';

Vue.use(VueRouter)

import Layout from '@/components/Layout.vue';
// import Upload from '@/components/Upload.vue'

const routes = [{
		path: '/login',
		alias: '/',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
		meta: { requiresAuth: false }
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue'),
		meta: { requiresAuth: false }
	},
	{
		path: '/transfer',
		alias: '/',
		name: 'Transfer',
		component: () => import('@/views/Transfer.vue'),
		meta: { requiresAuth: false }
	},
	{
		path: '/article/',
		name: 'Article',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'ArticleList',
				component: () => import('@/views/Article/List.vue')
			},
			{
				path: 'edit:id',
				name: 'ArticleEdit',
				props:true,
				component: () => import('@/views/Article/Edit.vue')
			},
			{
				path: 'release',
				name: 'ArticleRelease',
				// props:true,
				component: () => import('@/views/Article/Release.vue')
			},
		]
	},
	{
		path: '/admin/',
		name: 'Admin',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'AdminList',
				component: () => import('@/views/Admin/List.vue')
			},
			{
				path: 'edit/:id',
				name: 'AdminEdit',

				component: () => import('@/views/Admin/Edit.vue')
			},

		]
	},
	{
		path: '/user/',
		name: 'User',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'UserList',
				component: () => import('@/views/User/List.vue')
			},
			{
				path: 'edit/:id',
				name: 'UserEdit',
				component: () => import('@/views/User/Edit.vue')
			},

		]
	},
	{
		path: '/power/',
		name: 'Power',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'PowerList',
				component: () => import('@/views/Power/List.vue')
			},
			{
				path: 'edit',
				name: 'PowerEdit',
				component: () => import('@/views/Power/Edit.vue')
			},

		]
	},
	{
		path: '/setting/',
		name: 'Setting',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'SettingList',
				component: () => import('@/views/Setting/List.vue')
			},
			{
				path: 'edit',
				name: 'SettingEdit',
				component: () => import('@/views/Setting/Edit.vue')
			},

		]
	},
	{
		path: '/category/',
		name: 'Category',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'CategoryList',
				component: () => import('@/views/Category/List.vue')
			},
			{
				path: 'edit',
				name: 'CategoryEdit',
				component: () => import('@/views/Category/Edit.vue')
			},
		]
	},
]

const router = new VueRouter({
	routes
})

//全局守卫
router.beforeEach((to, from, next) => {
	console.log(to);
	console.log(from);
	//根据meta元信息，校验路由是否需要授权
	// console.log(to.matched)
	let isRequireAuth = to.matched.some((path) => path.meta.requiresAuth)
	//不需要登录授权，直接放行
	if(!isRequireAuth){
		next();
		return
	}
	//校验token
	let token = sessionStorage.token;
	//有token，立即放行
	if (token) {
		next();
		return
	}
	//无token，强制跳转登录
	Message.error("无效的token,请重新登陆")
	setTimeout(() => {
		next(`/login?redirect=${to.path}`);
	}, 2000);
})

export default router
