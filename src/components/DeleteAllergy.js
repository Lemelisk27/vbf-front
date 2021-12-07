import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API"
import ListItems from "./ListItems";

function DeleteAllergy (props) {
    const token = Auth.getToken()
    const [firstLoad, setFirstLoad] = useState(true)
    const [allergyList, setAllergyList] = useState([])
    const [joinList, setJoinList] = useState([])
    const [deleteJoins, setDeleteJoins] = useState([])
    const [selectAllergy, setSelectAllergy] = useState("")
    const [allergyId, setAllergyId] = useState(0)

    useEffect(()=>{
        pageLoad()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < allergyList.length; i++) {
            if (allergyList[i].alergy_name === selectAllergy) {
                setAllergyId(allergyList[i].id)
                const tempArray = []
                for (let j = 0; j < joinList.length; j++) {
                    if (allergyList[i].id === joinList[j].AllergyId) {
                        tempArray.push(joinList[j].id)
                    }
                }
                setDeleteJoins(tempArray)
            }
        }
        // eslint-disable-next-line
    },[selectAllergy])

    const pageLoad = () => {
        API.getAllergies(token)
        .then(res=>{
            setAllergyList(res.data)
            API.getJoins(token)
            .then(res=>{
                setJoinList(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
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
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        for (let i = 0; i < deleteJoins.length; i++) {
            API.deleteAllergyJoin(deleteJoins[i],token)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        API.deleteAllergy(allergyId,token)
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
                    <label>Select an Allergy to Delete</label>
                    <select name="selectAllergy" style={{height: "31px"}} value={selectAllergy} onChange={handleInputChange}>
                        <option defaultValue="Select an Allergy">Select an Allergy</option>
                        {allergyList.map(item => <ListItems key={item.id} options={item.alergy_name}/>)}
                    </select>
                </div>
            ):(
                <div className="d-flex flex-column col-12">
                    <h2 className="text-center">Are you Sure?</h2>
                    <h4 className="text-center">This Will <strong className="text-danger">Permanently</strong> Delete {selectAllergy}</h4>
                </div>
            )}
            <div className="d-flex flex-row col-12 mt-3 justify-content-around">
                {!firstLoad && (
                    <button className="bg-danger text-light col-3 rounded" onClick={handleFormSubmit}>Yes</button>
                )}
                <button className="bg-primary text-light col-3 rounded" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteAllergy