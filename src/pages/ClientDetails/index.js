import React, {useState, useEffect}from "react"
import {Modal} from "react-bootstrap"
import "./style.css"
import {useParams} from "react-router-dom"
import Auth from "../../utils/auth"
import API from "../../utils/API"
import EditClient from "../../components/EditClient"
import DeleteClient from "../../components/DeleteClient"

function ClientDetails (props) {
    const {id} = useParams()
    const token = Auth.getToken()
    const [showModal, setShowModal] = useState(false)
    const [client, setClient] = useState([])
    const [deleteClientPage, setDeleteClientPage] = useState(false)

    useEffect (() => {
        API.getClientDetails(id,token)
        .then(res=>{
            setClient(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    // eslint-disable-next-line
    },[id, showModal])

    return (
        <div className="zs-clients d-flex flex-row pt-3">
            <div className="zs-client-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>{client.first_name} {client.last_name}</h1>
                    <button className="rounded bg-primary text-light col-2" onClick={() => setShowModal(true)}>Edit {client.first_name} {client.last_name}</button>
                </div>
                <div className="col-11 mx-auto mt-5">
                    <p className="mb-0">Email: {client.email}</p>
                    <p className="mb-0">Phone: {client.phone}</p>
                    <p className="mb-0">Address:</p>
                    <p className="mb-0">{client.street}</p>
                    <p className="mb-0">{client.city} {client.state}, {client.zip}</p>
                </div>
            </div>
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="add-modal"
                centered>
                <Modal.Header closeButton className="zs-modal-head">
                    <h3>Edit {client.first_name} {client.last_name}</h3>
                </Modal.Header>
                <Modal.Body>
                    {!deleteClientPage ? <EditClient client={client} setShowModal={setShowModal} setDeleteClientPage={setDeleteClientPage}/> : <DeleteClient setDeleteClientPage={setDeleteClientPage} firstName={client.first_name} lastName={client.last_name} id={client.id} setShowModal={setShowModal}/>}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ClientDetails