import React, {useEffect, useState} from "react";
import "./style.css"
import API from "../utils/API"
import Auth from "../utils/auth"
import Calendar from "../components/Calendar"
import {blue} from '@material-ui/core/colors'

function Appointments (props) {
    const token = Auth.getToken()
    const [resourceData, setResourceData] = useState([])

    useEffect (() => {
        API.getAnimals(token)
        .then(res=>{
            const temp = res.data
            const tempArray = []
            for (let i = 0; i < temp.length; i++) {
                const tempObj = {
                    text: temp[i].name,
                    id: temp[i].id,
                    color: blue
                }
                tempArray.push(tempObj)
                const obj = {
                    fieldName: "AnimalId",
                    title: "Animal",
                    instances: tempArray
                }
                const lastArray = []
                lastArray.push(obj)
                setResourceData(lastArray)
            }
        })
    },[])

    return (
        <div className="zs-appointments d-flex flex-row pt-3">
            <div className="zs-appt-card d-flex flex-column col-11 m-auto rounded">
                <div className="mt-3 mx-auto col-11">
                    <Calendar resourceData={resourceData}/>
                </div>
            </div>
        </div>
    )
}

export default Appointments