import React, {useState, useEffect} from "react";
import Auth from "../utils/auth";
import API from "../utils/API"

function EditClient (props) {
    const token = Auth.getToken()
    const [firstName, setFirstName] = useState("")
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastName, setLastName] = useState("")
    const [lastNameError, setLastNameError] = useState(false)
    const [street, setStreet] = useState("")
    const [streetError, setStreetError] = useState(false)
    const [city, setCity] = useState("")
    const [cityError, setCityError] = useState(false)
    const [state, setState] = useState("")
    const [stateError, setStateError] = useState(false)
    const [zip, setZip] = useState(0)
    const [zipError, setZipError] = useState(false)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    // eslint-disable-next-line
    const emailVal = /^[A-z0-9_\.-]+@[\dA-z\.-]+\.[A-z\.]{2,6}$/
    const [phone, setPhone] = useState("")
    const [phoneError, setPhoneError] = useState(false)
    const phoneVal = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/
    const zipVal = /^[0-9]{5}[-]?([0-9]{4})?$/
    const [validZip, setValidZip] = useState(false)
    const stateVal = /^([A-z]{2})$/
    const [validState, setValidState] = useState(false)

    useEffect (() => {
        setFirstName(props.client.first_name)
        setLastName(props.client.last_name)
        setStreet(props.client.street)
        setCity(props.client.city)
        setState(props.client.state)
        setZip(props.client.zip)
        setEmail(props.client.email)
        setPhone(props.client.phone)
    // eslint-disable-next-line
    },[])

    const handleInputChange = (e) => {
        if (e.target.name === "firstName") {
            setFirstName(e.target.value)
        }
        if (e.target.name === "lastName") {
            setLastName(e.target.value)
        }
        if (e.target.name === "street") {
            setStreet(e.target.value)
        }
        if (e.target.name === "city") {
            setCity(e.target.value)
        }
        if (e.target.name === "state") {
            setState(e.target.value)
        }
        if (e.target.name === "zip") {
            setZip(e.target.value)
        }
        if (e.target.name === "email") {
            setEmail(e.target.value)
        }
        if (e.target.name === "phone") {
            setPhone(e.target.value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (firstName === "" || firstName === null) {
            setFirstNameError(true)
            return
        }
        if (lastName === "" || lastName === null) {
            setLastNameError(true)
            return
        }
        if (street === "" || street === null) {
            setStreetError(true)
            return
        }
        if (city === "" || city === null) {
            setCityError(true)
            return
        }
        if (state === "" || state === null) {
            setStateError(true)
            return
        }
        if (!stateVal.test(state)) {
            setValidState(true)
            return
        }
        if (zip === "" || zip === null) {
            setZipError(true)
            return
        }
        if (!zipVal.test(zip)) {
            setValidZip(true)
            return
        }
        if (email.length > 0) {
            if (!emailVal.test(email)) {
                setEmailError(true)
                return
            }
        }
        if (phone.length > 0) {
            if (!phoneVal.test(phone)) {
                setPhoneError(true)
                return
            }
        }
        const clientData = {
            id: props.client.id,
            first_name: firstName,
            last_name: lastName,
            street: street,
            city: city,
            state: state,
            zip: zip,
            email: email,
            phone: phone
        }
        API.editClient(clientData,token)
        .then(res=>{
            if (res.status === 200) {
                props.setShowModal(false)
            }
            else {
                console.log(res)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <form className="d-flex flex-column col-12">
            <div className="d-flex flex-row">
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={firstName} onChange={handleInputChange}></input>
                    {firstNameError && (
                        <p className="text-danger mb-0">A First Name is Required</p>
                    )}
                </div>
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={lastName} onChange={handleInputChange}></input>
                    {lastNameError && (
                        <p className="text-danger mb-0">A Last Name is Required</p>
                    )}
                </div>
            </div>
            <div className="d-flex flex-column col-12 px-1 py-2">
                <label>Street</label>
                <input type="text" name="street" value={street} onChange={handleInputChange}></input>
                {streetError && (
                    <p className="text-danger mb-0">A Street is Required</p>
                )}
            </div>
            <div className="d-flex flex-row col-12">
                <div className="d-flex flex-column col-7 px-1 py-2">
                    <label>City</label>
                    <input type="text" name="city" value={city} onChange={handleInputChange}></input>
                    {cityError && (
                        <p className="text-danger mb-0">A City is Required</p>
                    )}
                </div>
                <div className="d-flex flex-column col-1 px-1 py-2">
                    <label>State</label>
                    <input type="text" name="state" value={state} onChange={handleInputChange}></input>
                    {stateError && (
                        <p className="text-danger mb-0">Required</p>
                    )}
                    {validState && (
                        <p className="text-danger mb-0">Invalid</p>
                    )}
                </div>
                <div className="d-flex flex-column col-4 px-1 py-2">
                    <label>Zip Code</label>
                    <input type="text" name="zip" value={zip} onChange={handleInputChange}></input>
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
                    <label>Email</label>
                    <input type="text" name="email" value={email} onChange={handleInputChange}></input>
                    {emailError && (
                        <p className="text-danger mb-0">The Email is Invalid</p>
                    )}
                </div>
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Phone</label>
                    <input type="text" name="phone" value={phone} onChange={handleInputChange}></input>
                    {phoneError && (
                        <p className="text-danger mb-0">The Phone Number is Invalid</p>
                    )}
                </div>
            </div>
            <div className="d-flex col-12 mt-3">
                <button className="bg-primary text-light rounded mx-auto col-3" onClick={handleFormSubmit}>Submit</button>
                <button className="bg-danger text-light rounded mx-auto col-3" onClick={() => props.setDeleteClientPage(true)}>Delete {props.client.first_name} {props.client.last_name}</button>
            </div>
        </form>
    )
}

export default EditClient