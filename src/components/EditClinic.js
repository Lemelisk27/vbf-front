import React, {useState, useEffect} from "react"
import Auth from "../utils/auth"
import API from "../utils/API"

function EditClinic (props) {
    const token = Auth.getToken()
    const [nameError, setNameError] = useState(false)
    const [streetError, setStreetError] = useState(false)
    const [cityError, setCityError] = useState(false)
    const [stateError, setStateError] = useState(false)
    const [zipError, setZipError] = useState(false)
    const stateVal = /^([A-z]{2})$/
    const [validState, setValidState] = useState(false)
    const zipVal = /^[0-9]{5}[-]?([0-9]{4})?$/
    const [validZip, setValidZip] = useState(false)
    const [emailError, setEmailError] = useState(false)
    // eslint-disable-next-line
    const emailVal = /^[A-z0-9_\.-]+@[\dA-z\.-]+\.[A-z\.]{2,6}$/
    const [phoneError, setPhoneError] = useState(false)
    const phoneVal = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/
    const [newClinic, setNewClinic] = useState({
        id: 0,
        name: "",
        street: "",
        city: "",
        state: "",
        zip: 0,
        email: "",
        img: "",
        phone: "",
        site: "",
        // eslint-disable-next-line
        state: "",
        tax_rate: 0
    })
    
    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

    const loadPage = () => {
        setNewClinic({
            ...newClinic,
            id: props.clinic.id,
            name: props.clinic.name,
            street: props.clinic.street,
            city: props.clinic.city,
            state: props.clinic.state,
            zip: props.clinic.zip,
            email: props.clinic.email,
            img: props.clinic.img,
            phone: props.clinic.phone,
            site: props.clinic.site,
            // eslint-disable-next-line
            state: props.clinic.state,
            tax_rate: props.clinic.tax_rate
        })
    }

    const handleInputChange = (e) => {
        if (e.target.name === "name") {
            setNewClinic({
                ...newClinic,
                name: e.target.value
            })
        }
        if (e.target.name === "street") {
            setNewClinic({
                ...newClinic,
                street: e.target.value
            })
        }
        if (e.target.name === "city") {
            setNewClinic({
                ...newClinic,
                city: e.target.value
            })
        }
        if (e.target.name === "state") {
            setNewClinic({
                ...newClinic,
                state: e.target.value
            })
        }
        if (e.target.name === "zip") {
            setNewClinic({
                ...newClinic,
                zip: e.target.value
            })
        }
        if (e.target.name === "email") {
            setNewClinic({
                ...newClinic,
                email: e.target.value
            })
        }
        if (e.target.name === "phone") {
            setNewClinic({
                ...newClinic,
                phone: e.target.value
            })
        }
        if (e.target.name === "site") {
            setNewClinic({
                ...newClinic,
                site: e.target.value
            })
        }
        if (e.target.name === "tax_rate") {
            setNewClinic({
                ...newClinic,
                tax_rate: e.target.value
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (newClinic.name === "" || newClinic.name === null) {
            setNameError(true)
            return
        }
        if (newClinic.street === "" || newClinic.street === null) {
            setStreetError(true)
            return
        }
        if (newClinic.city === "" || newClinic.city === null) {
            setCityError(true)
            return
        }
        if (newClinic.state === "" || newClinic.state === null) {
            setStateError(true)
            return
        }
        if (!stateVal.test(newClinic.state)) {
            setValidState(true)
            return
        }
        if (newClinic.zip === "" || newClinic.zip === null) {
            setZipError(true)
            return
        }
        if (!zipVal.test(newClinic.zip)) {
            setValidZip(true)
            return
        }
        if (newClinic.email.length > 0) {
            if (!emailVal.test(newClinic.email)) {
                setEmailError(true)
                return
            }
        }
        if (newClinic.phone.length > 0) {
            if (!phoneVal.test(newClinic.phone)) {
                setPhoneError(true)
                return
            }
        }
        API.updateClinic(newClinic,token)
        .then(res=>{
            console.log(res)
            props.setShowClinicModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleFormCancel = (e) => {
        e.preventDefault()
        props.setShowClinicModal(false)
    }

    return (
        <form className="d-flex flex-column col-12">
            <div className="d-flex flex-column col-12 px-1 py-2">
                <label>Clinic Name</label>
                <input type="text" name="name" value={newClinic.name} onChange={handleInputChange}></input>
                {nameError && (
                    <p className="text-danger mb-0">A Name is Required</p>
                )}
            </div>
            <div className="d-flex flex-column col-12 px-1 py-2">
                <label>Street</label>
                <input type="text" name="street" value={newClinic.street} onChange={handleInputChange}></input>
                {streetError && (
                    <p className="text-danger mb-0">A Street is Required</p>
                )}
            </div>
            <div className="d-flex flex-row col-12">
                <div className="d-flex flex-column col-7 px-1 py-2">
                    <label>City</label>
                    <input type="text" name="city" value={newClinic.city} onChange={handleInputChange}></input>
                    {cityError && (
                        <p className="text-danger mb-0">A City is Required</p>
                    )}
                </div>
                <div className="d-flex flex-column col-1 px-1 py-2">
                    <label>State</label>
                    <input type="text" name="state" value={newClinic.state} onChange={handleInputChange}></input>
                    {stateError && (
                        <p className="text-danger mb-0">Required</p>
                    )}
                    {validState && (
                        <p className="text-danger mb-0">Invalid</p>
                    )}
                </div>
                <div className="d-flex flex-column col-4 px-1 py-2">
                    <label>Zip Code</label>
                    <input type="text" name="zip" value={newClinic.zip} onChange={handleInputChange}></input>
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
                    <input type="text" name="email" value={newClinic.email} onChange={handleInputChange}></input>
                    {emailError && (
                        <p className="text-danger mb-0">The Email is Invalid</p>
                    )}
                </div>
                <div className="d-flex flex-column col-6 px-1 py-2">
                    <label>Phone</label>
                    <input type="text" name="phone" value={newClinic.phone} onChange={handleInputChange}></input>
                    {phoneError && (
                        <p className="text-danger mb-0">The Phone Number is Invalid</p>
                    )}
                </div>
            </div>
            <div className="d-flex flex-row col-12">
                <div className="d-flex flex-column col-10 px-1 py-2">
                    <label>Website (optional)</label>
                    <input type="text" name="site" value={newClinic.site} onChange={handleInputChange}></input>
                </div>
                <div className="d-flex flex-column col-2 px-1 py-2">
                    <label>Tax Rate</label>
                    <input type="text" name="tax_rate" value={newClinic.tax_rate} onChange={handleInputChange}></input>
                </div>
            </div>
            <div className="d-flex flex-row col-12 justify-content-around mt-3">
                <button className="bg-primary text-light rounded col-3" onClick={handleFormSubmit}>Submit</button>
                <button className="bg-primary text-light rounded col-3" onClick={handleFormCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default EditClinic