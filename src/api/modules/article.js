import axios from 'axios';

//获取文章列表
let list = (data) => axios.get('/article/list', { params: data });

let edit = (data) => axios.get('/article/detail', { params: data });

let add = (data) => axios.post('/article/add', data);

let modify = (data) => axios.post('/article/edit', data);

let remove = (data) => axios.post('/article/delete', data);

export default {
	list,
	edit,
	add,
	modify,
	remove
}
