import React, { useState } from "react";
import API from "../../utils/API";
import "./style.css"
import Auth from "../../utils/auth"

function LoginForm(props) {
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
            localStorage.setItem("token",res.data.token)
            const userData = {
                id: res.data.user.id,
                username: res.data.user.username,
                firstName: res.data.user.first_name,
                lastName: res.data.user.last_name,
                admin: res.data.user.admin
            }
            Auth.saveUser(userData)
            setLoginState({
                ...loginState,
                username:"",
                password:""
            })
            window.location.href = "/patients"
        })
        .catch(err=>{
            setErrorMessage('The Username or Password is Invalid')
            console.log(err)
        })
    }

    return (
        <div className="zs-login col-12">
            <div className="d-flex flex-column col-8 mx-auto pt-5" onSubmit={handleFormSubmit}>
                <img src="assets/images/vet_login.png" alt="Vet Logo" className="col-5 mx-auto"></img>
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
        </div>
    )
}

export default LoginForm