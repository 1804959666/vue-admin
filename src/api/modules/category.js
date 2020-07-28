import axios from 'axios';
let subcate = (data) => axios.get('/category/sub',{params:data});

let insert = (data) => axios.post('/category/add',data);

let edit = (data) => axios.post('/category/edit',data);

let remove = (data) => axios.post('/category/delete',data);

export default{
	subcate,
	insert,
	edit,
	remove
}