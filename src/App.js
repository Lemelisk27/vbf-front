import React, {useState, useEffect} from "react";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";
import Patient from "./Patient";

function App() {
  const [currentPage, setCurrentPage] = useState('')
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

  const renderPage = () => {
    if (currentPage === "patient") {
      return <Patient token={token}/>
    }
    else {
      return <Patient token={token}/>
    }
  }

  if (userState.username) {
    return (
      <div>
        <Navbar logOut={logOut}/>
        {renderPage()}
      </div>
    )
  }
  else {
    return <LoginForm currentPage={currentPage} setCurrentPage={setCurrentPage} userState={userState} setUserState={setUserState}/>
  }
}

export default App;
