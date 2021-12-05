import React, {useState, useEffect} from 'react'
import Auth from "../utils/auth"
import API from "../utils/API";
import ListItems from "./ListItems";

function EditCategory (props) {
    const token = Auth.getToken()
    const [firstLoad, setFirstLoad] = useState(true)
    const [selectCategory, setSelectCategory] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [nameError, setNameError] = useState(false)
    const [excludeList, setExcludeList] = useState([])
    const [excludeError, setExcludeError] = useState(false)
    const [updatedCategory, setUpdatedCategory] = useState({
        id: 0,
        category_name: ""
    })

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < categoryList.length; i++) {
            if (categoryList[i].category_name === selectCategory) {
                setUpdatedCategory({
                    ...updatedCategory,
                    id: categoryList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[selectCategory])

    const loadPage = () => {
        API.getInventoryCategories(token)
        .then(res=>{
            setCategoryList(res.data)
            const tempArray = []
            for (let i = 0; i < res.data.length; i++) {
                tempArray.push(res.data[i].category_name)
            }
            setExcludeList(tempArray)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const categorySelect = (e) => {
        if (e.target.name === "selectCategory") {
            setSelectCategory(e.target.value)
            setUpdatedCategory({
                ...updatedCategory,
                category_name: e.target.value
            })
            setFirstLoad(false)
        }
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowCategoryModal(false)
    }

    const handleInputChange = (e) => {
        if (e.target.name === "name") {
            setUpdatedCategory({
                ...updatedCategory,
                category_name: e.target.value
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        resetErrors()
        if (updatedCategory.category_name === "" || updatedCategory.category_name === null) {
            setNameError(true)
            return
        }
        if (excludeList.includes(updatedCategory.category_name)) {
            setExcludeError(true)
            return
        }
        API.updateInventoryCategory(updatedCategory,token)
        .then(res=>{
            console.log(res)
            props.setShowCategoryModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const resetErrors = () => {
        setNameError(false)
        setExcludeError(false)
    }

    return (
        <div className="d-flex flex-column col-12">
            {firstLoad ? (
                <div className="d-flex flex-column col-11 px-1 py-2 mx-auto">
                    <label>Which Catagory do you Want to Edit?</label>
                    <select name="selectCategory" style={{height: "31px"}} value={selectCategory} onChange={categorySelect}>
                        <option defaultValue="Select a Category">Select a Category</option>
                        {categoryList.map(item=><ListItems key={item.id} options={item.category_name}/>)}
                    </select>
                </div>
            ):(
                <div className="d-flex flex-column col-12">
                    <div className="d-flex flex-column col-12 px-1 py-2">
                        <label>What do you want to change {selectCategory} to?</label>
                        <input type="text" name="name" value={updatedCategory.category_name} onChange={handleInputChange}></input>
                        {nameError && (
                            <p className="text-danger mb-0">A Category is Required</p>
                        )}
                        {excludeError && (
                            <p className="text-danger mb-0">That Category is Already Being Used</p>
                        )}
                    </div>
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

export default EditCategory