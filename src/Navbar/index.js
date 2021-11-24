import React from "react";
import NavButtons from "../components/Navbuttons";
import "./style.css"

const buttons = [
    {
        name: "Patients",
        style: {
            background: "#659dbd"
        }
    },
    {
        name: "Clients",
        style: {
            background: "#995fa3"
        }
    },
    {
        name: "Appointments",
        style: {
            background: "#fecee9"
        }
    },
    {
        name: "Inventory",
        style: {}
    },
    {
        name: "Sales",
        style: {
            background: "#493657ff",
            color: "white"
        }
    },
    {
        name: "Admin",
        style: {
            background: "#bbbe64ff"
        }
    }
]

function Navbar (props) {
    return (
        <div className="zs-nav d-flex col-12 justify-content-between">
            <div className="d-flex align-items-end col-8 mx-3">
                {buttons.map((item,i) => {
                    return <NavButtons key={i} buttons={item} style={item.style}/>
                })}
            </div>
            <div className="d-flex align-items-center mx-1">
                <button className="rounded bg-primary text-light" onClick={props.logOut}>Log Out</button>
            </div>
        </div>
    )
}

export default Navbar