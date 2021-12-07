import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API"
import ListItems from "./ListItems";

function EditAllergy (props) {
    const token = Auth.getToken()
    const [firstLoad, setFirstLoad] = useState(true)
    const [allergyList, setAllergyList] = useState([])
    const [useList, setUseList] = useState([])
    const [selectAllergy, setSelectAllergy] = useState("")
    const [nameError, setNameError] = useState(false)
    const [useError, setUseError] = useState(false)
    const [allergy, setAllergy] = useState({
        id: 0,
        alergy_name: ""
    })

    useEffect(()=>{
        pageLoad()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < allergyList.length; i++) {
            if (allergyList[i].alergy_name === selectAllergy) {
                setAllergy({
                    ...allergy,
                    id: allergyList[i].id,
                    alergy_name: allergyList[i].alergy_name
                })
            }
        }
        // eslint-disable-next-line
    },[selectAllergy])

    const pageLoad = () => {
        API.getAllergies(token)
        .then(res=>{
            setAllergyList(res.data)
            const tempArray = []
            for (let i = 0; i < res.data.length; i++) {
                tempArray.push(res.data[i].alergy_name)
            }
            setUseList(tempArray)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleInputChange = (e) => {
        if (e.target.name === "selectAllergy") {
            setSelectAllergy(e.target.value)
            setFirstLoad(false)
        }
        if (e.target.name === "alergy_name") {
            setAllergy({
                ...allergy,
                alergy_name: e.target.value
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setNameError(false)
        setUseError(false)
        if (allergy.alergy_name === "" || allergy.alergy_name === null) {
            setNameError(true)
            return
        }
        if (useList.includes(allergy.alergy_name)) {
            setUseError(true)
            return
        }
        API.editAllergy(allergy,token)
        .then(res=>{
            console.log(res)
            props.setShowAllergyModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowAllergyModal(false)
    }

    return (
        <div className="d-flex flex-column col-12">
            {firstLoad ? (
                <div className="d-flex flex-column col-11 mx-auto px-1 py-2">
                    <lable>Select an Allergy to Edit</lable>
                    <select name="selectAllergy" style={{height: "31px"}} value={selectAllergy} onChange={handleInputChange}>
                        <option defaultValue="Select an Allergy">Select an Allergy</option>
                        {allergyList.map(item => <ListItems key={item.id} options={item.alergy_name}/>)}
                    </select>
                </div>
            ):(
                <div className="d-flex flex-column col-12 px-1 py-2">
                    <lable>Enter a Name</lable>
                    <input type="text" name="alergy_name" value={allergy.alergy_name} onChange={handleInputChange}></input>
                    {nameError && (
                        <p className="text-danger mb-0">A Name is Required</p>
                    )}
                    {useError && (
                        <p className="text-danger mb-0">That Name is Already in Use</p>
                    )}
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

export default EditAllergy