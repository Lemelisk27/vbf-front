import React, {useState} from "react"
import Auth from "../utils/auth"
import API from "../utils/API"

function AddClient (props) {
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
    const [zip, setZip] = useState("")
    const [zipError, setZipError] = useState(false)
    // eslint-disable-next-line
    const emailVal = /^[A-z0-9_\.-]+@[\dA-z\.-]+\.[A-z\.]{2,6}$/
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const phoneVal = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/
    const [phone, setPhone] = useState("")
    const [phoneError, setPhoneError] = useState(false)
    const zipVal = /^[0-9]{5}[-]?([0-9]{4})?$/
    const [validZip, setValidZip] = useState(false)
    const token = Auth.getToken()

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
            first_name: firstName,
            last_name: lastName,
            street: street,
            city: city,
            state: state,
            zip: zip,
            email: email,
            phone: phone
        }
        API.addClient(clientData, token)
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
        <form className="d-flex flex-row flex-wrap" onSubmit={handleFormSubmit}>
            <div className="d-flex flex-column px-1 py-2 col-6">
                <label>First Name</label>
                <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={handleInputChange}></input>
                {firstNameError && (
                    <>
                    <p className="text-danger mb-0">First Name Required</p>
                    </>
                )}
            </div>
            <div className="d-flex flex-column px-1 py-2 col-6">
                <label>Last Name</label>
                <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={handleInputChange}></input>
                {lastNameError && (
                    <>
                    <p className="text-danger mb-0">Last Name Required</p>
                    </>
                )}
            </div>
            <div className="d-flex flex-column px-1 py-2 col-12">
                <label>Street</label>
                <input type="text" name="street" placeholder="Street" value={street} onChange={handleInputChange}></input>
                {streetError && (
                    <>
                    <p className="text-danger mb-0">A Street is Required</p>
                    </>
                )}
            </div>
            <div className="d-flex flex-column px-1 py-2 col-6">
                <label>City</label>
                <input type="text" name="city" placeholder="City" value={city} onChange={handleInputChange}></input>
                {cityError && (
                    <>
                    <p className="text-danger mb-0">A City is Required</p>
                    </>
                )}
            </div>
            <div className="d-flex flex-column px-1 py-2 col-2">
                <label>State</label>
                <input type="text" name="state" placeholder="State" value={state} onChange={handleInputChange}></input>
                {stateError && (
                    <>
                    <p className="text-danger mb-0">State Required</p>
                    </>
                )}
            </div>
            <div className="d-flex flex-column px-1 py-2 col-4">
                <label>Zip Code</label>
                <input type="text" name="zip" placeholder="Zip Code" value={zip} onChange={handleInputChange}></input>
                {zipError && (
                    <>
                    <p className="text-danger mb-0">A Zip Code is Required</p>
                    </>
                )}
                {validZip && (
                    <p className="text-danger mb-0">The Zip Code is Invalid</p>
                )}
            </div>
            <div className="d-flex flex-column px-1 py-2 col-6">
                <label>Email</label>
                <input type="text" name="email" placeholder="Email" value={email} onChange={handleInputChange}></input>
                {emailError && (
                    <>
                    <p className="text-danger mb-0">The Email is Invalid</p>
                    </>
                )}
            </div>
            <div className="d-flex flex-column px-1 py-2 col-6">
                <label>Phone Number</label>
                <input type="text" name="phone" placeholder="Phone Number" value={phone} onChange={handleInputChange}></input>
                {phoneError && (
                    <>
                    <p className="text-danger mb-0">The Phone Number is Invalid</p>
                    </>
                )}
            </div>
            <button className="bg-primary text-light mx-auto rounded col-3" onClick={handleFormSubmit}>Submit</button>
        </form>
    )
}

export default AddClient