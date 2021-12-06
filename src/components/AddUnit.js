import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API"

function AddUnit (props) {
    const token = Auth.getToken()
    const [nameError, setNameError] = useState(false)
    const [unitList, setUnitList] = useState([])
    const [useError, setUseError] = useState(false)
    const [newUnit, setNewUnit] = useState({
        unit_name: ""
    })

    useEffect(()=>{
        API.getUnits(token)
        .then(res=>{
            const tempArray = []
            for (let i = 0; i < res.data.length; i++) {
                tempArray.push(res.data[i].unit_name)
            }
            setUnitList(tempArray)
        })
        .catch(err=>{
            console.log(err)
        })
        // eslint-disable-next-line
    },[])

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowUnitModal(false)
    }

    const handleInputChange = (e) => {
        if (e.target.name === "unit_name") {
            setNewUnit({
                ...newUnit,
                unit_name: e.target.value
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        resetErrors()
        if (newUnit.unit_name === "" || newUnit.unit_name === null) {
            setNameError(true)
            return
        }
        if (unitList.includes(newUnit.unit_name)) {
            setUseError(true)
            return
        }
        API.createUnit(newUnit,token)
        .then(res=>{
            console.log(res)
            props.setShowUnitModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const resetErrors = () => {
        setNameError(false)
        setUseError(false)
    }

    return (
        <div className="d-flex flex-column col-12">
            <div className="d-flex flex-column col-12 px-1 py-2">
                <label>What is the Name of the new Unit?</label>
                <input type="text" name="unit_name" value={newUnit.unit_name} onChange={handleInputChange}></input>
                {nameError && (
                    <p className="text-danger mb-0">A Name is Required</p>
                )}
                {useError && (
                    <p className="text-danger mb-0">That Name is Already in use.</p>
                )}
            </div>
            <div className="d-flex flex-row col-12 mt-3 justify-content-around">
                <button className="bg-primary text-light rounded col-3" onClick={handleFormSubmit}>Submit</button>
                <button className="bg-primary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default AddUnit