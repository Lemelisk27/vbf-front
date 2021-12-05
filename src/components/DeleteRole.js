import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API"
import ListItems from "./ListItems";

function DeleteRole (props) {
    const token = Auth.getToken()
    const [firstLoad, setFirstLoad] = useState(true)
    const [selectedRole, setSelectedRole] = useState("")
    const [roleList, setRoleList] = useState([])
    const [roleId, setRoleId] = useState(0)
    const [newRole, setNewRole] = useState("")
    const [newRoleId, setNewRoleId] = useState(0)
    const [roleError, setRoleError] = useState(false)

    useEffect(()=>{
        pageLoad()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < roleList.length; i++) {
            if (roleList[i].title === selectedRole) {
                setRoleId(roleList[i].id)
            }
        }
        // eslint-disable-next-line
    },[selectedRole])

    useEffect(()=>{
        for (let i = 0; i < roleList.length; i++) {
            if (roleList[i].title === newRole) {
                setNewRoleId(roleList[i].id)
            }
        }
        // eslint-disable-next-line
    },[newRole])

    const pageLoad = () => {
        API.getRoles(token)
        .then(res=>{
            setRoleList(res.data)
        })
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowRoleModal(false)
    }

    const roleChange = (e) => {
        if (e.target.name === "selectedRole") {
            setSelectedRole(e.target.value)
            setFirstLoad(false)
        }
        if (e.target.name === "newRole") {
            setNewRole(e.target.value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        resetErrors()
        if (newRole === "" || newRole === null || newRole === "Select a Role") {
            setRoleError(true)
        }
        const tempObj = {
            id: roleId,
            newId: newRoleId
        }
        API.updateUserRoles(tempObj,token)
        .then(res=>{
            console.log(res)
            API.deleteRole(tempObj.id,token)
            .then(res=>{
                console.log(res)
                props.setShowRoleModal(false)
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const resetErrors = () => {
        setRoleError(false)
    }

    return (
        <div className="d-flex flex-column col-12">
            {firstLoad ? (
                <div className="d-flex flex-column col-11 mx-auto px-1 py-2">
                    <label>Select a Role to Delete</label>
                    <select name="selectedRole" style={{height: "31px"}} value={selectedRole} onChange={roleChange}>
                        <option defaultValue="Select a Role">Select a Role</option>
                        {roleList.map(item=><ListItems key={item.id} options={item.title}/>)}
                    </select>
                </div>
            ):(
                <div className="d-flex flex-column col-12">
                    <h2 className="text-center">Are you Sure?</h2>
                    <h4 className="text-center">This Will <strong className="text-danger">Permanently</strong> Delete {selectedRole}</h4>
                    <div className="d-flex flex-column">
                        <label>If there are any users assigned to {selectedRole}, where would you like them re-assigned?</label>
                        <select name="newRole" style={{height: "31px"}} value={newRole} onChange={roleChange}>
                            <option defaultValue="Select a Role">Select a Role</option>
                            {roleList.filter(name=>name.title !== selectedRole).map(item=><ListItems key={item.id} options={item.title}/>)}
                        </select>
                        {roleError && (
                            <p className="text-danger mb-0">A new Role is Required</p>
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

export default DeleteRole