import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API"
import ListItems from "./ListItems";

function EditUnit (props) {
    const token = Auth.getToken()
    const [firstLoad, setFirstLoad] = useState(true)
    const [selectUnit, setSelectUnit] = useState("")
    const [unitList, setUnitList] = useState([])
    const [nameError, setNameError] = useState(false)
    const [updateUnit, setUpdateUnit] = useState({
        id: 0,
        unit_name: ""
    })

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < unitList.length; i++) {
            if (unitList[i].unit_name === selectUnit) {
                setUpdateUnit({
                    ...updateUnit,
                    id: unitList[i].id,
                    unit_name: unitList[i].unit_name
                })
            }
        }
        // eslint-disable-next-line
    },[selectUnit])

    const loadPage = () => {
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
        if (e.target.name === "unit_name") {
            setUpdateUnit({
                ...updateUnit,
                unit_name: e.target.value
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (updateUnit.unit_name === "" || updateUnit.unit_name === null) {
            setNameError(true)
            return
        }
        API.editUnit(updateUnit,token)
        .then(res=>{
            console.log(res)
            props.setShowUnitModal(false)
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
                <div className="d-flex flex-column col-12 px-1 py-2">
                    <label>What is the new Name?</label>
                    <input type="text" name="unit_name" value={updateUnit.unit_name} onChange={handleInputChange}></input>
                    {nameError && (
                        <p className="text-danger mb-0">A Name is Required</p>
                    )}
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

export default EditUnit