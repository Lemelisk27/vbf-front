import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API";
import ListItems from "./ListItems";

function AddItem (props) {
    const token = Auth.getToken()
    const [nameError, setNameError] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [selectCategory, setSelectCategory] = useState("")
    const [categoryError, setCategoryError] = useState(false)
    const [unitList, setUnitList] = useState([])
    const [selectUnit, setSelectUnit] = useState("")
    const [unitError, setUnitError] = useState(false)
    const [newItem, setNewItem] = useState({
        item_name: "",
        cost: 0,
        qty: 0,
        UnitId: 0
    })
    const [itemJoin, setItemJoin] = useState({
        InventoryId: 0
    })

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < categoryList.length; i++) {
            if (categoryList[i].category_name === selectCategory) {
                setItemJoin({
                    ...itemJoin,
                    InventoryId: categoryList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[selectCategory])

    useEffect(()=>{
        for (let i = 0; i < unitList.length; i++) {
            if (unitList[i].unit_name === selectUnit) {
                setNewItem({
                    ...newItem,
                    UnitId: unitList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[selectUnit])

    const loadPage = () => {
        API.getInventoryCategories(token)
        .then(res=>{
            setCategoryList(res.data)
            API.getUnits(token)
            .then(res=>{
                setUnitList(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowItemModal(false)
    }

    const handleInputChange = (e) => {
        if (e.target.name === "item_name") {
            setNewItem({
                ...newItem,
                item_name: e.target.value
            })
        }
        if (e.target.name === "selectCategory") {
            setSelectCategory(e.target.value)
        }
        if (e.target.name === "selectUnit") {
            setSelectUnit(e.target.value)
        }
        if (e.target.name === "qty") {
            setNewItem({
                ...newItem,
                qty: e.target.value
            })
        }
        if (e.target.name === "cost") {
            setNewItem({
                ...newItem,
                cost: e.target.value
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        resetErrors()
        if (newItem.item_name === "" || newItem.item_name === null) {
            setNameError(true)
            return
        }
        if (selectCategory === "" || selectCategory === null) {
            setCategoryError(true)
            return
        }
        if (selectUnit === "" || selectUnit === null) {
            setUnitError(true)
            return
        }
        API.createInventoryItem(newItem,token)
        .then(res=>{
            const tempObj = {
                InventoryId: itemJoin.InventoryId,
                InventoryitemsId: res.data.id
            }
            API.createInventoryJoin(tempObj,token)
            .then(res=>{
                console.log(res)
                props.setShowItemModal(false)
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const resetErrors = () => {
        setNameError(false)
        setCategoryError(false)
        setUnitError(false)
    }

    return(
        <div className="d-flex flex-column col-12">
            <div className="d-flex flex-column col-12 px-1 py-2">
                <label>What it the Name of the new Item?</label>
                <input type="text" name="item_name" value={newItem.item_name} onChange={handleInputChange}></input>
                {nameError && (
                    <p className="text-danger mb-0">A Name is Required</p>
                )}
            </div>
            <div className="d-flex flex-column col-12 px-1 py-2">
                <label>Select a Category for the new Item</label>
                <select name="selectCategory" style={{height: "31px"}} value={selectCategory} onChange={handleInputChange}>
                    <option defaultValue="Select a Category">Select a Category</option>
                    {categoryList.map(item => <ListItems key={item.id} options={item.category_name}/>)}
                </select>
                {categoryError && (
                    <p className="text-danger mb-0">A Category is Required</p>
                )}
            </div>
            <div className="d-flex flex-row col-12">
                <div className="d-flex flex-column col-8 px-1 py-2">
                    <label>Select a Unit</label>
                    <select name="selectUnit" style={{height: "31px"}} value={selectUnit} onChange={handleInputChange}>
                        <option defaultValue="Select a Unit">Select a Unit</option>
                        {unitList.map(item => <ListItems key={item.id} options={item.unit_name}/>)}
                    </select>
                    {unitError && (
                        <p className="text-danger mb-0">A Unit is Required</p>
                    )}
                </div>
                <div className="d-flex flex-column col-2 px-1 py-2">
                    <label>Quantity</label>
                    <input type="number" name="qty" value={newItem.qty} onChange={handleInputChange}></input>
                </div>
                <div className="d-flex flex-column col-2 px-1 py-2">
                    <label>Cost</label>
                    <input type="number" step="0.01" name="cost" value={newItem.cost} onChange={handleInputChange}></input>
                </div>
            </div>
            <div className="d-flex flex-row col-12 mt-3 justify-content-around">
                <button className="bg-primary text-light rounded col-3" onClick={handleFormSubmit}>Submit</button>
                <button className="bg-primary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default AddItem