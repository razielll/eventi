import axios from 'axios'
const URL = (process.env.NODE_ENV !== 'development')
    ? '/'
    : '//localhost:3000/';


function userSignup(user) {
    return axios.post(`${URL}signup`, user)
        .then(res => res.data)
}

function userLogin(user) {
    return axios.put(`${URL}login`, user)
        .then(res => {
            return res.data
        })
}


export default {
    userSignup,
    userLogin
}