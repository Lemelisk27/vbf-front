import React, {Fragment} from "react";
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

  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path="/" element={<AuthRoute/>}>
            <Route exact path="/" element={<Navigate to="/patients"/>}/>
          </Route>
          <Route exact path="/login" element={<LoginForm />}/>
          <Route exact path="/patients" element={<AuthRoute/>}>
            <Route exact path="/patients" element={
              <>
                <Navbar />
                <Patient />
              </>
            }/>
          </Route>
          <Route exact path="/clients" element={<AuthRoute/>}>
            <Route exact path="/clients" element={
              <>
                <Navbar />
                <Client />
              </>
            }/>
          </Route>
          <Route exact path="/appointments" element={<AuthRoute/>}>
            <Route exact path="/appointments" element={
              <>
                <Navbar />
                <Appointments />
              </>
            }/>
          </Route>
          <Route exact path="/inventory" element={<AuthRoute/>}>
            <Route exact path="/inventory" element={
              <>
                <Navbar />
                <Inventory />
              </>
            }/>
          </Route>
          <Route exact path="/sales" element={<AuthRoute/>}>
            <Route exact path="/sales" element={
              <>
                <Navbar />
                <Sales />
              </>
            }/>
          </Route>
          <Route exact path="/admin" element={<AuthRoute/>}>
            <Route exact path="/admin" element={
              <>
                <Navbar />
                <Admin />
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
