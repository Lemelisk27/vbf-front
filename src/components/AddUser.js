import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API"
import ListItems from "./ListItems";

function AddUser (props) {
    const token = Auth.getToken()
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [streetError, setStreetError] = useState(false)
    const [cityError, setCityError] = useState(false)
    const [stateError, setStateError] = useState(false)
    const stateVal = /^([A-z]{2})$/
    const [validState, setValidState] = useState(false)
    const [zipError, setZipError] = useState(false)
    const zipVal = /^[0-9]{5}[-]?([0-9]{4})?$/
    const [validZip, setValidZip] = useState(false)
    const [emailError, setEmailError] = useState(false)
    // eslint-disable-next-line
    const emailVal = /^[A-z0-9_\.-]+@[\dA-z\.-]+\.[A-z\.]{2,6}$/
    const [phoneError, setPhoneError] = useState(false)
    const phoneVal = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/
    const [userNameError, setUserNameError] = useState(false)
    const [existingUsers, setExistingUsers] = useState([])
    const [existError, setExistError] = useState(false)
    const [userRoles, setUserRoles] = useState([])
    const [newRole, setNewRole] = useState("")
    const [roleError, setRoleError] = useState(false)
    const [newUser, setNewUser] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "password",
        street: "",
        city: "",
        state: "",
        zip: "",
        RoleId: 0,
        ClinicId: 1,
        admin: false
    })

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        for (let i = 0; i < userRoles.length; i++) {
            if (userRoles[i].title === newRole) {
                setNewUser({
                    ...newUser,
                    RoleId: userRoles[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[newRole])

    const loadPage = () => {
        API.getAllUsers(token)
        .then(res=>{
            const tempArray = []
            for (let i = 0; i < res.data.length; i++) {
                tempArray.push(res.data[i].username)
            }
            setExistingUsers(tempArray)
            API.getRoles(token)
            .then(res=>{
                setUserRoles(res.data)
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
        if (e.target.name === "first_name") {
            setNewUser({
                ...newUser,
                first_name: e.target.value
            })
        }
        if (e.target.name === "last_name") {
            setNewUser({
                ...newUser,
                last_name: e.target.value
            })
        }
        if (e.target.name === "street") {
            setNewUser({
                ...newUser,
                street: e.target.value
            })
        }
        if (e.target.name === "city") {
            setNewUser({
                ...newUser,
                city: e.target.value
            })
        }
        if (e.target.name === "state") {
            setNewUser({
                ...newUser,
                state: e.target.value
            })
        }
        if (e.target.name === "zip") {
            setNewUser({
                ...newUser,
                zip: e.target.value
            })
        }
        if (e.target.name === "email") {
            setNewUser({
                ...newUser,
                email: e.target.value
            })
        }
        if (e.target.name === "phone") {
            setNewUser({
                ...newUser,
                phone: e.target.value
            })
        }
        if (e.target.name === "username") {
            setNewUser({
                ...newUser,
                username: e.target.value
            })
        }
        if (e.target.name === "newRole") {
            setNewRole(e.target.value)
        }
    }

    const resetErrors = () => {
        setFirstNameError(false)
        setLastNameError(false)
        setStreetError(false)
        setCityError(false)
        setStateError(false)
        setValidState(false)
        setZipError(false)
        setValidZip(false)
        setEmailError(false)
        setPhoneError(false)
        setUserNameError(false)
        setExistError(false)
        setRoleError(false)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        resetErrors()
        if (newUser.first_name === "" || newUser.first_name === null) {
            setFirstNameError(true)
            return
        }
        if (newUser.last_name === "" || newUser.last_name === null) {
            setLastNameError(true)
            return
        }
        if (newUser.street === "" || newUser.street === null) {
            setStreetError(true)
            return
        }
        if (newUser.city === "" || newUser.city === null) {
            setCityError(true)
            return
        }
        if (newUser.state === "" || newUser.state === null) {
            setStateError(true)
            return
        }
        if (!stateVal.test(newUser.state)) {
            setValidState(true)
            return
        }
        if (newUser.zip === "" || newUser.zip === null) {
            setZipError(true)
            return
        }
        if (!zipVal.test(newUser.zip)) {
            setValidZip(true)
            return
        }
        if (newUser.email) {
            if (newUser.email.length > 0) {
                if (!emailVal.test(newUser.email)) {
                    setEmailError(true)
                    return
                }
            }
        }
        if (newUser.phone) {
            if (newUser.phone.length > 0) {
                if (!phoneVal.test(newUser.phone)) {
                    setPhoneError(true)
                    return
                }
            }
        }
        if (newUser.username === "" || newUser.username === null) {
            setUserNameError(true)
            return
        }
        if (existingUsers.includes(newUser.username)) {
            setExistError(true)
            return
        }
        if (newRole === "" || newRole === null || newRole === "Select a Role") {
            setRoleError(true)
            return
        }
        console.log(newUser)
        API.createUser(newUser,token)
        .then(res=>{
            console.log(res)
            props.setShowUserModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowUserModal(false)
    }

    return (
        <form className="d-flex flex-column col-12">
            <div className="d-flex flex-row">
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>First Name</label>
                    <input type="text" name="first_name" value={newUser.first_name} onChange={handleInputChange}></input>
                    {firstNameError && (
                        <p className="text-danger mb-0">A First Name is Required</p>
                    )}
                </div>
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Last Name</label>
                    <input type="text" name="last_name" value={newUser.last_name} onChange={handleInputChange}></input>
                    {lastNameError && (
                        <p className="text-danger mb-0">A Last Name is Required</p>
                    )}
                </div>
            </div>
            <div className="d-flex flex-column col-12 px-1 py-2">
                    <label>Street</label>
                    <input type="text" name="street" value={newUser.street} onChange={handleInputChange}></input>
                    {streetError && (
                        <p className="text-danger mb-0">A Street is Required</p>
                    )}
            </div>
            <div className="d-flex flex-row col-12">
                <div className="d-flex flex-column col-7 px-1 py-2">
                    <label>City</label>
                    <input type="text" name="city" value={newUser.city} onChange={handleInputChange}></input>
                    {cityError && (
                        <p className="text-danger mb-0">A City is Required</p>
                    )}
                </div>
                <div className="d-flex flex-column col-1 px-1 py-2">
                    <label>State</label>
                    <input type="text" name="state" value={newUser.state} onChange={handleInputChange}></input>
                    {stateError && (
                        <p className="text-danger mb-0">Required</p>
                    )}
                    {validState && (
                        <p className="text-danger mb-0">Invalid</p>
                    )}
                </div>
                <div className="d-flex flex-column col-4 px-1 py-2">
                    <label>Zip Code</label>
                    <input type="text" name="zip" value={newUser.zip} onChange={handleInputChange}></input>
                    {zipError && (
                        <p className="text-danger mb-0">A Zip Code is Required</p>
                    )}
                    {validZip && (
                        <p className="text-danger mb-0">The Zip Code is Invalid</p>
                    )}
                </div>
            </div>
            <div className="d-flex flex-row col-12">
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Email (optional)</label>
                    <input type="text" name="email" value={newUser.email} onChange={handleInputChange}></input>
                    {emailError && (
                        <p className="text-danger mb-0">The Email is Invalid</p>
                    )}
                </div>
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Phone Number (optional)</label>
                    <input type="text" name="phone" value={newUser.phone} onChange={handleInputChange}></input>
                    {phoneError && (
                        <p className="text-danger mb-0">The Phone Number is Invalid</p>
                    )}
                </div>
            </div>
            <div className="d-flex flex-row col-12">
                <div className="d-flex flex-column col-5 px-1 py-2">
                    <label>Username</label>
                    <input type="text" name="username" value={newUser.username} onChange={handleInputChange}></input>
                    {userNameError && (
                        <p className="text-danger mb-0">A Username is Required</p>
                    )}
                    {existError && (
                        <p className="text-danger mb-0">That Username is Already in Use</p>
                    )}
                </div>
                <div className="d-flex flex-column col-5 px-1 py-2">
                    <label>Please Select a Role</label>
                    <select name="newRole" onChange={handleInputChange} value={newRole} style={{height: "31px"}}>
                        <option defaultValue="Select a Role">Select a Role</option>
                        {userRoles.map(item=><ListItems key={item.id} options={item.title}/>)}
                    </select>
                    {roleError && (
                        <p className="text-danger mb-0">A Role is Required</p>
                    )}
                </div>
                <div className="d-flex flex-column col-2 text-center align-self-center">
                    <label>Administrator</label>
                    <input type="checkbox" name="admin" checked={newUser.admin} className="mx-auto" onChange={() => setNewUser({...newUser,admin: !newUser.admin})}></input>
                </div>
            </div>
            <div className="d-flex flex-row col-12 mt-3 justify-content-around">
                <button className="bg-primary text-light rounded col-3" onClick={handleFormSubmit}>Submit</button>
                <button className="bg-primary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </form>
    )
}

export default AddUser