import axios from 'axios';

let list = (data) => axios.get('/user/list', { params: data });

let info = (data) => axios.get('/user/', { params: data });

let edit = (id,data) => axios.put(`/user/${id}`,data);

let remove = (id) => axios.delete(`/user/${id}`);

export default {
	list,
	info,
	edit,
	remove
}
