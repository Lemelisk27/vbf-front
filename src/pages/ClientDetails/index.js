import React, {useState, useEffect}from "react"
import {Modal} from "react-bootstrap"
import "./style.css"
import {useParams} from "react-router-dom"
import Auth from "../../utils/auth"
import API from "../../utils/API"
import EditClient from "../../components/EditClient"
import DeleteClient from "../../components/DeleteClient"
import { PDFViewer } from '@react-pdf/renderer'
import MyDocument from "../../components/Invoices"
import ListItems from "../../components/ListItems"

function ClientDetails (props) {
    const {id} = useParams()
    const token = Auth.getToken()
    const [showModal, setShowModal] = useState(false)
    const [showInvoiceModal, setShowInvoiceModal] = useState(false)
    const [client, setClient] = useState([])
    const [deleteClientPage, setDeleteClientPage] = useState(false)
    const [invoices, setInvoices] = useState([])
    const [selectedInvoice, setSelectedInvoice] = useState("")
    const [invoiceSelected, setInvoiceSelected] = useState(false)
    const [clientInvoice, setClientInvoice] = useState({})

    useEffect(()=>{
        API.getClientInvoice(id,token)
        .then(res=>{
            const tempArray = []
            for (let i = 0; i < res.data.length; i++) {
                const tempObj = {
                    id: res.data[i].id,
                    label: res.data[i].for_date + " - Total: " + res.data[i].total + " - Due: " + res.data[i].due
                }
                tempArray.push(tempObj)
            }
            setInvoices(tempArray)
        })
        .catch(err=>{
            console.log(err)
        })
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        let invoiceID = 0
        for (let i = 0; i < invoices.length; i++) {
            if (invoices[i].label === selectedInvoice) {
                invoiceID = invoices[i].id
            }
        }
        API.getInvoiceById(invoiceID,token)
        .then(res=>{
            setClientInvoice(res.data[0])
        })
        .catch(err=>{
            console.log(err)
        })
        // eslint-disable-next-line
    },[selectedInvoice])

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

    const invoiceBtn = (e) => {
        e.preventDefault()
        setShowInvoiceModal(true)
    }

    const handleInputChange = (e) => {
        if (e.target.name === "selectedInvoice") {
            setSelectedInvoice(e.target.value)
            setInvoiceSelected(true)
        }
    }

    return (
        <div className="zs-clients d-flex flex-row pt-3">
            <div className="zs-client-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>{client.first_name} {client.last_name}</h1>
                    <button className="rounded bg-primary text-light col-2" onClick={() => setShowModal(true)}>Edit {client.first_name} {client.last_name}</button>
                </div>
                <div className="d-flex flex-row col-11 mx-auto">
                    <div className="col-6 mt-5">
                        <p className="mb-0">Email: {client.email}</p>
                        <p className="mb-0">Phone: {client.phone}</p>
                        <p className="mb-0">Address:</p>
                        <p className="mb-0">{client.street}</p>
                        <p className="mb-0">{client.city} {client.state}, {client.zip}</p>
                    </div>
                    <div className="d-flex flex-column mt-5 col-6">
                        <label>Invoices</label>
                        <select name="selectedInvoice" style={{height: "31px"}} value={selectedInvoice} onChange={handleInputChange}>
                            <option defaultValue="Select an Invoice">Select an Invoice</option>
                            {invoices.map(item => <ListItems key={item.id} options={item.label}/>)}
                        </select>
                        <button className="bg-primary text-light mt-3 mx-auto col-3 rounded" onClick={invoiceBtn}>Show Invoice</button>
                    </div>
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
            <Modal
                size="lg"
                show={showInvoiceModal}
                onHide={() => setShowInvoiceModal(false)}
                aria-labelledby="add-modal"
                centered>
                <Modal.Header closeButton className="zs-modal-head">
                    <h3>Invoice</h3>
                </Modal.Header>
                <Modal.Body className="zs-invoice-modal">
                    {invoiceSelected ? (
                        <PDFViewer width="100%" height="700px">
                            <MyDocument client={client} invoice={clientInvoice}/>                            
                        </PDFViewer>
                    ):(
                        <p>Please Select an Invoice</p>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ClientDetails