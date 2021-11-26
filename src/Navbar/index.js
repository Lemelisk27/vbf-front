import React from "react";
import NavButtons from "../components/Navbuttons";
import "./style.css"

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