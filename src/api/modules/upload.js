import axios from 'axios';

let remove = (data) => axios.post('/upload/delete', data);

export default {
	remove
}
