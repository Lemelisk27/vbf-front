import React from "react";
import Auth from "../utils/auth"

function Profile (props) {
    const user = Auth.getUser()
    console.log(user)

    return (
        <div className="col-11 mx-auto">
            <h1>Welcome {user.firstName}</h1>
        </div>
    )
}

export default Profile