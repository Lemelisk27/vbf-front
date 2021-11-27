import React, {useState, useEffect} from "react";
import ListItems from "./ListItems";
import API from "../utils/API"
import Auth from "../utils/auth"

function AddPatient (props) {
    const token = Auth.getToken()
    const d = new Date()
    const curr_day = d.getDate()
    const curr_month = d.getMonth() + 1
    const curr_year = d.getFullYear()
    const curr_date = curr_year + "-" + curr_month + "-" + curr_day
    const [clientName, setClientName] = useState("")
    const [clientId, setClientId] = useState(0)
    const [animalName, setAnimalName] = useState("")
    const [animalColor, setAnimalColor] = useState("")
    const [birthdate, setBirthdate] = useState(curr_date)
    const [animalGender, setAnimalGender] = useState("")
    const [marks, setMarks] = useState("")
    const [description, setDescription] = useState("")
    const [clientError, setClientError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [colorError, setColorError] = useState(false)
    const [birthdateError, setBirthdateError] = useState(false)
    const [genderError, setGenderError] = useState(false)
    const [breeds, setBreeds] = useState(props.rawBreeds)
    const rawBreeds = props.rawBreeds
    const species = props.species
    const [animalSpecies, setAnimalSpecies] = useState("")
    const [speciesId, setSpeciesId] = useState(0)
    const [animalBreed, setAnimalBreed] = useState("")
    const [breedId, setBreedId] = useState(0)
    const [speciesError, setSpeciesError] = useState(false)
    const [breedError, setBreedError] = useState(false)

    const handleInputChange = (e) => {
        if (e.target.name === "clientName") {
            setClientName(e.target.value)
            for (let i = 0; i < props.clients.length; i++) {
                if (props.clients[i].full_name === e.target.value) {
                    setClientId(props.clients[i].id)
                }
            }
        }
        if (e.target.name === "animalName") {
            setAnimalName(e.target.value)
        }
        if (e.target.name === "animalColor") {
            setAnimalColor(e.target.value)
        }
        if (e.target.name === "birthdate") {
            setBirthdate(e.target.value)
        }
        if (e.target.name === "animalGender") {
            setAnimalGender(e.target.value)
        }
        if (e.target.name === "marks") {
            setMarks(e.target.value)
        }
        if (e.target.name === "description") {
            setDescription(e.target.value)
        }
        if (e.target.name === "animalSpecies") {
            setAnimalSpecies(e.target.value)
        }
        if (e.target.name === "animalBreed") {
            setAnimalBreed(e.target.value)
            for (let i = 0; i < props.rawBreeds.length; i++) {
                if (props.rawBreeds[i].name === e.target.value) {
                    setSpeciesId(props.rawBreeds[i].Species.id)
                    setBreedId(props.rawBreeds[i].id)
                }
            }
        }
    }

    useEffect(() => {
        if (animalSpecies === "" || animalSpecies === null || animalSpecies === "Select a Species") {
            setBreeds(rawBreeds)
        }
        else {
            setBreeds(rawBreeds.filter(species => species.Species.species === animalSpecies))
        }
    },[animalSpecies])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (clientName === "Select a Client" || clientName === "" || clientName === null) {
            setClientError(true)
            return
        }
        if (animalName === "" || animalName === null) {
            setNameError(true)
            return
        }
        if (animalColor === "" || animalColor === null) {
            setColorError(true)
            return
        }
        if (birthdate === null || birthdate === undefined) {
            setBirthdateError(true)
            return
        }
        if (animalGender === "Select a Gender" || animalGender === "" || animalGender === null) {
            setGenderError(true)
            return
        }
        if (animalSpecies === "Select a Species" || animalSpecies === "" || animalSpecies === null) {
            setSpeciesError(true)
            return
        }
        if (animalBreed === "Select a Breed" || animalBreed === "" || animalBreed === null) {
            setBreedError(true)
        }
        const animalData = {
            name: animalName,
            birthdate: birthdate,
            color: animalColor,
            gender: animalGender,
            marks: marks,
            description: description,
            ClientId: clientId,
            SpeciesId: speciesId,
            BreedId: breedId
        }
        API.addAnimal(animalData,token)
            .then(res=>{
                if(res.status === 200) {
                    props.setShowModal(false)
                }
                else {
                    console.log(res)
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <form className="d-flex flex-column">
            <div className="d-flex flex-column col-11 mx-auto">
                <label>To Which Client does this Patient Belong?</label>
                <select name="clientName" onChange={handleInputChange} value={clientName}>
                    <option defaultValue="Select a Client">Select a Client</option>
                    {props.clients.map(item=><ListItems key={item.id} options={item.full_name}/>)}
                </select>
                {clientError && (
                    <>
                    <p className="text-danger mb-0">A Client Name is Required</p>
                    </>
                )}
            </div>
            <div className="d-flex flex-row flex-wrap col-12 justify-content-between">
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Name</label>
                    <input type="text" name="animalName" placeholder="Animal's Name" onChange={handleInputChange} value={animalName}></input>
                    {nameError && (
                        <>
                        <p className="text-danger mb-0">The Animal's Name is Required</p>
                        </>
                    )}
                </div>
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Color</label>
                    <input type="text" name="animalColor" placeholder="Animal's Color" onChange={handleInputChange} value={animalColor}></input>
                    {colorError && (
                        <>
                        <p className="text-danger mb-0">The Animal's Color is Required</p>
                        </>
                    )}
                </div>
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Birthdate</label>
                    <input type="date" name="birthdate" min="2000-01-01" onChange={handleInputChange} value={birthdate}></input>
                    {birthdateError && (
                        <>
                        <p className="text-danger mb-0">The Animal's Birthdate is Required</p>
                        </>
                    )}
                </div>
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Gender</label>
                    <select name="animalGender" style={{height: "28px"}} onChange={handleInputChange} value={animalGender}>
                        <option defaultValue="Select a Gender">Select a Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Nutered Male</option>
                        <option>Spayed Female</option>
                    </select>
                    {genderError && (
                        <>
                        <p className="text-danger mb-0">The Animal's Gender is Required</p>
                        </>
                    )}
                </div>
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Species</label>
                    <select name="animalSpecies" style={{height: "28px"}} value={animalSpecies} onChange={handleInputChange}>
                        <option defaultValue="Select a Species">Select a Species</option>
                        {species.map(item=><ListItems key={item.id} options={item.name}/>)}
                    </select>
                    {speciesError && (
                        <>
                        <p className="text-danger mb-0">A Species is Required</p>
                        </>
                    )}
                </div>
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Breed</label>
                    <select name="animalBreed" style={{height: "28px"}} value={animalBreed} onChange={handleInputChange}>
                        <option defaultValue="Select a Breed">Select a Breed</option>
                        {breeds.map(item=><ListItems key={item.id} options={item.name}/>)}
                    </select>
                    {breedError && (
                        <>
                        <p className="text-danger mb-0">A Breed is Required</p>
                        </>
                    )}
                </div>
                <div className="d-flex flex-column col-12 px-1 py-2">
                    <label>Distinctive Marks</label>
                    <input type="text" name="marks" placeholder="Any Distinctive Marks?" onChange={handleInputChange} value={marks}></input>
                </div>
                <div className="d-flex flex-column col-12 px-1 py-2">
                    <label>Description</label>
                    <textarea name="description" cols="30" rows="10" placeholder="Animal's Description" onChange={handleInputChange} value={description}></textarea>
                </div>
                <div className="d-flex col-12">
                    <button className="bg-primary text-light rounded mx-auto col-3" onClick={handleFormSubmit}>Submit</button>
                </div>
            </div>
        </form>
    )
}

export default AddPatient