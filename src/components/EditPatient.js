import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API"
import ListItems from "./ListItems";

function EditPatient (props) {
    const token = Auth.getToken()
    const genderList = ["Male", "Female", "Nutered Male", "Spayed Female"]
    const [clients, setClients] = useState([])
    const [species, setSpecies] = useState([])
    const [breeds, setBreeds] = useState([])
    const [animalName, setAnimalName] = useState("")
    const [birthdate, setBirthdate] = useState(Date)
    const [clientName, setClientName] = useState("")
    const [clientId, setClientId] = useState(0)
    const [animalSpecies, setAnimalSpecies] = useState("")
    const [speciesId, setSpeciesId] = useState(0)
    const [nameError, setNameError] = useState(false)
    const [birthdateError, setBirthdateError] = useState(false)
    const [clientError, setClientError] = useState(false)
    const [speciesError, setSpeciesError] = useState(false)
    const [animalBreed, setAnimalBreed] = useState("")
    const [breedId, setBreedId] = useState(0)
    const [breedError, setBreedError] = useState(false)
    const [color, setColor] = useState("")
    const [colorError, setColorError] = useState(false)
    const [gender, setGender] = useState("")
    const [genderError, setGenderError] = useState(false)
    const [marks, setMarks] = useState("")
    const [warn, setWarn] = useState(false)
    const [description, setDescription] = useState("")

    const handleInputChange = (e) => {
        if (e.target.name === "animalName") {
            setAnimalName(e.target.value)
        }
        if (e.target.name === "birthdate") {
            setBirthdate(e.target.value)
        }
        if (e.target.name === "clientName") {
            setClientName(e.target.value)
            for (let i = 0; i < clients.length; i++) {
                if(clients[i].full_name === e.target.value) {
                    setClientId(clients[i].id)
                }
            }
        }
        if (e.target.name === "animalSpecies") {
            setAnimalSpecies(e.target.value)
            for (let i = 0; i < species.length; i++) {
                if(species[i].name === e.target.value) {
                    setSpeciesId(species[i].id)
                }
            }
        }
        if (e.target.name === "animalBreed") {
            setAnimalBreed(e.target.value)
            for (let i = 0; i < breeds.length; i++) {
                if(breeds[i].name === e.target.value) {
                    setBreedId(breeds[i].id)
                }
            }
        }
        if (e.target.name === "color") {
            setColor(e.target.value)
        }
        if (e.target.name === "gender") {
            setGender(e.target.value)
        }
        if (e.target.name === "marks") {
            setMarks(e.target.value)
        }
        if (e.target.name === "description") {
            setDescription(e.target.value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (animalName === "" || animalName === null) {
            setNameError(true)
            return
        }
        if (birthdate === "" || birthdate === null) {
            setBirthdateError(true)
            return
        }
        if (clientName === "" || clientName === null) {
            setClientError(true)
            return
        }
        if (animalSpecies === "" || animalSpecies === null) {
            setSpeciesError(true)
            return
        }
        if (animalBreed === "" || animalBreed === null) {
            setBreedError(true)
            return
        }
        if (color === "" || color === null) {
            setColorError(true)
            return
        }
        if (gender === "" || gender === null) {
            setGenderError(true)
            return
        }
        const animalData = {
            id: props.animal.id,
            name: animalName,
            birthdate: birthdate,
            ClientId: clientId,
            SpeciesID: speciesId,
            BreedId: breedId,
            color: color,
            gender: gender,
            marks: marks,
            warn: warn,
            description: description
        }
        API.editAnimal(animalData,token)
        .then(res=>{
            if (res.status === 200) {
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

    useEffect(() => {
        console.log(props)
        API.getClients(token)
        .then(res=>{
            setClients(res.data)
            API.getSpecies(token)
            .then(res=>{
                setSpecies(res.data)
                API.getBreeds(token)
                .then(res=>{
                    setBreeds(res.data)
                })
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
        setAnimalName(props.animal.name)
        setBirthdate(props.animal.date)
        setClientName(props.animal.Client.full_name)
        setAnimalSpecies(props.animal.Species.species)
        setClientId(props.animal.ClientId)
        setSpeciesId(props.animal.SpeciesId)
        setBreedId(props.animal.BreedId)
        setAnimalBreed(props.animal.Breed.breed)
        setColor(props.animal.color)
        setGender(props.animal.gender)
        setMarks(props.animal.marks)
        setWarn(props.animal.warn)
        setDescription(props.animal.description)
    },[])

    return (
        <form className="d-flex flex-column">
            <div className="d-flex flex-row col-11 mx-auto justify-content-between">
                <div className="d-flex flex-column col-10">
                    <label>To Which Client does this Animal Belong?</label>
                    <select name="clientName" onChange={handleInputChange} value={clientName}>
                        <option defaultValue={clientName}>{clientName}</option>
                        {clients.filter(client => client.full_name !== clientName).map(item=><ListItems key={item.id} options={item.full_name}/>)}
                    </select>
                    {clientError && (
                        <p className="text-danger mb-0">A Client is Required</p>
                    )}
                </div>
                <div className="d-flex flex-column col-2 text-center">
                    <label>Warning</label>
                    <input type="checkbox" name="warn" onChange={() => setWarn(!warn)} checked={warn} className="mx-auto"></input>
                </div>
            </div>
            <div className="d-flex flex-column col-12">
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column col-6 px-1 py-2">
                        <label>Name</label>
                        <input type="text" name="animalName" value={animalName} onChange={handleInputChange}></input>
                        {nameError && (
                            <p className="text-danger mb-0">A Name is Required</p>
                        )}
                    </div>
                    <div className="d-flex flex-column col-6 px-1 py-2">
                        <label>Birthdate</label>
                        <input type="date" name="birthdate" value={birthdate} onChange={handleInputChange} style={{height: "31px"}}></input>
                        {birthdateError && (
                            <p className="text-danger mb-0">A Birthdate is Required</p>
                        )}
                    </div>
                </div>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column col-6 px-1 py-2">
                        <label>Species</label>
                        <select name="animalSpecies" onChange={handleInputChange} value={animalSpecies} style={{height: "31px"}}>
                            <option defaultValue={animalSpecies}>{animalSpecies}</option>
                            {species.filter(species => species.name !== animalSpecies).map(item=><ListItems key={item.id} options={item.name}/>)}
                        </select>
                        {speciesError && (
                            <p className="text-danger mb-0">A Species is Required</p>
                        )}
                    </div>
                    <div className="d-flex flex-column col-6 px-1 py-2">
                        <label>Breed</label>
                        <select name="animalBreed" onChange={handleInputChange} value={animalBreed} style={{height: "31px"}}>
                            <option defaultValue={animalBreed}>{animalBreed}</option>
                            {breeds.filter(breeds => breeds.name !== animalBreed).filter(breeds => breeds.Species.id === speciesId).map(item=><ListItems key={item.id} options={item.name}/>)}
                        </select>
                        {breedError && (
                            <p className="text-danger mb-0">A Breed is Required</p>
                        )}
                    </div>
                </div>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column col-6 px-1 py-2">
                        <label>What Color is the Animal?</label>
                        <input type="text" name="color" value={color} onChange={handleInputChange}></input>
                        {colorError && (
                            <p className="text-danger mb-0">A Color is Required</p>
                        )}
                    </div>
                    <div className="d-flex flex-column col-6 px-1 py-2">
                        <label>Gender</label>
                        <select name="gender" onChange={handleInputChange} value={gender} style={{height: "31px"}}>
                            <option defaultValue={gender}>{gender}</option>
                            {genderList.filter(item => item !== gender).map(item=><option>{item}</option>)}
                        </select>
                        {genderError && (
                            <p className="text-danger mb-0">A Gender is Required</p>
                        )}
                    </div>
                </div>
                <div className="d-flex flex-column px-1 py-2">
                    <label>Any Identifying Marks?</label>
                    <input type="text" name="marks" value={marks} onChange={handleInputChange}></input>
                </div>
                <div className="d-flex flex-column col-12 px-1 py-2">
                    <label>Description</label>
                    <textarea name="description" cols="30" rows="10" onChange={handleInputChange} value={description}></textarea>
                </div>
            </div>
            <div className="d-flex col-12 mt-3">
                <button className="bg-primary text-light rounded mx-auto col-3" onClick={handleFormSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default EditPatient