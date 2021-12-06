import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API";

function AddSpecies (props) {
    const token = Auth.getToken()
    const [speciesList, setSpeciesList] = useState([])
    const [useError, setUseError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [newSpecies, setNewSpecies] = useState({
        name: ""
    })

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

    const loadPage = () => {
        API.getSpecies(token)
        .then(res=>{
            const tempArray = []
            for (let i = 0; i < res.data.length; i++) {
                tempArray.push(res.data[i].name.toLowerCase())
            }
            setSpeciesList(tempArray)
        })
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowSpeciesModal(false)
    }

    const handleInputChange = (e) => {
        if (e.target.name === "name") {
            setNewSpecies({
                ...newSpecies,
                name: e.target.value
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setNameError(false)
        setUseError(false)
        if (newSpecies.name === "" || newSpecies.name === null) {
            setNameError(true)
            return
        }
        if (speciesList.includes(newSpecies.name.toLowerCase())) {
            setUseError(true)
            return
        }
        API.createSpecies(newSpecies,token)
        .then(res=>{
            console.log(res)
            props.setShowSpeciesModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="d-flex flex-column col-12">
            <div className="d-flex flex-column col-12 px-1 py-2">
                <label>What is the Name of the new Species?</label>
                <input type="text" name="name" value={newSpecies.name} onChange={handleInputChange}></input>
                {nameError && (
                    <p className="text-danger mb-0">A Name is Required</p>
                )}
                {useError && (
                    <p className="text-danger mb-0">That Species is Already in use</p>
                )}
            </div>
            <div className="d-flex flex-row mt-3 col-12 justify-content-around">
                <button className="bg-primary text-light rounded col-3" onClick={handleFormSubmit}>Submit</button>
                <button className="bg-primary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default AddSpecies