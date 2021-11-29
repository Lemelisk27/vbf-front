import axios from "axios";

// const URL_PREFIX = "http://localhost:3001"

const URL_PREFIX = "https://vetbestfriend-back.herokuapp.com"

const API = {
    login:(userData)=>{
        return axios.post(`${URL_PREFIX}/api/users/login`,userData)
    },
    getAnimals:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/animals/all`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getSpecies:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/animals/species`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getBreeds:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/animals/breeds`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getClients:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/clients/all`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    addAnimal:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/animals`,data,{
            headers:{
                "Authorization": `Bearer ${tkn}`
            }
        })
    },
    addClient:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/clients`, data,{
            headers: {
                "Authorization": `Bearer ${tkn}`
            }
        })
    },
    getAppts:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/appointments`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    }
}

export default API