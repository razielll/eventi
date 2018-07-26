
import axios from 'axios'
const URL = (process.env.NODE_ENV !== 'development')
    ? '/'
    : '//localhost:3000/';


function addEventi({ eventi }) {
  return axios.post(`${URL}/eventi`, eventi).then(res => res.data)  
  
}

function loadEventi() {
    return axios.get(URL)
        .then(res => {
            return res.data
        })
}

function getEventiById({ eventiId }) {
    console.log('front service got id', eventiId);
    return axios.get(`${URL}${eventiId}`)
        .then(res => {
            return res.data
        })
}

function removeEventi(eventiId) {
    return axios.delete(`${URL}${eventiId}`)
        .catch(err => console.log('You are not an admin!', err))
}

function updateEventi(eventi) {
    return axios.put(`${URL}${eventi.id}`, eventi)
        .then(res => res.data)
}

export default {
    addEventi,
    loadEventi,
    removeEventi,
    updateEventi,
    getEventiById
}