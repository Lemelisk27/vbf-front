import React, {Fragment} from "react";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"
import AuthRoute from "./utils/AuthRoute";
import LoginForm from "./pages/LoginForm";
import Navbar from "./pages/Navbar";
import Patient from "./pages/Patient";
import Client from "./pages/Client";
import Appointments from "./pages/Appointments";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Admin from "./pages/Admin"
import Error from "./pages/Error";
import PatientDetails from "./pages/PatientDetails";
import ClientDetails from "./pages/ClientDetails"

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
          <Route exact path="/patients/:id" element={<AuthRoute/>}>
            <Route exact path="/patients/:id" element={
              <>
                <Navbar />
                <PatientDetails />
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
          <Route exact path="/clients/:id" element={<AuthRoute/>}>
            <Route exact path="/clients/:id" element={
              <>
                <Navbar />
                <ClientDetails />
              </>
            }/>
          </Route>
          <Route exact path="/calendar" element={<AuthRoute/>}>
            <Route exact path="/calendar" element={
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
