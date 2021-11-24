import axios from "axios";

// const URL_PREFIX = "http://localhost:3001"

const URL_PREFIX = "https://vetbestfriend-back.herokuapp.com"

const API = {
    login:(userData)=>{
        return axios.post(`${URL_PREFIX}/api/users/login`,userData)
    }
}

export default API