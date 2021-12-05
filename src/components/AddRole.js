import React, {useState} from "react";
import API from "../utils/API";
import Auth from "../utils/auth"

function AddRole (props) {
    const token = Auth.getToken()
    const [roleError, setRoleError] = useState(false)
    const [newRole, setNewRole] = useState({
        title: ""
    })

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowRoleModal(false)
    }

    const handleInputChange = (e) => {
        if (e.target.name === "role") {
            setNewRole({
                ...newRole,
                title: e.target.value
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        resetErrors()
        if (newRole.title === "" || newRole.title === null) {
            setRoleError(true)
            return
        }
        API.addRole(newRole,token)
        .then(res=>{
            console.log(res)
            props.setShowRoleModal(false)
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
            <div className="d-flex flex-column col-12">
                <label>What is the Name of the New Role?</label>
                <input type="text" name="role" value={newRole.title} onChange={handleInputChange}></input>
                {roleError && (
                    <p className="text-danger mb-0">A Role is Required</p>
                )}
            </div>
            <div className="d-flex flex-row col-12 justify-content-around mt-3">
                <button className="bg-primary text-light rounded col-3" onClick={handleFormSubmit}>Submit</button>
                <button className="bg-primary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default AddRole