import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API"

function AddAllergy (props) {
    const token = Auth.getToken()
    const [allergyList, setAllergyList] = useState([])
    const [nameError, setNameError] = useState(false)
    const [useError, setUseError] = useState(false)
    const [allergy, setAllergy] = useState({
        alergy_name: ""
    })

    useEffect(()=>{
        API.getAllergies(token)
        .then(res=>{
            const tempArray = []
            for (let i = 0; i < res.data.length; i++) {
                tempArray.push(res.data[i].alergy_name)
            }
            setAllergyList(tempArray)
        })
        .catch(err=>{
            console.log(err)
        })
        // eslint-disable-next-line
    },[])

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowAllergyModal(false)
    }

    const handleInputChange = (e) => {
        if (e.target.name === "alergy_name") {
            setAllergy({
                ...allergy,
                alergy_name: e.target.value
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setNameError(false)
        setUseError(false)
        if (allergy.alergy_name === "" || allergy.alergy_name === null) {
            setNameError(true)
            return
        }
        if (allergyList.includes(allergy.alergy_name)) {
            setUseError(true)
            return
        }
        API.createAllergy(allergy,token)
        .then(res=>{
            console.log(res)
            props.setShowAllergyModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="d-flex flex-column col-12">
            <div className="d-flex flex-column col-12 px-1 py-2">
                <label>What's the Name of the new Allergy?</label>
                <input type="text" name="alergy_name" value={allergy.alergy_name} onChange={handleInputChange}></input>
                {nameError && (
                    <p className="text-danger mb-0">A Name is Required</p>
                )}
                {useError && (
                    <p className="text-danger mb-0">That Name is Already in use</p>
                )}
            </div>
            <div className="d-flex flex-row col-12 mt-3 justify-content-around">
                <button className="bg-primary text-light rounded col-3" onClick={handleFormSubmit}>Submit</button>
                <button className="bg-primary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default AddAllergy