import React, {useState, useEffect} from "react";
import {Modal} from "react-bootstrap"
import "./style.css"
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { Typeahead } from 'react-bootstrap-typeahead'
import Auth from "../../utils/auth"
import API from "../../utils/API"
import ProductList from "../../components/ProductList"

function Sales (props) {
    const token = Auth.getToken()
    const [productPage, setProductPage] = useState(false)
    const [selectedClient, setSelectedClient] = useState([])
    const [clientList, setClientList] = useState([])
    const [clientSelected, setClientSelected] = useState(false)
    const [productList, setProductList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])
    const [selectedList] = useState([])
    const [exclude] = useState([])
    const [change, setChange] = useState(true)
    const [subtotal, setSubtotal] = useState(0)
    const [taxRate, setTaxRate] = useState(0)
    const [tax, setTax] = useState(0)
    const [total, setTotal] = useState(0)
    const [paid, setPaid] = useState(0)
    const [due, setDue] = useState(0)
    const [disableList, setDisableList] = useState(true)
    const [placeholder, setPlaceholder] = useState("Please Select a Client First...")
    const [disableSave, setDisableSave] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect (()=>{
        API.getClients(token)
        .then(res=>{
            const tempArray = []
            for (let i = 0; i < res.data.length; i++) {
                const tempObj = {
                    label: res.data[i].full_name,
                    id: res.data[i].id
                }
                tempArray.push(tempObj)
            }
            setClientList(tempArray)
            API.getInventoryItems(token)
            .then(res=>{
                const tempArray = []
                for (let i = 0; i < res.data.length; i++) {
                    const tempObj = {
                        label: res.data[i].item_name,
                        id: res.data[i].id,
                        cost: res.data[i].cost,
                        qty: res.data[i].qty
                    }
                    tempArray.push(tempObj)
                }
                setProductList(tempArray)
                API.getClinic(token)
                .then(res=>{
                    setTaxRate(res.data[0].tax_rate / 100)
                })
                .catch(err=>{
                    console.log(err)
                })
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    // eslint-disable-next-line
    },[])

    const addClient = (e) => {
        e.preventDefault()
        if (selectedClient.length > 0) {
            setClientSelected(true)
            setDisableList(false)
            setPlaceholder("Type Here to Search...")
        }
    }

    const addProduct = (e) => {
        e.preventDefault()
        if (selectedProduct.length > 0) {
            exclude.push(selectedProduct[0].label)
            selectedList.push(selectedProduct[0])
            setProductList(productList.filter(item => !exclude.includes(item.label)))
            setSelectedProduct([])
            setProductPage(true)
        }
    }

    useEffect (()=>{
        if (productPage) {
            const table = document.getElementById("table")
            let val = 0
            for (let i = 0; i < table.rows.length; i++) {
                val = val + parseFloat(table.rows[i].cells[3].innerHTML)
            }
            setSubtotal(val.toFixed(2))
            const tempTax = val * taxRate
            setTax(tempTax.toFixed(2))
            const tempTotal = val + tempTax
            setTotal(tempTotal.toFixed(2))
            const tempDue = tempTotal - paid
            setDue(tempDue.toFixed(2))
        }
    // eslint-disable-next-line
    },[change, paid])

    const paidChange = (e) => {
        setPaid(e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (selectedClient.length > 0 && productPage) {
            let tempVar = false
            let newDue = parseFloat(due)
            if (due <= 0) {
                tempVar = true
                newDue = 0
            }
            const sendObj = {
                ClientId: selectedClient[0].id,
                subtotal: parseFloat(subtotal),
                tax: parseFloat(tax),                                    
                total: parseFloat(total),
                paid: parseFloat(paid),
                due: newDue,
                // eslint-disable-next-line
                date: new Date,
                full_paid: tempVar
            }
            API.createInvoice(sendObj,token)
            .then(res=>{
                const id = res.data.id
                const items = []
                const inv = []
                const table = document.getElementById("table")
                for (let i = 0; i < table.rows.length; i++) {
                    const tempObj = {
                        InvoiceId: id,
                        item_id: parseInt(table.rows[i].cells[0].dataset.index),
                        item_name: table.rows[i].cells[0].innerHTML,
                        item_cost: parseFloat(table.rows[i].cells[1].innerHTML),
                        item_qty: parseInt(table.rows[i].cells[2].dataset.index),
                        item_price: parseFloat(table.rows[i].cells[3].innerHTML)
                    }
                    const invObj = {
                        id: parseInt(table.rows[i].cells[0].dataset.index),
                        qty: parseInt(table.rows[i].cells[1].dataset.index)
                    }
                    inv.push(invObj)
                    items.push(tempObj)
                }
                for (let i = 0; i < items.length; i++) {
                    API.createInvoiceItems(items[i],token)
                    .then(res=>{
                        console.log(res)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }
                for (let i = 0; i < inv.length; i++) {
                    API.updateInventoryItems(inv[i],token)
                    .then(res=>{
                        console.log(res)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
            setDisableList(true)
            setDisableSave(true)
            setShowModal(true)
        }
    }

    return (
        <div className="zs-sales pt-3">
            <div className="zs-sales-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>Sales</h1>
                    {clientSelected ? (
                        <h1>{selectedClient[0].label}</h1>
                    ):(
                        <div className="d-flex flex-row col-8 justify-content-end">
                            <button className="bg-primary text-light col-3 mx-3 rounded align-self-end" onClick={addClient}>Select</button>
                            <div className="d-flex flex-column col-5 align-self-end">
                                <Typeahead
                                    id="client-list"
                                    onChange={setSelectedClient}
                                    options={clientList}
                                    placeholder="Select a Client..."
                                    selected={selectedClient}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="d-flex flex-column col-11 mx-auto mt-5">
                    <h3>Products</h3>
                    <div className="d-flex flex-row col-12">
                        <Typeahead
                            disabled={disableList}
                            id="product-list"
                            onChange={setSelectedProduct}
                            options={productList}
                            placeholder={placeholder}
                            selected={selectedProduct}
                            className="col-9"
                        />
                        <button className="col-2 rounded bg-primary text-light mx-3" onClick={addProduct} disabled={disableList}>Add</button>
                    </div>
                </div>
                <div className="mx-auto border border-dark mt-3 zs-product-list overflow-auto">
                    {!productPage ? (
                        <p className="text-center m-auto">No Products Selected</p>
                    ):(
                        <table className="table table-bordered">
                            <thead className="bg-secondary">
                                <tr className="text-center text-light">
                                    <th scope="col" className="col-9">Item</th>
                                    <th scope="col" className="col-1">Cost</th>
                                    <th scope="col" className="col-1">Quantity</th>
                                    <th scope="col" className="col-1">Price</th>
                                </tr>
                            </thead>
                            <tbody id="table">
                                {selectedList.map(list=><ProductList key={list.id} item={list} setChange={setChange} change={change}/>)}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="d-flex flex-row col-11 mx-auto justify-content-between">
                    <div className="d-flex flex-column border border-dark col-2 mt-2 justify-content-between">
                        <table className="mx-2">
                            <tbody className="d-flex flex-column justify-content-between">
                                <tr className="d-flex flex-row justify-content-between">
                                    <th scope="row">Subtotal:</th>
                                    <td>${subtotal}</td>
                                </tr>
                                <tr className="d-flex flex-row justify-content-between">
                                    <th scope="row">Tax:</th>
                                    <td>${tax}</td>
                                </tr>
                                <tr className="d-flex flex-row justify-content-between">
                                    <th scope="row">Total:</th>
                                    <td>${total}</td>
                                </tr>
                                <tr className="d-flex flex-row justify-content-between">
                                    <th scope="row" className="d-flex col-6">Paid:</th>
                                    <td><input type="number" step="0.01" name={paid} value={paid} onChange={paidChange} className="d-flex mx-auto col-10 text-center"></input></td>
                                </tr>
                                <tr className="d-flex flex-row justify-content-between">
                                    <th scope="row">Due:</th>
                                    <td>${due}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex flex-column col-3 align-self-end">
                        <button className="bg-primary text-light rounded mb-2" onClick={handleFormSubmit} disabled={disableSave}>Save</button>
                        <button className="bg-primary text-light rounded" onClick={() => window.location.reload()}>Cancel</button>
                    </div>
                </div>
            </div>
            <Modal
                size='lg'
                show={showModal}
                onHide={() => window.location.reload()}
                aria-labelledby='add-modal'
                centered>
                <Modal.Header closeButton className="zs-modal-sales">
                    <Modal.Title id="add-modal">
                        <h3>Invoice Saved</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column col-11 mx-auto justify-content-center">
                        <h2 className="text-center">The invoice was saved.</h2>
                        <button className="bg-primary text-light col-3 mx-auto rounded mt-3" onClick={() => window.location.reload()}>Close</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Sales