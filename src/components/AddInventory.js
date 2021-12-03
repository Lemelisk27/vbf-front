import React, {useState, useEffect} from "react";
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { Typeahead } from 'react-bootstrap-typeahead'
import Auth from "../utils/auth"
import API from "../utils/API"
import AddInventoryList from "./AddInventoryList";

function AddInventory (props) {
    const token = Auth.getToken()
    const [productList, setProductList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])
    const [exclude] = useState([])
    const [selectedList] = useState([])
    const [productPage, setProductPage] = useState(false)
    const [rawList, setRawList] = useState([])

    useEffect(()=>{
        API.getInventoryItems(token)
        .then(res=>{
            const tempArray = []
            for (let i = 0; i < res.data.length; i++) {
                const tempObj = {
                    label: res.data[i].item_name,
                    id: res.data[i].id,
                    qty: res.data[i].qty,
                    unit: res.data[i].Unit.unit_name
                }
                tempArray.push(tempObj)
            }
            setProductList(tempArray)
            setRawList(tempArray)
        })
        .catch(err=>{
            console.log(err)
        })
    // eslint-disable-next-line
    },[])

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

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (productPage) {
            const table = document.getElementById("list-table")
            const tempArray = []
            for (let i = 0; i < table.rows.length; i++) {
                const tempObj = {
                    id: parseInt(table.rows[i].cells[0].dataset.index, 10),
                    qty: parseInt(table.rows[i].cells[1].dataset.index, 10)
                }
                tempArray.push(tempObj)
            }
            for (let i = 0; i < tempArray.length; i++) {
                for (let j = 0; j < rawList.length; j++) {
                    if (tempArray[i].id === rawList[j].id) {
                        tempArray[i].qty = tempArray[i].qty + rawList[j].qty
                    }
                }
            }
            for (let i = 0; i < tempArray.length; i++) {
                API.updateInventoryItems(tempArray[i],token)
                .then(res=>{
                    console.log(res)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
            props.setShowModal(false)
        }
    }

    return (
        <div className="d-flex flex-column col-11 mx-auto">
            <div className="d-flex flex-row col-12 justify-content-between">
                <div className="d-flex flex-column col-9">
                    <label>Product</label>
                    <Typeahead
                        id="product-list"
                        onChange={setSelectedProduct}
                        options={productList}
                        placeholder="Type Here to Search..."
                        selected={selectedProduct}
                    />
                </div>
                <button className="align-self-end col-2 bg-primary text-light rounded" onClick={addProduct}>Add</button>
            </div>
            <table className="table table-bordered mt-2">
                <thead className="bg-secondary">
                    <tr className="text-center text-light">
                        <th scope="col" className="col-10">Item</th>
                        <th scope="col" className="col-1">Quantity</th>
                        <th scope="col" className="col-1">Units</th>
                    </tr>
                </thead>
                <tbody id="list-table">
                    {selectedList.map(list=><AddInventoryList key={list.id} item={list}/>)}
                </tbody>
            </table>
            <div className="d-flex mt-3 col-11 mx-auto">
                <button className="bg-primary text-light rounded mx-auto col-3" onClick={handleFormSubmit}>Submit</button>
                <button onClick={() => props.setShowModal(false)} className="bg-primary text-light rounded mx-auto col-3">Cancel</button>
            </div>
        </div>
    )
}

export default AddInventory