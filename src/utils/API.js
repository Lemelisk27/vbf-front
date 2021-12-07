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
        return axios.get(`${URL_PREFIX}/api/appointments/all`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteAppt:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/appointments/${id}`,{headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    editAppt:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/appointments`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    addAppt:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/appointments`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getAnimalDetails:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/animals/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getClientDetails:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/clients/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    editAnimal:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/animals`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    editClient:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/clients`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getAllergies:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/allergies/all`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteAllergyJoin:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/allergies/joins/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getJoins:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/allergies/joins/all`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    createJoins:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/allergies/joins`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteClient:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/clients/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteAnimal:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/animals/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getInventoryItems:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/inventory/items`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getClinic:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/clinics/all`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getInventoryCategories:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/inventory/categories`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateInventoryItems:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/inventory/items/qty`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    createInvoice:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/invoice`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    createInvoiceItems:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/invoice/items`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getUser:(id,tkn)=>{
        return axios.get(`${URL_PREFIX}/api/users/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateUser:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/users`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    changePassword:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/users/change`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateClinic:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/clinics`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getAllUsers:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/users/all`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getRoles:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/roles/all`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    createUser:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/users`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteUser:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/users/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    addRole:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/roles`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateRole:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/roles`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteRole:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/roles/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateUserRoles:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/users/roles`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    createInventoryCategory:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/inventory/categories`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateInventoryCategory:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/inventory/categories`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateItemCategory:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/inventory/items/category`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteCategory:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/inventory/categories/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getUnits:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/inventory/units`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    createInventoryItem:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/inventory/items`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    createInventoryJoin:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/inventory/joins`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    getInventoryJoins:(tkn)=>{
        return axios.get(`${URL_PREFIX}/api/inventory/joins`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateJoins:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/inventory/joins`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateOldInventoryItems:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/inventory/items`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteInventoryItem:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/inventory/items/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    createUnit:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/inventory/units`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    editUnit:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/inventory/units`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateItemUnits:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/inventory/units/items`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteUnit:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/inventory/units/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    createSpecies:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/animals/species`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    editSpecies:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/animals/species`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateAnimalSpecies:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/animals/species/animals`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateBreedSpecies:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/animals/species/breeds`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteSpecies:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/animals/species/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    createBreed:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/animals/breeds`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    editBreed:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/animals/breeds`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    updateAnimalBreed:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/animals/breeds/animals`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteBreed:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/animals/breeds/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    createAllergy:(data,tkn)=>{
        return axios.post(`${URL_PREFIX}/api/allergies`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    editAllergy:(data,tkn)=>{
        return axios.put(`${URL_PREFIX}/api/allergies`, data, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    },
    deleteAllergy:(id,tkn)=>{
        return axios.delete(`${URL_PREFIX}/api/allergies/${id}`, {headers:{
            "Authorization": `Bearer ${tkn}`
        }})
    }
}

export default API