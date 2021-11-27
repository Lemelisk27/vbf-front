import React, {useState} from "react";
import ListItems from "./ListItems";

function AddPatient (props) {
    const [clientName, setClientName] = useState("")
    const [clientId, setClientId] = useState("")

    const handleInputChange = (e) => {
        if (e.target.name === "clientName") {
            setClientName(e.target.value)
            for (let i = 0; i < props.clients.length; i++) {
                if (props.clients[i].full_name === e.target.value) {
                    setClientId(props.clients[i].id)
                }
            }
        }
    }

    return (
        <form className="d-flex flex-column">
            <div className="d-flex flex-column col-11 mx-auto">
                <label>To Which Client does this Patient Belong?</label>
                <select name="clientName" onChange={handleInputChange} value={clientName}>
                    <option defaultValue="Select a Client">Select a Client</option>
                    {props.clients.map(item=><ListItems key={item.id} options={item.full_name} id={item.id}/>)}
                </select>
            </div>
            <div className="d-flex flex-row flex-wrap col-12 justify-content-between">
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Name</label>
                    <input type="text" name="animalName" placeholder="Animal's Name"></input>
                </div>
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Color</label>
                    <input type="text" name="animalColor" placeholder="Animal's Color"></input>
                </div>
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Birthdate</label>
                    <input type="date" name="birthdate" min="2000-01-01"></input>
                </div>
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Gender</label>
                    <select name="animalGender" style={{height: "28px"}}>
                        <option defaultValue="Select a Gender">Select a Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Nutered Male</option>
                        <option>Spayed Female</option>
                    </select>
                </div>
                <div className="d-flex flex-column col-12 px-1 py-2">
                    <label>Distinctive Marks</label>
                    <input type="text" name="marks" placeholder="Any Distinctive Marks?"></input>
                </div>
                <div className="d-flex flex-column col-12 px-1 py-2">
                    <label>Description</label>
                    <textarea name="description" cols="30" rows="10" placeholder="Animal's Description"></textarea>
                </div>
                <div className="d-flex col-12">
                    <button className="bg-primary text-light rounded mx-auto col-3">Submit</button>
                </div>
            </div>
        </form>
    )
}

export default AddPatient