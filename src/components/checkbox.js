import React, {useState} from "react";
import Auth from "../utils/auth"
import API from "../utils/API";

function CheckBox (props) {
    const token = Auth.getToken()
    const [value, setValue] = useState(props.checked)

    const changeAllergies = (e) => {
        if (value) {
            API.getAllergies(token)
            .then(res=>{
                let tempName = 0
                for (let i = 0; i < res.data.length; i++) {
                    if (e.target.name === res.data[i].alergy_name) {
                        tempName = res.data[i].id
                    }
                }
                const tempObj = {
                    AnimalId: props.id,
                    AllergyId: tempName
                }
                API.getJoins(token)
                .then(res=>{
                    let tempId = 0
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].AnimalId === tempObj.AnimalId && res.data[i].AllergyId === tempObj.AllergyId) {
                            tempId = res.data[i].id
                        }
                    }
                    API.deleteAllergyJoin(tempId,token)
                    .then(res=>{
                        if (res.status === 200) {
                            setValue(!value)
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
            })
        }
        if (!value) {
            API.getAllergies(token)
            .then(res=>{
                let tempName = 0
                for (let i = 0; i < res.data.length; i++) {
                    if (e.target.name === res.data[i].alergy_name) {
                        tempName = res.data[i].id
                    }
                }
                const tempObj = {
                    AnimalId: props.id,
                    AllergyId: tempName
                }
                API.createJoins(tempObj,token)
                .then(res=>{
                    if (res.status === 200) {
                        setValue(!value)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    return (
        <div className="d-flex flex-column">
            <label className="text-center">{props.label}</label>
            <input type="checkbox" name={props.label} checked={value} data-index={props.label} className="mx-auto" onChange={changeAllergies}></input>
        </div>
    )
}

export default CheckBox