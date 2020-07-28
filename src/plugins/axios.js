import { Message } from 'element-ui';
import router from '@/router/index'
//路由实例
import axios from 'axios';
//Loading 服务方式
import { Loading } from 'element-ui';
//Loading实例
let loading;
//设置默认baseURL
axios.defaults.baseURL = 'http://localhost:3001'

//添加请求拦截器
axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	// console.log(config)
	//开启Loadingf
	loading = Loading.service({ background: "rgba(0,0,0,0.3)" });
	//判断是否携带token
	if (config.url == '/admin/login' || config.url == '/admin/register') {
		return config;
	}
	//获取token
	let token = sessionStorage.token;
	//无token
	if(!token){
		Message.error("无效的token,请重新登陆")
		setTimeout(()=>{
			// console.log(router)
			router.replace('/login')
			loading.close()
		},2000)
	}
	//有token
	config.headers.Authorization = `Bearer ${token}`;
	return config;

}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});



//添加响应拦截器
axios.interceptors.response.use(function(response) {
	let { status, data } = response;
	//关闭Loading
	loading.close()
	//判断后台返回数据携带的状态码
	// console.log(response)
	// switch (status) {
	// 	case 401:

	// 		break;
	// 	case 404:
	// 		break;
	// 	case 500:
	// 		break;
	// 	default:
	// 		break;
	// }
	return data;
}, function(error) {
	console.log(error)
	return Promise.reject(error)
})
