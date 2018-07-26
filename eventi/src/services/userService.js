import axios from 'axios'
const URL = (process.env.NODE_ENV !== 'development')
    ? '/'
    : '//localhost:3000/';


function userSignup(user) {
    console.log('user service got user:', user);
    axios.post(`${URL}signup`, user)
        .then(res => res.data)
}


export default {
    userSignup
}