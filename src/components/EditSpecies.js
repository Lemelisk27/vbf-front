import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API";
import ListItems from "./ListItems";

function EditSpecies (props) {
    const token = Auth.getToken()
    const [firstLoad, setFirstLoad] = useState(true)
    const [speciesList, setSpeciesList] = useState([])
    const [selectSpecies, setSelectSpecies] = useState("")
    const [nameError, setNameError] = useState(false)
    const [species, setSpecies] = useState({
        id: 0,
        name: ""
    })

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < speciesList.length; i++) {
            if (speciesList[i].name === selectSpecies) {
                setSpecies({
                    ...species,
                    id: speciesList[i].id,
                    name: speciesList[i].name
                })
            }
        }
        // eslint-disable-next-line
    },[selectSpecies])

    const loadPage = () => {
        API.getSpecies(token)
        .then(res=>{
            setSpeciesList(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowSpeciesModal(false)
    }

    const handleInputChange = (e) => {
        if (e.target.name === "selectSpecies") {
            setSelectSpecies(e.target.value)
            setFirstLoad(false)
        }
        if (e.target.name === "name") {
            setSpecies({
                ...species,
                name: e.target.value
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setNameError(false)
        if (species.name === "" || species.name === null) {
            setNameError(true)
            return
        }
        API.editSpecies(species,token)
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
            {firstLoad ? (
                <div className="d-flex flex-column col-11 mx-auto px-1 py-2">
                    <label>Select a Species to Edit</label>
                    <select name="selectSpecies" style={{height: "31px"}} value={selectSpecies} onChange={handleInputChange}>
                        <option defaultValue="Select a Species">Select a Species</option>
                        {speciesList.map(item => <ListItems key={item.id} options={item.name}/>)}
                    </select>
                </div>
            ):(
                <div className="d-flex flex-column col-12">
                    <label>Enter a new Name</label>
                    <input type="text" name="name" value={species.name} onChange={handleInputChange}></input>
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

export default EditSpecies