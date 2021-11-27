import React, {useState, useEffect, Fragment} from "react";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"
import AuthRoute from "./utils/AuthRoute";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";
import Patient from "./Patient";
import Client from "./Client";
import Appointments from "./Appointments";
import Inventory from "./Inventory";
import Sales from "./Sales";
import Admin from "./Admin"
import Error from "./Error";

function App() {
  const [token, setToken] = useState('')
  const [userState, setUserState] = useState({
    username:"",
    id:0
  })

  useEffect(() => {
    setToken(localStorage.getItem("token"))
    setUserState({
      username:localStorage.getItem("username"),
      id:localStorage.getItem("id")
    })
  },[])

  const logOut = () => {
    setUserState({username:"",id:0})
    setToken("")
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("id")
  }

  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path="/" element={<AuthRoute/>}>
            <Route exact path="/" element={<Navigate to="/patients"/>}/>
          </Route>
          <Route exact path="/login" element={<LoginForm userState={userState} setUserState={setUserState}/>}/>
          <Route exact path="/patients" element={<AuthRoute/>}>
            <Route exact path="/patients" element={
              <>
                <Navbar logOut={logOut}/>
                <Patient />
              </>
            }/>
          </Route>
          <Route exact path="/clients" element={<AuthRoute/>}>
            <Route exact path="/clients" element={
              <>
                <Navbar logOut={logOut}/>
                <Client token={token}/>
              </>
            }/>
          </Route>
          <Route exact path="/appointments" element={<AuthRoute/>}>
            <Route exact path="/appointments" element={
              <>
                <Navbar logOut={logOut}/>
                <Appointments token={token}/>
              </>
            }/>
          </Route>
          <Route exact path="/inventory" element={<AuthRoute/>}>
            <Route exact path="/inventory" element={
              <>
                <Navbar logOut={logOut}/>
                <Inventory token={token}/>
              </>
            }/>
          </Route>
          <Route exact path="/sales" element={<AuthRoute/>}>
            <Route exact path="/sales" element={
              <>
                <Navbar logOut={logOut}/>
                <Sales token={token}/>
              </>
            }/>
          </Route>
          <Route exact path="/admin" element={<AuthRoute/>}>
            <Route exact path="/admin" element={
              <>
                <Navbar logOut={logOut}/>
                <Admin token={token}/>
              </>
            }/>
          </Route>
          <Route path="*" element={<Error />}/>
        </Routes>
      </Fragment>
    </Router>
  )

}

export default App;
