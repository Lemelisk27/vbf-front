import React, {useState, useEffect} from 'react'
import Auth from "../utils/auth"
import API from "../utils/API"
import ListItems from "./ListItems";

function DeleteCategory (props) {
    const token = Auth.getToken()
    const [firstLoad, setFirstLoad] = useState(true)
    const [categoryList, setCategoryList] = useState([])
    const [selectCategory, setSelectCategory] = useState("")
    const [newCategory, setNewCategory] = useState("")
    const [newError, setNewError] = useState(false)
    const [deleteData, setDeleteData] = useState({
        id: 0,
        newId: 0
    })

    useEffect(()=>{
        pageLoad()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < categoryList.length; i++) {
            if (categoryList[i].category_name === selectCategory) {
                setDeleteData({
                    ...deleteData,
                    id: categoryList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[selectCategory])

    useEffect(()=>{
        for (let i = 0; i < categoryList.length; i++) {
            if (categoryList[i].category_name === newCategory) {
                setDeleteData({
                    ...deleteData,
                    newId: categoryList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[newCategory])

    const pageLoad = () => {
        API.getInventoryCategories(token)
        .then(res=>{
            setCategoryList(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const selectedChange = (e) => {
        if (e.target.name === "selectCategory") {
            setSelectCategory(e.target.value)
            setFirstLoad(false)
        }
        if (e.target.name === "newCategory") {
            setNewCategory(e.target.value)
        }
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowCategoryModal(false)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (newCategory === "" || newCategory === null) {
            setNewError(true)
            return
        }
        API.updateItemCategory(deleteData,token)
        .then(res=>{
            console.log(res)
            API.deleteCategory(deleteData.id,token)
            .then(res=>{
                console.log(res)
                props.setShowCategoryModal(false)
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
        <div className="d-flex flex-column col-12">
            {firstLoad ? (
                <div className="d-flex flex-column col-11 mx-auto px-1 py-2">
                    <label>Select a Cateogry to Delete</label>
                    <select name="selectCategory" style={{height: "31px"}} value={selectCategory} onChange={selectedChange}>
                        <option defaultValue="Select a Category">Select a Category</option>
                        {categoryList.map(item => <ListItems key={item.id} options={item.category_name}/>)}
                    </select>
                </div>
            ):(
                <div className="d-flex flex-column col-12">
                    <h2 className="text-center">Are you Sure?</h2>
                    <h4 className="text-center">This Will <strong className="text-danger">Permanently</strong> Delete {selectCategory}</h4>
                    <label>If there are any items assigned to {selectCategory}, where do you want to re-assign them?</label>
                    <select name="newCategory" style={{height: "31px"}} value={newCategory} onChange={selectedChange}>
                        <option defaultValue="Select a Category">Select a Category</option>
                        {categoryList.filter(name => name.category_name !== selectCategory).map(item => <ListItems key={item.id} options={item.category_name}/>)}
                    </select>
                    {newError && (
                        <p className="text-danger mb-0">A new Category is Required</p>
                    )}
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

export default DeleteCategory