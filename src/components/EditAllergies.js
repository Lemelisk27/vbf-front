import React, {useEffect, useState} from "react";
import Auth from "../utils/auth"
import API from "../utils/API"
import CheckBox from "./checkbox"

function EditAllergies (props) {
    const token = Auth.getToken()
    const [allergies, setAllergies] = useState([])

    useEffect (()=>{
        API.getAllergies(token)
        .then(res=>{
            setAllergies(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const compairAllergies = () => {
        const tempArray = []
        for (let i = 0; i < props.animal.Allergies.length; i++) {
            tempArray.push(props.animal.Allergies[i].alergy_name)
        }
        const allArray = []
        for (let i = 0; i < allergies.length; i++) {
            const tempObj = {
                id: allergies[i].id,
                label: allergies[i].alergy_name,
                check: tempArray.includes(allergies[i].alergy_name)
            }
            allArray.push(tempObj)
        }
        return allArray
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.setEditInfo(true)
        props.setShowModal(false)
    }

    return (
        <form className="d-flex flex-column">
            <div className="d-flex flex-column col-11 mx-auto">
                <div className="d-flex flex-row flex-wrap col-12 justify-content-between my-3">
                    {compairAllergies().map(item=><CheckBox key={item.id} label={item.label} checked={item.check} id={props.animal.id}/>)}
                </div>
                <div className="d-flex flex-row col-12 justify-content-between mt-3">
                    <button className="bg-primary text-light rounded mx-auto col-3" onClick={handleSubmit}>Submit</button>
                    <button className="bg-primary text-light rounded mx-auto col-3" onClick={() => props.setEditInfo(true)}>Back to Edit</button>
                </div>
            </div>
        </form>
    )
}

export default EditAllergies