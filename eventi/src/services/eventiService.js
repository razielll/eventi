import axios from 'axios';

const EVENTI_URL = 'http://localhost:3000';

function add (eventi){
    return axios.post(`${EVENTI_URL}/eventi`, eventi).then(res => res.data)
}

export default {
    add
}