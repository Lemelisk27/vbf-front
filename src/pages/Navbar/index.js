import React from "react";
import NavButtons from "../../components/Navbuttons";
import "./style.css"
import Auth from "../../utils/auth"

const user = Auth.getUser()

const buttons = [
    {
        name: "Patients",
        link: "patients",
        style: {
            background: "#659dbd",
            color: "black"
        }
    },
    {
        name: "Clients",
        link: "clients",
        style: {
            background: "#995fa3",
            color: "black"
        }
    },
    {
        name: "Appointments",
        link: "appointments",
        style: {
            background: "#fecee9",
            color: "black"
        }
    },
    {
        name: "Inventory",
        link: "inventory",
        style: {
            color: "black"
        }
    },
    {
        name: "Sales",
        link: "sales",
        style: {
            background: "#493657ff",
            color: "white"
        }
    },
    {
        name: "Admin",
        link: "admin",
        style: {
            background: "#bbbe64ff",
            color: "black"
        }
    }
]

function Navbar (props) {
    return (
        <div className="zs-nav d-flex flex-column col-12">
            <h1 className="align-self-end mx-3">{user.firstName} {user.lastName}</h1>
            <div className="d-flex flex-row col-12 mt-auto justify-content-between">
                <div className="d-flex col-8 mx-3 mt-auto">
                    {buttons.map((item,i) => {
                        return <NavButtons key={i} buttons={item} style={item.style}/>
                    })}
                </div>
                <div className="d-flex m-3">
                    <button className="rounded bg-primary text-light" onClick={Auth.logOut}>Log Out</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar