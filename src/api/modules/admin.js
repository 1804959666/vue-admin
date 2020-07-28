import axios from 'axios';

//登录
let login = (data) => axios.post('/admin/login', data);
//注册
let register = (data) => axios.post('/admin/register', data);
//个人资料
let info = (data) => axios.get('admin/info', { params: data });
//用户列表
let list = (data) => axios.get('admin/list', { params: data });

let edit = (data) => axios.post('admin/info', data);

let remove = (data) => axios.post('/admin/delete', data);
export default {
	login,
	register,
	info,
	list,
	edit,
	remove
}
