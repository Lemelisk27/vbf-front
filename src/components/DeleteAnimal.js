import React from "react"
import Auth from "../utils/auth"
import API from "../utils/API"

function DeleteAnimal (props) {
    const token = Auth.getToken()

    const deleteAnimal = (e) => {
        e.preventDefault()
        API.deleteAnimal(props.id,token)
        .then(res=>{
            console.log(res)
            props.setShowModal(false)
            props.setDeleteAnimalPage(false)
            window.location.href = "/patients"
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const cancelDelete = (e) => {
        e.preventDefault()
        props.setDeleteAnimalPage(false)
        props.setShowModal(false)
    }

    return (
        <div className="d-flex flex-column col-12">
            <h2 className="text-center">Are you Sure?</h2>
            <h4 className="text-center">This Will <strong className="text-danger">Permanently</strong> Delete {props.name} {props.lastName}</h4>
            <div className="d-flex justify-content-between my-3">
                <button className="bg-danger text-light rounded mx-auto col-3" onClick={deleteAnimal}>Yes</button>
                <button className="bg-primary text-light rounded mx-auto col-3" onClick={cancelDelete}>No</button>
            </div>
        </div>
    )
}

export default DeleteAnimal