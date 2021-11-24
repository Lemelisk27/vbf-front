import React, {useState, useEffect} from "react";
import API from "../utils/API";
import "./style.css"
import PatientList from "../components/PatientList"
import ListItems from "../components/ListItems";

function Patient (props) {
    const [rawAnimals, setRawAnimals] = useState([])
    const [animals, setAnimals] = useState([])
    const [species, setSpecies] = useState([])
    const [rawBreeds, setRawBreeds] = useState([])
    const [breeds, setBreeds] = useState([])
    const [search, setSearch] = useState('')
    const [speciesSearch, setSpeciesSearch] = useState('All')
    const [breedSearch, setBreedSearch] = useState('All')

    useEffect(() => {
        loadAnimals()
        loadSpecies()
        loadBreeds()
    },[])

    const loadAnimals = () => {
        if(props.token) {
            API.getAnimals(props.token)
            .then(res=>{
                setRawAnimals(res.data)
                setAnimals(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    const loadSpecies = () => {
        if(props.token) {
            API.getSpecies(props.token)
            .then(res=>{
                setSpecies(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    const loadBreeds = () => {
        if(props.token) {
            API.getBreeds(props.token)
            .then(res=>{
                setRawBreeds(res.data)
                setBreeds(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

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
        if (search === "" || search === null) {
            setAnimals(rawAnimals)
        }
        else {
            setAnimals(rawAnimals.filter(name => name.name === search))
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

    return (
        <div className="zs-patients d-flex flex-row pt-3">
            <div className="zs-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>Patients</h1>
                    <button className="rounded bg-primary text-light col-2">Add Patient</button>
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
                            </tr>
                        </thead>
                        <tbody>
                            {animals.map(item=><PatientList key={item.id} animal={item}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Patient