import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import "./style.css"
import Auth from "../../utils/auth"
import API from "../../utils/API"
import InventoryList from "../../components/InventoryList";
import ListItems from "../../components/ListItems"
import AddInventory from "../../components/AddInventory";

function Inventory (props) {
    const token = Auth.getToken()
    const [inventoryList, setInventoryList] = useState([])
    const [rawList, setRawList] = useState([])
    const [search, setSearch] = useState("")
    const [categories, setCategories] = useState([])
    const [catSearch, setCatSearch] = useState("")
    const [showModal, setShowModal] = useState(false)

    useEffect(()=>{
        API.getInventoryItems(token)
        .then(res=>{
            setRawList(res.data)
            const tempArray = res.data
            for (let i = 0; i < tempArray.length; i++) {
                if (tempArray[i].Inventories[0] === undefined) {
                    tempArray[i].Inventories[0] = {category_name: "None"}
                }
            }
            setInventoryList(tempArray)
            API.getInventoryCategories(token)
            .then(res=>{
                setCategories(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    useEffect(()=>{
        API.getInventoryItems(token)
        .then(res=>{
            setRawList(res.data)
            const tempArray = res.data
            for (let i = 0; i < tempArray.length; i++) {
                if (tempArray[i].Inventories[0] === undefined) {
                    tempArray[i].Inventories[0] = {category_name: "None"}
                }
            }
            setInventoryList(tempArray)
            API.getInventoryCategories(token)
            .then(res=>{
                setCategories(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    },[showModal])

    const handleInputChange = (e) => {
        if (e.target.name === "search") {
            setSearch(e.target.value)
        }
        if (e.target.name === "categories") {
            setCatSearch(e.target.value)
        }
    }

    useEffect(()=>{
        const regex = new RegExp(`${search}.*`, "i")
        if (search === "" || search === null) {
            setInventoryList(rawList)
        }
        else {
            setInventoryList(rawList.filter(item => regex.exec(item.item_name)))
        }
    },[search])

    useEffect(()=>{
        if (catSearch === "" || catSearch === null || catSearch === "All") {
            setInventoryList(rawList)
            setCatSearch("All")
        }
        else {
            setInventoryList(inventoryList.filter(cat => cat.Inventories[0].category_name === catSearch))
        }
    },[catSearch])

    return (
        <div className="zs-inventory d-flex flex-row pt-3">
            <div className="zs-inventory-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>Inventory</h1>
                    <button className="rounded bg-primary text-light col-2" onClick={() => setShowModal(true)}>Add Inventory</button>
                </div>
                <div className="d-flex flex-row col-11 justify-content-between mx-auto mt-5">
                    <form className="d-flex flex-row col-8 justify-content-between">
                        <div className="d-flex flex-column col-5">
                            <label>Item</label>
                            <input type="text" name="search" placeholder="Type here to Search..." value={search} onChange={handleInputChange}></input>
                        </div>
                        <div className="d-flex flex-column col-5">
                            <label>Categories</label>
                            <select name="categories" className="zs-inventory-select" value={catSearch} onChange={handleInputChange}>
                                <option defaultValue="All">All</option>
                                {categories.map(item=><ListItems key={item.id} options={item.category_name}/>)}
                            </select>                       
                        </div>
                    </form>
                </div>
                <div className="col-11 mx-auto mt-5 zs-icard overflow-auto">
                    <table className="table table-bordered">
                        <thead className="bg-secondary">
                            <tr className="text-center text-light">
                                <th scope="col" className="col-6">Item</th>
                                <th scope="col" className="col-3">Category</th>
                                <th scope="col" className="col-1">Cost</th>
                                <th scope="col" className="col-1">Quantity</th>
                                <th scope="col" className="col-1">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryList.map(item=><InventoryList key={item.id} item={item}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='add-modal'>
                <Modal.Header closeButton className="zs-modal-inventory">
                    <Modal.Title id="add-modal">
                        <h3>Add Inventory</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddInventory setShowModal={setShowModal}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Inventory