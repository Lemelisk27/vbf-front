import React from "react";
import Auth from "../utils/auth"
import API from "../utils/API";

function DeleteClient (props) {
    const token = Auth.getToken()

    const deleteClient = (e) => {
        e.preventDefault()
        API.deleteClient(props.id,token)
        .then(res=>{
            console.log(res)
            props.setDeleteClientPage(false)
            props.setShowModal(false)
            window.location.href = "/clients"
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const cancelDelete = (e) => {
        e.preventDefault()
        props.setShowModal(false)
        props.setDeleteClientPage(false)
    }

    return (
        <div className="d-flex flex-column col-12">
            <h2 className="text-center">Are you Sure?</h2>
            <h4 className="text-center">This Will <strong className="text-danger">Permanently</strong> Delete {props.firstName} {props.lastName}</h4>
            <div className="d-flex justify-content-between my-3">
                <button className="bg-danger text-light rounded mx-auto col-3" onClick={deleteClient}>Yes</button>
                <button className="bg-primary text-light rounded mx-auto col-3" onClick={cancelDelete}>No</button>
            </div>
        </div>
    )
}

export default DeleteClient