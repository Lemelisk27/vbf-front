import React, {useState, useEffect}from "react"
import "./style.css"
import {useParams} from "react-router-dom"
import Auth from "../../utils/auth"
import API from "../../utils/API"

function ClientDetails (props) {
    const {id} = useParams()
    const token = Auth.getToken()
    const [client, setClient] = useState([])

    useEffect (() => {
        API.getClientDetails(id,token)
        .then(res=>{
            console.log(res.data)
            setClient(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[id])

    return (
        <div className="zs-clients d-flex flex-row pt-3">
            <div className="zs-client-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>{client.first_name} {client.last_name}</h1>
                    <button className="rounded bg-primary text-light col-2">Edit {client.first_name} {client.last_name}</button>
                </div>
                <div className="col-11 mx-auto mt-5">
                    <p className="mb-0">Email: {client.email}</p>
                    <p className="mb-0">Phone: {client.phone}</p>
                    <p className="mb-0">Address:</p>
                    <p className="mb-0">{client.street}</p>
                    <p className="mb-0">{client.city} {client.state}, {client.zip}</p>
                </div>
            </div>
        </div>
    )
}

export default ClientDetails