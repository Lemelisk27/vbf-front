import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API";
import ListItems from "./ListItems";

function EditUser (props) {
    const token = Auth.getToken()
    const [userList, setUserList] = useState([])
    const [disableList, setDisableList] = useState(false)
    const [selectUser, setSelectUser] = useState("")
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [streetError, setStreetError] = useState(false)
    const [cityError, setCityError] = useState(false)
    const [zipError, setZipError] = useState(false)
    const zipVal = /^[0-9]{5}[-]?([0-9]{4})?$/
    const [validZip, setValidZip] = useState(false)
    const [stateError, setStateError] = useState(false)
    const stateVal = /^([A-z]{2})$/
    const [validState, setValidState] = useState(false)
    const [emailError, setEmailError] = useState(false)
    // eslint-disable-next-line
    const emailVal = /^[A-z0-9_\.-]+@[\dA-z\.-]+\.[A-z\.]{2,6}$/
    const [phoneError, setPhoneError] = useState(false)
    const phoneVal = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/
    const [userRoleList, setUserRoleList] = useState([])
    const [userRole, setUserRole] = useState("")
    const [roleError, setRoleError] = useState(false)
    const [user, setUser] = useState({
        id: 0,
        first_name: "",
        last_name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        phone: '',
        RoleId: 0,
        admin: false
    })

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

    const loadPage = () => {
        API.getAllUsers(token)
        .then(res=>{
            setUserList(res.data)
            API.getRoles(token)
            .then(res=>{
                setUserRoleList(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const userChange = (e) => {
        if (e.target.name === "selectUser") {
            setSelectUser(e.target.value)
            for (let i = 0; i < userList.length; i++) {
                if (userList[i].full_name === e.target.value) {
                    setDisableList(true)
                    setUser({
                        ...user,
                        id: userList[i].id,
                        first_name: userList[i].first_name,
                        last_name: userList[i].last_name,
                        street: userList[i].street,
                        city: userList[i].city,
                        state: userList[i].state,
                        zip: userList[i].zip,
                        email: userList[i].email,
                        phone: userList[i].phone,
                        RoleId: userList[i].RoleId,
                        admin: userList[i].admin
                    })
                    for (let j = 0; j < userRoleList.length; j++) {
                        if (userRoleList[j].id === userList[i].RoleId) {
                            setUserRole(userRoleList[j].title)
                        }
                    }
                }
            }
        }
    }

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowUserModal(false)
    }

    useEffect (()=>{
        for (let i = 0; i < userRoleList.length; i++) {
            if (userRoleList[i].title === userRole) {
                setUser({
                    ...user,
                    RoleId: userRoleList[i].id
                })
            }
        }
        // eslint-disable-next-line
    },[userRole])

    const handleInputChange = (e) => {
        if (e.target.name === "first_name") {
            setUser({
                ...user,
                first_name: e.target.value
            })
        }
        if (e.target.name === "last_name") {
            setUser({
                ...user,
                last_name: e.target.value
            })
        }
        if (e.target.name === "street") {
            setUser({
                ...user,
                street: e.target.value
            })
        }
        if (e.target.name === "city") {
            setUser({
                ...user,
                city: e.target.value
            })
        }
        if (e.target.name === "state") {
            setUser({
                ...user,
                state: e.target.value
            })
        }
        if (e.target.name === "zip") {
            setUser({
                ...user,
                zip: e.target.value
            })
        }
        if (e.target.name === "email") {
            setUser({
                ...user,
                email: e.target.value
            })
        }
        if (e.target.name === "phone") {
            setUser({
                ...user,
                phone: e.target.value
            })
        }
        if (e.target.name === "userRole") {
            setUserRole(e.target.value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        resetErrors()
        if (user.first_name === "" || user.first_name === null) {
            setFirstNameError(true)
        }
        if (user.last_name === "" || user.last_name === null) {
            setLastNameError(true)
        }
        if (user.street === "" || user.street === null) {
            setStreetError(true)
        }
        if (user.city === "" || user.city === null) {
            setCityError(true)
        }
        if (user.state === "" || user.state === null) {
            setStateError(true)
            return
        }
        if (!stateVal.test(user.state)) {
            setValidState(true)
            return
        }
        if (user.zip === "" || user.zip === null) {
            setZipError(true)
            return
        }
        if (!zipVal.test(user.zip)) {
            setValidZip(true)
            return
        }
        if (user.email) {
            if (user.email.length > 0) {
                if (!emailVal.test(user.email)) {
                    setEmailError(true)
                    return
                }
            }
        }
        if (user.phone) {
            if (user.phone.length > 0) {
                if (!phoneVal.test(user.phone)) {
                    setPhoneError(true)
                    return
                }
            }
        }
        if (userRole === "" || userRole === null) {
            setRoleError(true)
            return
        }
        API.updateUser(user,token)
        .then(res=>{
            console.log(res)
            props.setShowUserModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
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
        setRoleError(false)
    }

    return (
        <div className="d-flex flex-column col-12">
            {!disableList && (
                <div className="d-flex flex-column col-11 px-1 py-2 mx-auto">
                    <label>Select a User to Edit</label>
                    <select name="selectUser" onChange={userChange} value={selectUser} style={{height: "31px"}}>
                        <option defaultValue="Select a user">Select a User</option>
                        {userList.map(item=><ListItems key={item.id} options={item.full_name}/>)}
                    </select>
                </div>
            )}
            {disableList && (
                <form>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column col-6 px-1 py-2">
                            <label>First Name</label>
                            <input type="text" name="first_name" value={user.first_name} onChange={handleInputChange}></input>
                            {firstNameError && (
                                <p className="text-danger mb-0">A First Name is Required</p>
                            )}
                        </div>
                        <div className="d-flex flex-column col-6 px-1 py-2">
                            <label>Last Name</label>
                            <input type="text" name="last_name" value={user.last_name} onChange={handleInputChange}></input>
                            {lastNameError && (
                                <p className="text-danger mb-0">A Last Name is Required</p>
                            )}
                        </div>
                    </div>
                    <div className="d-felx flex-column">
                        <div className="d-flex flex-column col-12 px-1 py-2">
                            <label>Street</label>
                            <input type="text" name="street" value={user.street} onChange={handleInputChange}></input>
                            {streetError && (
                                <p className="text-danger mb-0">A Street is Required</p>
                            )}
                        </div>
                        <div className="d-flex flex-row col-12">
                            <div className="d-flex flex-column col-7 px-1 py-2">
                                <label>City</label>
                                <input type="text" name="city" value={user.city} onChange={handleInputChange}></input>
                                {cityError && (
                                    <p className="text-danger mb-0">A City is Required</p>
                                )}
                            </div>
                            <div className="d-flex flex-column col-1 px-1 py-2">
                                <label>State</label>
                                <input type="text" name="state" value={user.state} onChange={handleInputChange}></input>
                                {stateError && (
                                    <p className="text-danger mb-0">Required</p>
                                )}
                                {validState && (
                                    <p className="text-danger mb-0">Invalid</p>
                                )}
                            </div>
                            <div className="d-flex flex-column col-4 px-1 py-2">
                                <label>Zip Code</label>
                                <input type="text" name="zip" value={user.zip} onChange={handleInputChange}></input>
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
                                <input type="text" name="email" value={user.email} onChange={handleInputChange}></input>
                                {emailError && (
                                    <p className="text-danger mb-0">The Email is Invalid</p>
                                )}
                            </div>
                            <div className="d-flex flex-column col-6 px-1 py-2">
                                <label>Phone Number (optional)</label>
                                <input type="text" name="phone" value={user.phone} onChange={handleInputChange}></input>
                                {phoneError && (
                                    <p className="text-danger mb-0">The Phone Number is Invalid</p>
                                )}
                            </div>
                        </div>
                        <div className="d-flex flex-row col-12 justify-content-around">
                            <div className="d-flex flex-column col-6 px-1 py-2">
                                <label>Please Select a Role</label>
                                <select name="userRole" onChange={handleInputChange} value={userRole} style={{height: "31px"}}>
                                    <option defaultValue={userRole}>{userRole}</option>
                                    {userRoleList.filter(name=> name.title !== userRole).map(item=><ListItems key={item.id} options={item.title}/>)}
                                </select>
                                {roleError && (
                                    <p className="text-danger mb-0">A Role is Required</p>
                                )}
                            </div>
                            <div className="d-flex flex-column col-2 text-center align-self-center">
                                <label>Administrator</label>
                                <input type="checkbox" name="admin" checked={user.admin} className="mx-auto" onChange={() => setUser({...user,admin: !user.admin})}></input>
                            </div>
                        </div>
                    </div>
                </form>
            )}
            <div className="d-flex flex-row justify-content-around mt-3">
                {disableList && (
                    <button className="bg-primary text-light col-3" onClick={handleFormSubmit}>Submit</button>
                )}
                <button className="bg-primary text-light col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default EditUser