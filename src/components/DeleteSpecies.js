import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API";
import ListItems from "./ListItems";

function DeleteSpecies (props) {
    const token = Auth.getToken()
    const [firstLoad, setFirstLoad] = useState(true)
    const [speciesList, setSpeciesList] = useState([])
    const [selectSpecies, setSelectSpecies] = useState("")
    const [newSpecies, setNewSpecies] = useState("")
    const [speciesError, setSpeciesError] = useState(false)
    const [species, setSpecies] = useState({
        id: 0,
        SpeciesId: 0
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
                    id: speciesList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[selectSpecies])

    useEffect(()=>{
        for (let i = 0; i < speciesList.length; i++) {
            if (speciesList[i].name === newSpecies) {
                setSpecies({
                    ...species,
                    SpeciesId: speciesList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[newSpecies])

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
        if (e.target.name === "newSpecies") {
            setNewSpecies(e.target.value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (newSpecies === "" || newSpecies === null) {
            setSpeciesError(true)
            return
        }
        API.updateAnimalSpecies(species,token)
        .then(res=>{
            console.log(res)
            API.updateBreedSpecies(species,token)
            .then(res=>{
                console.log(res)
                API.deleteSpecies(species.id,token)
                .then(res=>{
                    console.log(res)
                    props.setShowSpeciesModal(false)
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

    return (
        <div className="d-flex flex-column col-12">
            {firstLoad ? (
                <div className="d-flex flex-column col-11 mx-auto px-1 py-2">
                    <label>Select a Species to Delete</label>
                    <select name="selectSpecies" style={{height: "31px"}} value={selectSpecies} onChange={handleInputChange}>
                        <option defaultValue="Select a Species">Select a Species</option>
                        {speciesList.map(item => <ListItems key={item.id} options={item.name}/>)}
                    </select>
                </div>
            ):(
                <div className="d-flex flex-column col-12">
                    <h2 className="text-center">Are you Sure?</h2>
                    <h4 className="text-center">This Will <strong className="text-danger">Permanently</strong> Delete {selectSpecies}</h4>
                    <div className="d-flex flex-column">
                        <label>If there are any animals assigned to {selectSpecies}, where would you like them re-assigned?</label>
                        <select name="newSpecies" style={{height: "31px"}} value={newSpecies} onChange={handleInputChange}>
                            <option defaultValue="Select a Species">Select a Species</option>
                            {speciesList.filter(name=>name.name !== selectSpecies).map(item=><ListItems key={item.id} options={item.name}/>)}
                        </select>
                        {speciesError && (
                            <p className="text-danger mb-0">A new Species is Required</p>
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

export default DeleteSpecies