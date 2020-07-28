import axios from 'axios';

//获取角色列表
let list = (data) => axios.get('/role/list', { params: data });

let insert = (data) => axios.post('/role', data);
//删除
let remove = (id) => axios.delete(`/role/${id}`);

let edit = (id,data) => axios.put(`/role/${id}`,data);

export default {
	list,
	insert,
	remove,
	edit
}
