import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API";
import ListItems from "./ListItems";

function AddBreed (props) {
    const token = Auth.getToken()
    const [speciesSelect, setSpeciesSelect] = useState("")
    const [speciesList, setSpeciesList] = useState([])
    const [nameError, setNameError] = useState(false)
    const [speciesError, setSpeciesError] = useState(false)
    const [breed, setBreed] = useState({
        name: "",
        SpeciesId: 0
    })

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < speciesList.length; i++) {
            if (speciesList[i].name === speciesSelect) {
                setBreed({
                    ...breed,
                    SpeciesId: speciesList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[speciesSelect])

    const loadPage = () => {
        API.getSpecies(token)
        .then(res=>{
            setSpeciesList(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleInputChange = (e) => {
        if (e.target.name === "name") {
            setBreed({
                ...breed,
                name: e.target.value
            })
        }
        if (e.target.name === "speciesSelect") {
            setSpeciesSelect(e.target.value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setNameError(false)
        setSpeciesError(false)
        if (breed.name === "" || breed.name === null) {
            setNameError(true)
            return
        }
        if (speciesSelect === "" || speciesSelect === null) {
            setSpeciesError(true)
            return
        }
        API.createBreed(breed,token)
        .then(res=>{
            console.log(res)
            props.setShowBreedModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowBreedModal(false)
    }

    return (
        <div className="d-felx flex-column col-12">
            <div className="d-flex flex-column col-12 px-1 py-2">
                <label>What is the Name of the new Breed?</label>
                <input type="text" name="name" value={breed.name} onChange={handleInputChange}></input>
                {nameError && (
                    <p className="text-danger mb-0">A Name is Required</p>
                )}
            </div>
            <div className="d-flex flex-column col-12 px-1 py-2">
                <label>Select a Species</label>
                <select name="speciesSelect" style={{height: "31px"}} value={speciesSelect} onChange={handleInputChange}>
                    <option defaultValue="Select a Species">Select a Species</option>
                    {speciesList.map(item => <ListItems key={item.id} options={item.name}/>)}
                </select>
                {speciesError && (
                    <p className="text-danger mb-0">A Species is Required</p>
                )}
            </div>
            <div className="d-flex flex-row col-12 mt-3 justify-content-around">
                <button className="bg-primary text-light rounded col-3" onClick={handleFormSubmit}>Submit</button>
                <button className="bg-primary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default AddBreed