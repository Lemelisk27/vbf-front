import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Patient from "./Patient"

function App() {
  const [currentPage, setCurrentPage] = useState('')
  const [userState, setUserState] = useState({
    username:"",
    id:0
  })
  const renderPage = () => {
    if (currentPage === "patient") {
      return <Patient />
    }
    else {
      return <LoginForm currentPage={currentPage} setCurrentPage={setCurrentPage} userState={userState} setUserState={setUserState}/>
    }
  }
  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;
