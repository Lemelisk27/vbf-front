import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API";
import ListItems from "./ListItems";

function EditItem (props) {
    const token = Auth.getToken()
    const [firstLoad, setFirstLoad] = useState(true)
    const [itemList, setItemList] = useState([])
    const [selectItem, setSelectItem] = useState("")
    const [selectCategory, setSelectCategory] = useState("")
    const [categoryList, setCatergoryList] = useState([])
    const [selectUnit, setSelectUnit] = useState("")
    const [unitList, setUnitList] = useState([])
    const [nameError, setNameError] = useState(false)
    const [updateItem, setUpdateItem] = useState({
        id: 0,
        item_name: "",
        cost: 0,
        qty: 0,
        UnitId: 0
    })
    const [itemJoin, setItemJoin] = useState({
        InventoryId: 0,
        InventoryitemsId: 0
    })

    useEffect(()=>{
        pageLoad()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].item_name === selectItem) {
                setUpdateItem({
                    ...updateItem,
                    id: itemList[i].id,
                    item_name: itemList[i].item_name,
                    cost: parseFloat(itemList[i].cost),
                    qty: itemList[i].qty,
                    UnitId: itemList[i].UnitId
                })
                setItemJoin({
                    ...itemJoin,
                    InventoryId: itemList[i].Inventories[0].id,
                    InventoryitemsId: itemList[i].id
                })
                setSelectCategory(itemList[i].Inventories[0].category_name)
                setSelectUnit(itemList[i].Unit.unit_name)
            }
        }
        // eslint-disable-next-line
    },[selectItem])

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
                setUpdateItem({
                    ...updateItem,
                    UnitId: unitList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[selectUnit])

    const pageLoad = () => {
        API.getInventoryItems(token)
        .then(res=>{
            setItemList(res.data)
            API.getInventoryCategories(token)
            .then(res=>{
                setCatergoryList(res.data)
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
        if (e.target.name === "selectItem") {
            setSelectItem(e.target.value)
            setFirstLoad(false)
        }
        if (e.target.name === "item_name") {
            setUpdateItem({
                ...updateItem,
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
            setUpdateItem({
                ...updateItem,
                qty: parseInt(e.target.value)
            })
        }
        if (e.target.name === "cost") {
            setUpdateItem({
                ...updateItem,
                cost: parseFloat(e.target.value)
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (updateItem.item_name === "" || updateItem.item_name === null) {
            setNameError(true)
            return
        }
        API.getInventoryJoins(token)
        .then(res=>{
            const tempArray = []
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].InventoryitemsId === itemJoin.InventoryitemsId) {
                    const tempObj = {
                        id: res.data[i].id,
                        InventoryId: itemJoin.InventoryId,
                        InventoryitemsId: itemJoin.InventoryitemsId
                    }
                    tempArray.push(tempObj)
                }
            }
            for (let i = 0; i < tempArray.length; i++) {
                API.updateJoins(tempArray[i],token)
                .then(res=>{
                    console.log(res)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
            API.updateOldInventoryItems(updateItem,token)
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

    return(
        <div className="d-flex flex-column col-12">
            {firstLoad ? (
                <div className="d-flex flex-column col-11 mx-auto px-1 py-2">
                    <label>Select an Item to Edit</label>
                    <select name="selectItem" style={{height: "31px"}} value={selectItem} onChange={handleInputChange}>
                        <option defaultValue="Select an Item">Select an Item</option>
                        {itemList.map(item => <ListItems key={item.id} options={item.item_name}/>)}
                    </select>
                </div>
            ):(
                <div>
                    <div className="d-flex flex-column col-12 px-1 py-2">
                        <label>Item Name</label>
                        <input type="text" name="item_name" value={updateItem.item_name} onChange={handleInputChange}></input>
                        {nameError && (
                            <p className="text-danger mb-0">A Name is Required</p>
                        )}
                    </div>
                    <div className="d-flex flex-column col-12 px-1 py-2">
                        <label>Item Category</label>
                        <select name="selectCategory" style={{height: "31px"}} value={selectCategory} onChange={handleInputChange}>
                            <option defaultValue={selectCategory}>{selectCategory}</option>
                            {categoryList.filter(name => name.category_name !== selectCategory).map(item => <ListItems key={item.id} options={item.category_name}/>)}
                        </select>
                    </div>
                    <div className="d-flex flex-row col-12">
                        <div className="d-flex flex-column col-8 px-1 py-2">
                            <label>Item Unit</label>
                            <select name="selectUnit" style={{height: "31px"}} value={selectUnit} onChange={handleInputChange}>
                                <option defaultValue={selectUnit}>{selectUnit}</option>
                                {unitList.filter(name => name.unit_name !== selectUnit).map(item => <ListItems key={item.id} options={item.unit_name}/>)}
                            </select>
                        </div>
                        <div className="d-flex flex-column col-2 px-1 py-2">
                            <label>Quantity</label>
                            <input type="number" name="qty" value={updateItem.qty} onChange={handleInputChange}></input>
                        </div>
                        <div className="d-flex flex-column col-2 px-1 py-2">
                            <label>Cost</label>
                            <input type="number" step="0.01" name="cost" value={updateItem.cost} onChange={handleInputChange}></input>
                        </div>
                    </div>
                </div>
            )}
            <div className="d-flex flex-row col-12 mt-3 justify-content-around">
                {!firstLoad && (
                    <button className="bg-primary text-light rounded col-3" onClick={handleFormSubmit}>Submit</button>
                )}
                <button className="bg-primary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default EditItem