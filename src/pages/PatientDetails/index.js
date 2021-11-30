import React, {useState, useEffect} from "react";
import "./style.css"
import {useParams} from "react-router-dom"
import Auth from "../../utils/auth"
import API from "../../utils/API"
import List from "../../components/List"

function PatientDetails (props) {
    const {id} = useParams()
    const token = Auth.getToken()
    const [details, setDetails] = useState([])
    const [allergies, setAllergies] = useState(false)
    const [allergyList, setAllergyList] = useState([])
    const [species, setSpecies] = useState("")
    const [breed, setBreed] = useState("")

    useEffect (() => {
        API.getAnimalDetails(id,token)
        .then(res=>{
            setDetails(res.data)
            setSpecies(res.data.Species.species)
            setBreed(res.data.Breed.breed)
            if (res.data.Allergies.length > 0) {
                setAllergies(true)
                setAllergyList(res.data.Allergies)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },[id])

    return (
        <div className="zs-details d-flex flex-row pt-3">
            <div className="zs-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>{details.name}</h1>
                    {details.warn && (
                        <h3 className="text-danger">Warning</h3>
                    )}
                    <button className="rounded bg-primary text-light col-2">Edit {details.name}</button>
                </div>
                <div className="d-flex justify-content-between mt-5 col-11 mx-auto">
                    {details.img && (
                        <img src={details.img} alt="Animal Pic" className="col-2"></img>
                    )}
                    {allergies && (
                        <div className="d-flex border border-dark px-3 pt-2 col-2">
                            <div className="mx-auto">
                                <p className="mb-0">Allergies:</p>
                                <ul className="mb-0 text-danger">
                                    {allergyList.map(list=><List key={list.id} item={list.alergy_name}/>)}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <div className="d-flex flex-column col-11 mx-auto mt-5">
                    <p className="mb-0">Species: {species}</p>
                    <p className="mb-0">Breed: {breed}</p>
                    {details.marks && (
                        <p className="mb-0">Marks: {details.marks}</p>
                    )}
                    {details.description && (
                        <p className="mb-0">Description: {details.description}</p>
                    )}
                    <p className="mb-0">Birthdate: {details.birthdate}</p>
                    <p className="mb-0">Color: {details.color}</p>
                    <p className="mb-0">Gender: {details.gender}</p>
                </div>
            </div>
        </div>
    )
}

export default PatientDetails