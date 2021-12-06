import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API"
import ListItems from "./ListItems";

function DeleteUnit (props) {
    const token = Auth.getToken()
    const [firstLoad, setFirstLoad] = useState(true)
    const [unitList, setUnitList] = useState([])
    const [selectUnit, setSelectUnit] = useState("")
    const [newUnit, setNewUnit] = useState("")
    const [newUnitError, setNewUnitError] = useState(false)
    const [deleteUnit, setDeleteUnit] = useState({
        id: 0,
        UnitId: 0
    })

    useEffect(()=>{
        pageLoad()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < unitList.length; i++) {
            if (unitList[i].unit_name === selectUnit) {
                setDeleteUnit({
                    ...deleteUnit,
                    id: unitList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[selectUnit])

    useEffect(()=>{
        for (let i = 0; i < unitList.length; i++) {
            if (unitList[i].unit_name === newUnit) {
                setDeleteUnit({
                    ...deleteUnit,
                    UnitId: unitList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[newUnit])

    const pageLoad = () => {
        API.getUnits(token)
        .then(res=>{
            setUnitList(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleInputChange = (e) => {
        if (e.target.name === "selectUnit") {
            setSelectUnit(e.target.value)
            setFirstLoad(false)
        }
        if (e.target.name === "newUnit") {
            setNewUnit(e.target.value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (newUnit === "" || newUnit === null) {
            setNewUnitError(true)
            return
        }
        API.updateItemUnits(deleteUnit,token)
        .then(res=>{
            console.log(res)
            API.deleteUnit(deleteUnit.id,token)
            .then(res=>{
                console.log(res)
                props.setShowUnitModal(false)
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
        props.setShowUnitModal(false)
    }

    return (
        <div className="d-flex flex-column col-12">
            {firstLoad ? (
                <div className="d-flex flex-column col-11 mx-auto px-1 py-2">
                    <select name="selectUnit" style={{height: "31px"}} value={selectUnit} onChange={handleInputChange}>
                        <option defaultValue="Select a Unit">Select a Unit</option>
                        {unitList.map(item => <ListItems key={item.id} options={item.unit_name}/>)}
                    </select>
                </div>
            ):(
                <div className="d-flex flex-column col-12">
                    <h2 className="text-center">Are you Sure?</h2>
                    <h4 className="text-center">This Will <strong className="text-danger">Permanently</strong> Delete {selectUnit}</h4>
                    <div className="d-flex flex-column">
                        <label>If there are any items assigned to {selectUnit}, where would you like them re-assigned?</label>
                        <select name="newUnit" style={{height: "31px"}} value={newUnit} onChange={handleInputChange}>
                            <option defaultValue="Select a Role">Select a Unit</option>
                            {unitList.filter(name=>name.unit_name !== selectUnit).map(item=><ListItems key={item.id} options={item.unit_name}/>)}
                        </select>
                        {newUnitError && (
                            <p className="text-danger mb-0">A new Unit is Required</p>
                        )}
                    </div>
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

export default DeleteUnit