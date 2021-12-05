import React, {useState, useEffect} from 'react'
import Auth from "../utils/auth"
import API from "../utils/API"

function AddCategory (props) {
    const token = Auth.getToken()
    const [category, setCategory] = useState("")
    const [existingCategories, setExistingCategories] = useState([])
    const [blankError, setBlankError] = useState(false)
    const [usedError, setUsedError] = useState(false)

    useEffect(()=>{
        pageLoad()
        // eslint-disable-next-line
    },[])

    const pageLoad = () => {
        API.getInventoryCategories(token)
        .then(res=>{
            const tempArray = []
            for (let i = 0; i < res.data.length; i++) {
                tempArray.push(res.data[i].category_name)
            }
            setExistingCategories(tempArray)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowCategoryModal(false)
    }

    const handleInputChange = (e) => {
        if (e.target.name === "category") {
            setCategory(e.target.value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        resetErrors()
        if (category === "" || category === null) {
            setBlankError(true)
            return
        }
        if (existingCategories.includes(category)) {
            setUsedError(true)
            return
        }
        const tempObj = {
            category_name: category,
            ClinicId: 1
        }
        API.createInventoryCategory(tempObj,token)
        .then(res=>{
            console.log(res)
            props.setShowCategoryModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const resetErrors = () => {
        setBlankError(false)
        setUsedError(false)
    }

    return (
        <div className="d-flex flex-column col-12">
            <div className="d-flex flex-column col-12">
                <label>What's the Name of the new Category?</label>
                <input type="text" name="category" value={category} onChange={handleInputChange}></input>
                {blankError && (
                    <p className="text-danger mb-0">A Category is Required</p>
                )}
                {usedError && (
                    <p className="text-danger mb-0">That Category is Already in use</p>
                )}
            </div>
            <div className="d-flex flex-row col-12 justify-content-around mt-3">
                <button className="bg-primary text-light col-3 rounded" onClick={handleFormSubmit}>Submit</button>
                <button className="bg-primary text-light col-3 rounded" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default AddCategory