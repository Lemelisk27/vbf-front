import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import "./style.css"
import API from "../utils/API";
import Auth from "../utils/auth"
import ClientList from "../components/ClientList"
import AddClient from "../components/AddClient"

function Client (props) {
    const [rawClients, setRawClients] = useState([])
    const [clients, setClients] = useState([])
    const [clientSearch, setClientSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const token = Auth.getToken()

    useEffect (() => {
        API.getClients(token)
        .then(res=>{
            console.log(res.data)
            setRawClients(res.data)
            setClients(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    useEffect (() => {
        API.getClients(token)
        .then(res=>{
            console.log(res.data)
            setRawClients(res.data)
            setClients(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[showModal])

    const handleInputChange = (e) => {
        if (e.target.name === "client") {
            setClientSearch(e.target.value)
        }
    }

    useEffect(() => {
        const regex = new RegExp(`${clientSearch}.*`, "i")
        if (clientSearch === "" || clientSearch === null) {
            setClients(rawClients)
        }
        else {
            setClients(rawClients.filter(name => regex.exec(name.full_name)))
        }
    },[clientSearch])

    return (
        <div className="zs-clients d-flex flex-row pt-3">
            <div className="zs-client-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>Clients</h1>
                    <button className="rounded bg-primary text-light col-2" onClick={() => setShowModal(true)}>Add Client</button>
                </div>
                <form className="d-flex justify-content-start mt-5 col-11 mx-auto">
                    <div className="d-flex flex-column col-3">
                        <label>Name</label>
                        <input type="text" name="client" placeholder="Type here to search..." value={clientSearch} onChange={handleInputChange}></input>
                    </div>
                </form>
                <div className="zs-ctable col-11 mx-auto mt-5 overflow-auto">
                    <table className="table table-bordered">
                        <thead className="bg-secondary">
                            <tr className="text-center text-light">
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Pets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(item=><ClientList key={item.id} client={item}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='add-modal'>
                <Modal.Header closeButton className="zs-modal-client">
                    <Modal.Title id="add-modal">
                        <h3>Add Client</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddClient setShowModal={setShowModal}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Client