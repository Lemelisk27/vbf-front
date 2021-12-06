import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API";
import ListItems from "./ListItems";

function EditBreed (props) {
    const token = Auth.getToken()
    const [firstLoad, setFirstLoad] = useState(true)
    const [breedList, setBreedList] = useState([])
    const [selectBreed, setSelectBreed] = useState("")
    const [speciesList, setSpeciesList] = useState([])
    const [selectSpecies, setSelectSpecies] = useState("")
    const [breedError, setBreedError] = useState(false)
    const [breed, setBreed] = useState({
        id: 0,
        name: "",
        SpeciesId: 0
    })

    useEffect(()=>{
        pageLoad()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < breedList.length; i++) {
            if (breedList[i].name === selectBreed) {
                setBreed({
                    ...breed,
                    id: breedList[i].id,
                    name: breedList[i].name,
                    SpeciesId: breedList[i].SpeciesId
                })
                for (let j = 0; j < speciesList.length; j++) {
                    if (speciesList[j].id === breedList[i].SpeciesId) {
                        setSelectSpecies(speciesList[j].name)
                    }
                }
            }
        }
        // eslint-disable-next-line
    },[selectBreed])

    useEffect(()=>{
        for (let i = 0; i < speciesList.length; i++) {
            if (speciesList[i].name === selectSpecies) {
                setBreed({
                    ...breed,
                    SpeciesId: speciesList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[selectSpecies])

    const pageLoad = () => {
        API.getBreeds(token)
        .then(res=>{
            setBreedList(res.data)
            API.getSpecies(token)
            .then(res=>{
                setSpeciesList(res.data)
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
        props.setShowBreedModal(false)
    }

    const handleInputChange = (e) => {
        if (e.target.name === "selectBreed") {
            setSelectBreed(e.target.value)
            setFirstLoad(false)
        }
        if (e.target.name === "name") {
            setBreed({
                ...breed,
                name: e.target.value
            })
        }
        if (e.target.name === "selectSpecies") {
            setSelectSpecies(e.target.value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setBreedError(false)
        if (breed.name === "" || breed.name === null) {
            setBreedError(true)
            return
        }
        API.editBreed(breed,token)
        .then(res=>{
            console.log(res)
            props.setShowBreedModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="d-flex flex-column col-12">
            {firstLoad ? (
                <div className="d-flex flex-column col-11 mx-auto px-1 py-2">
                    <label>Select a Breed to Edit</label>
                    <select name="selectBreed" style={{height: "31px"}} value={selectBreed} onChange={handleInputChange}>
                        <option defaultValue="Select a Breed">Select A Breed</option>
                        {breedList.map(item => <ListItems key={item.id} options={item.name}/>)}
                    </select>
                </div>
            ):(
                <div className="d-flex flex-column col-12">
                    <div className="d-flex flex-column px-1 py-2 col-12">
                        <label>Name</label>
                        <input type="text" name="name" value={breed.name} onChange={handleInputChange}></input>
                        {breedError && (
                            <p className="text-danger mb-0">A Name is Required</p>
                        )}
                    </div>
                    <div className="d-flex flex-column px-1 py-2 col-12">
                        <label>Select a Species</label>
                        <select name="selectSpecies" style={{height: "31px"}} value={selectSpecies} onChange={handleInputChange}>
                            <option defaultValue={selectSpecies}>{selectSpecies}</option>
                            {speciesList.filter(name => name.name !== selectSpecies).map(item => <ListItems key={item.id} options={item.name}/>)}
                        </select>
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

export default EditBreed