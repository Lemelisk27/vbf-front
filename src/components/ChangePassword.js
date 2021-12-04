import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API";

function ChangePassword (props) {
    const token = Auth.getToken()
    const [currPasswordError, setCurrPasswordError] = useState(false)
    const [newPasswordError, setNewPasswordError] = useState(false)
    const [passLenError, setPassLenError] = useState(false)
    const [confPassword, setConfPassword] = useState("")
    const [confPasswordError, setConfPasswordError] = useState(false)
    const [matchError, setMatchError] = useState(false)
    const [incorrectError, setIncorrectError] = useState(false)
    const [loginState, setLoginState] = useState({
        id:0,
        password:"",
        newPassword:""
    })

    useEffect(()=>{
        pageLoad()
        // eslint-disable-next-line
    },[])

    const pageLoad = () => {
        setLoginState({
            ...loginState,
            id: props.user.id
        })
    }

    const handleInputChange = (e) => {
        if (e.target.name === "currPassword") {
            setLoginState({
                ...loginState,
                password:e.target.value
            })
        }
        if (e.target.name === "newPassword") {
            setLoginState({
                ...loginState,
                newPassword:e.target.value
            })
        }
        if (e.target.name === "confPassword") {
            setConfPassword(e.target.value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (loginState.password === "" || loginState.password === null) {
            setCurrPasswordError(true)
            return
        }
        if (loginState.newPassword === "" || loginState.newPassword === null) {
            setNewPasswordError(true)
            return
        }
        if (loginState.newPassword.length < 8) {
            setPassLenError(true)
            return
        }
        if (confPassword === "" || confPassword === null) {
            setConfPasswordError(true)
            return
        }
        if (loginState.newPassword !== confPassword) {
            setMatchError(true)
            return
        }
        API.changePassword(loginState,token)
        .then(res=>{
            if (res.status === 401) {
                setIncorrectError(true)
                return
            }
            props.setShowModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <form className="d-flex flex-column col-12">
            <div>
                <div className="d-flex flex-column col-6 mx-auto px-1 py-2">
                    <label>Current Password</label>
                    <input type="password" name="currPassword" value={loginState.password} onChange={handleInputChange}></input>
                    {currPasswordError && (
                        <p className="text-danger mb-0">Please Enter Your Password</p>
                    )}
                    {incorrectError && (
                        <p className="text-danger mb-0">Incorrect Username or Password</p>
                    )}
                </div>
                <div className="d-flex flex-column col-6 mx-auto px-1 py-2">
                    <label>New Password</label>
                    <input type="password" name="newPassword" value={loginState.newPassword} onChange={handleInputChange}></input>
                    {newPasswordError && (
                        <p className="text-danger mb-0">Please Enter a new Password</p>
                    )}
                    {passLenError && (
                        <p className="text-danger mb-0">The new Password Must be at Least 8 Characters</p>
                    )}
                </div>
                <div className="d-flex flex-column col-6 mx-auto px-1 py-2">
                    <label>Confirm Password</label>
                    <input type="password" name="confPassword" value={confPassword} onChange={handleInputChange}></input>
                    {confPasswordError && (
                        <p className="text-danger mb-0">Please Confirm the Password</p>
                    )}
                    {matchError && (
                        <p className="text-danger mb-0">The Passwords do not Match</p>
                    )}
                </div>
            </div>
            <div className="d-flex flex-row justify-content-around">
                <button className="bg-primary text-light rounded mx-auto col-3 mt-3" onClick={handleFormSubmit}>Submit</button>
                <button className="bg-primary text-light rounded mx-auto col-3 mt-3" onClick={() => props.setShowModal(false)}>Cancel</button>
            </div>
        </form>
    )
}

export default ChangePassword