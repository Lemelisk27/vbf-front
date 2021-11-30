import React, {useState, useEffect} from "react";
import {Modal} from "react-bootstrap";
import API from "../../utils/API";
import "./style.css"
import PatientList from "../../components/PatientList"
import ListItems from "../../components/ListItems";
import Auth from "../../utils/auth"
import AddPatient from "../../components/AddPatient"

function Patient (props) {
    const [rawAnimals, setRawAnimals] = useState([])
    const [animals, setAnimals] = useState([])
    const [species, setSpecies] = useState([])
    const [rawBreeds, setRawBreeds] = useState([])
    const [breeds, setBreeds] = useState([])
    const [search, setSearch] = useState('')
    const [speciesSearch, setSpeciesSearch] = useState('All')
    const [breedSearch, setBreedSearch] = useState('All')
    const [clients, setClients] = useState([])
    const [showModal, setShowModal] = useState(false)
    const token = Auth.getToken()

    useEffect (() => {
        API.getAnimals(token)
        .then(res=>{
            setRawAnimals(res.data)
            setAnimals(res.data)
            API.getSpecies(token)
            .then(res=>{
                setSpecies(res.data)
                API.getBreeds(token)
                .then(res=>{
                    setRawBreeds(res.data)
                    setBreeds(res.data)
                    API.getClients(token)
                    .then(res=>{
                        setClients(res.data)
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
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    useEffect (() => {
        API.getAnimals(token)
        .then(res=>{
            setRawAnimals(res.data)
            setAnimals(res.data)
            API.getSpecies(token)
            .then(res=>{
                setSpecies(res.data)
                API.getBreeds(token)
                .then(res=>{
                    setRawBreeds(res.data)
                    setBreeds(res.data)
                    API.getClients(token)
                    .then(res=>{
                        setClients(res.data)
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
        })
        .catch(err=>{
            console.log(err)
        })
    },[showModal])

    const handleInputChange = (e) => {
        if (e.target.name === "search") {
            setSearch(e.target.value)
        }
        if (e.target.name === "species") {
            setSpeciesSearch(e.target.value)
        }
        if (e.target.name === "breed") {
            setBreedSearch(e.target.value)
        }
    }

    useEffect(() => {
        const regex = new RegExp(`${search}.*`, "i")
        if (search === "" || search === null) {
            setAnimals(rawAnimals)
        }
        else {
            setAnimals(rawAnimals.filter(name => regex.exec(name.name)))
        }
    },[search])

    useEffect(() => {
        if (speciesSearch === "" || speciesSearch === null || speciesSearch === "All") {
            setAnimals(rawAnimals)
            setBreeds(rawBreeds)
            setBreedSearch("All")
        }
        else {
            setAnimals(rawAnimals.filter(species => species.Species.species === speciesSearch))
            setBreeds(rawBreeds.filter(species=> species.Species.species === speciesSearch))
        }
    },[speciesSearch])

    useEffect(() => {
        if (breedSearch === "" || breedSearch === null || breedSearch === "All") {
            setAnimals(rawAnimals)
            setSpeciesSearch("All")
        }
        else {
            setAnimals(rawAnimals.filter(breeds => breeds.Breed.breed === breedSearch))
        }
    },[breedSearch])

    const trimAnimals = () => {
        for (let i = 0; i < animals.length; i++) {
            if (animals[i].Appts[0] === undefined) {
                animals[i].Appts[0] = {nextAppt: "None"}
            }
            if (animals[i].prevAppt[0] === undefined) {
                animals[i].prevAppt[0] = {lastAppt: "None"}
            }
        }
        return animals
    }

    return (
        <div className="zs-patients d-flex flex-row pt-3">
            <div className="zs-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>Patients</h1>
                    <button className="rounded bg-primary text-light col-2" onClick={() => setShowModal(true)}>Add Patient</button>
                </div>
                <form className="d-flex justify-content-between mt-5 col-11 mx-auto">
                    <div className="d-flex flex-column col-3">
                        <label>Name</label>
                        <input value={search} type="text" onChange={handleInputChange} name="search" placeholder="Type here to search..."></input>                        
                    </div>
                    <div className="d-flex flex-column col-3">
                        <label>Species</label>
                        <select className="zs-select" name="species" onChange={handleInputChange} value={speciesSearch}>
                            <option defaultValue="All">All</option>
                            {species.map(item=><ListItems key={item.id} options={item.name}/>)}
                        </select>                       
                    </div>
                    <div className="d-flex flex-column col-3">
                        <label>Breed</label>
                        <select className="zs-select" name="breed" onChange={handleInputChange} value={breedSearch}>
                            <option defaultValue="All">All</option>
                            {breeds.map(item=><ListItems key={item.id} options={item.name}/>)}
                        </select>                     
                    </div>
                </form>
                <div className="col-11 mx-auto mt-5 zs-pcard overflow-auto">
                    <table className="table table-bordered">
                        <thead className="bg-secondary">
                            <tr className="text-center text-light">
                                <th scope="col">Name</th>
                                <th scope="col">Species</th>
                                <th scope="col">Breed</th>
                                <th scope="col">Client</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Last Appointment</th>
                                <th scope="col">Next Appointment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trimAnimals().map(item=><PatientList key={item.id} animal={item} next={item.Appts[0].nextAppt} last={item.prevAppt[0].lastAppt}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='add-modal'>
                <Modal.Header closeButton className="zs-modal-head">
                    <Modal.Title id="add-modal">
                        <h3>Add Patient</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddPatient clients={clients} setShowModal={setShowModal} species={species} rawBreeds={rawBreeds}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Patient