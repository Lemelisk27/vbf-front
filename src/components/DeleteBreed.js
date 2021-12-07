import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API";
import ListItems from "./ListItems";

function DeleteBreed (props) {
    const token = Auth.getToken()
    const [firstLoad, setFirstLoad] = useState(true)
    const [breedList, setBreedList] = useState([])
    const [selectBreed, setSelectBreed] = useState("")
    const [newBreed, setNewBreed] = useState("")
    const [breedError, setBreedError] = useState(false)
    const [breed, setBreed] = useState({
        id: 0,
        BreedId: 0,
        SpeciesId: 0
    })

    useEffect(()=>{
        pageLoad()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < breedList.length; i++) {
            if (breedList[i].name === selectBreed) {
                setBreed({
                    ...breed,
                    id: breedList[i].id,
                    SpeciesId: breedList[i].SpeciesId
                })
            }
        }
        // eslint-disable-next-line
    },[selectBreed])

    useEffect(()=>{
        for (let i = 0; i < breedList.length; i++) {
            if (breedList[i].name === newBreed) {
                setBreed({
                    ...breed,
                    BreedId: breedList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[newBreed])

    const pageLoad = () => {
        API.getBreeds(token)
        .then(res=>{
            setBreedList(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowBreedModal(false)
    }

    const handleInputChange = (e) => {
        if (e.target.name === "selectBreed") {
            setSelectBreed(e.target.value)
            setFirstLoad(false)
        }
        if (e.target.name === "newBreed") {
            setNewBreed(e.target.value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (newBreed === "" || newBreed === null) {
            setBreedError(true)
            return
        }
        API.updateAnimalBreed(breed,token)
        .then(res=>{
            console.log(res)
            API.deleteBreed(breed.id,token)
            .then(res=>{
                console.log(res)
                props.setShowBreedModal(false)
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="d-felx flex-column col-12">
            {firstLoad ? (
                <div className="d-flex flex-column col-11 mx-auto px-1 py-2">
                    <label>Select a Breed to Delete</label>
                    <select name="selectBreed" style={{height: "31px"}} value={selectBreed} onChange={handleInputChange}>
                        <option defaultValue="Select a Breed">Select a Breed</option>
                        {breedList.map(item => <ListItems key={item.id} options={item.name}/>)}
                    </select>
                </div>
            ):(
                <div className="d-flex flex-column col-12">
                    <h2 className="text-center">Are you Sure?</h2>
                    <h4 className="text-center">This Will <strong className="text-danger">Permanently</strong> Delete {selectBreed}</h4>
                    <div className="d-flex flex-column">
                        <label>If there are any animals assigned to {selectBreed}, where would you like them re-assigned?</label>
                        <select name="newBreed" style={{height: "31px"}} value={newBreed} onChange={handleInputChange}>
                            <option defaultValue="Select a Breed">Select a Breed</option>
                            {breedList.filter(name=>name.name !== selectBreed).filter(species => species.SpeciesId === breed.SpeciesId).map(item=><ListItems key={item.id} options={item.name}/>)}
                        </select>
                        {breedError && (
                            <p className="text-danger mb-0">A new Breed is Required</p>
                        )}
                    </div>
                </div>
            )}
            <div className="d-flex flex-row col-12 mt-3 justify-content-around">
                {!firstLoad && (
                    <button className="bg-danger text-light rounded col-3" onClick={handleFormSubmit}>Yes</button>
                )}
                <button className="bg-primary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteBreed