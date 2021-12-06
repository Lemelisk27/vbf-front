import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API"
import ListItems from "./ListItems";

function DeleteItem (props) {
    const token = Auth.getToken()
    const [firstLoad, setFirstLoad] = useState(true)
    const [itemList, setItemList] = useState([])
    const [selectItem, setSelectItem] = useState("")
    const [itemId, setItemId] = useState(0)

    useEffect(()=>{
        pageLoad()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].item_name === selectItem) {
                setItemId(itemList[i].id)
            }
        }
        // eslint-disable-next-line
    },[selectItem])

    const pageLoad = () => {
        API.getInventoryItems(token)
        .then(res=>{
            setItemList(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleInputChange = (e) => {
        if (e.target.name === "selectItem") {
            setSelectItem(e.target.value)
            setFirstLoad(false)
        }
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowItemModal(false)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        API.deleteInventoryItem(itemId,token)
        .then(res=>{
            console.log(res)
            props.setShowItemModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="d-flex flex-column col-12">
            {firstLoad ? (
                <div className="d-flex flex-column col-11 mx-auto px-1 py-2">
                    <label>Select an Item to Delete</label>
                    <select name="selectItem" style={{height: "31px"}} value={selectItem} onChange={handleInputChange}>
                        <option defaultValue="Select an Item">Select an Item</option>
                        {itemList.map(item => <ListItems key={item.id} options={item.item_name}/>)}
                    </select>
                </div>
            ):(
                <div className="d-flex flex-column col-12">
                    <h2 className="text-center">Are you Sure?</h2>
                    <h4 className="text-center">This Will <strong className="text-danger">Permanently</strong> Delete {selectItem}</h4>
                </div>
            )}
            <div className="d-flex flex-row col-12 mt-3 justify-content-around">
                {!firstLoad && (
                    <button className="bg-danger text-light rounded col-3" onClick={handleFormSubmit}>Yes</button>
                )}
                <button className="bg-primary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteItem