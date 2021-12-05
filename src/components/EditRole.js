import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API"
import ListItems from "./ListItems";

function EditRole (props) {
    const token = Auth.getToken()
    const [firstLoad, setFirstLoad] = useState(true)
    const [selectedRole, setSelectedRole] = useState("")
    const [roleList, setRoleList] = useState([])
    const [roleError, setRoleError] = useState(false)
    const [updateRole, setUpdateRole] = useState({
        id: 0,
        title: ""
    })

    useEffect(()=>{
        pageLoad()
        // eslint-disable-next-line
    },[])

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowRoleModal(false)
    }

    const changeRole = (e) => {
        if (e.target.name === "selectedRole") {
            setSelectedRole(e.target.value)
            setUpdateRole({
                ...updateRole,
                title: e.target.value
            })
            setFirstLoad(false)
        }
    }

    useEffect(()=>{
        for (let i = 0; i < roleList.length; i++) {
            if (roleList[i].title === selectedRole) {
                setUpdateRole({
                    ...updateRole,
                    id: roleList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[selectedRole])

    const pageLoad = () => {
        API.getRoles(token)
        .then(res=>{
            setRoleList(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleInputChange = (e) => {
        if (e.target.name === "updateRole") {
            setUpdateRole({
                ...updateRole,
                title: e.target.value
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (updateRole.title === "" || updateRole.title === null || updateRole.title === "Select A Role") {
            setRoleError(true)
            return
        }
        API.updateRole(updateRole,token)
        .then(res=>{
            console.log(res)
            props.setShowRoleModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="d-flex flex-column col-12">
            {firstLoad ? (
                <div className="d-flex flex-column col-11 mx-auto px-1 py-2">
                    <label>Select a Role to Edit</label>
                    <select name="selectedRole" style={{height: "31px"}} value={selectedRole} onChange={changeRole}>
                        <option defaultValue="Select A Role">Select a Role</option>
                        {roleList.map(item=><ListItems key={item.id} options={item.title}/>)}
                    </select>
                </div>
            ):(
                <div className="d-flex flex-column col-12">
                    <label>What Would you Like to Change {selectedRole} to?</label>
                    <input type="text" name="updateRole" value={updateRole.title} onChange={handleInputChange}></input>
                    {roleError && (
                        <p className="text-danger mb-0">A Role is Required</p>
                    )}
                </div>
            )}
            <div className="d-flex flex-row col-12 justify-content-around mt-3">
                {!firstLoad && (
                    <button className="bg-primary text-light rounded col-3" onClick={handleFormSubmit}>Submit</button>
                )}
                <button className="bg-primary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default EditRole