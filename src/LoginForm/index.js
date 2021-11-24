import React, { useState } from "react";
import API from "../utils/API";
import "./style.css"

function LoginForm({ currentPage, setCurrentPage, setUserState }) {
    const [errorMessage, setErrorMessage] = useState('')
    const [loginState, setLoginState] = useState({
        username:"",
        password:""
    })

    const handleInputChange = (e) => {
        if (e.target.name === 'username') {
            setLoginState({
                ...loginState,
                username:e.target.value
            })
        }
        else if (e.target.name === 'password') {
            setLoginState({
                ...loginState,
                password:e.target.value
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (!loginState.username || !loginState.password) {
            setErrorMessage('The Username or Password is Invalid')
            return
        }
        API.login(loginState).then(res=>{
            console.log(res.data)
            setUserState({
                username:res.data.user.username,
                id:res.data.user.id
            })
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("username",res.data.user.username)
            localStorage.setItem("id",res.data.user.id)
        })
        .catch(err=>{
            setErrorMessage('The Username or Password is Invalid')
            console.log(err)
        })
        setLoginState({
            ...loginState,
            username:"",
            password:""
        })
        setCurrentPage("patient")
    }

    return (
        <div className="d-flex flex-column col-8 mx-auto mt-5" onSubmit={handleFormSubmit}>
            <img src="https://via.placeholder.com/500.png?text=Vet+Logo" alt="Vet Logo" className="col-6 mx-auto rounded"></img>
            <form className="d-flex flex-column mx-auto col-5 mt-5">
                <input
                    value={loginState.username}
                    name="username"
                    onChange={handleInputChange}
                    type="text"
                    className="mb-1 rounded"
                    id="username"
                    placeholder="Username">
                </input>
                <input
                    value={loginState.password}
                    name="password"
                    onChange={handleInputChange}
                    type="password"
                    className="mt-1 rounded"
                    id="password"
                    placeholder="Password">
                </input>
                <button className="loginBtn col-3 mt-2 mx-auto rounded" onClick={handleFormSubmit}>Login</button>
                {errorMessage && (
                    <>
                        <p className="text-center text-danger mt-2">{errorMessage}</p>
                    </>
                )}
            </form>
        </div>
    )
}

export default LoginForm