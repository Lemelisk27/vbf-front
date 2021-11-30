import React from "react";
import NavButtons from "../../components/Navbuttons";
import "./style.css"
import Auth from "../../utils/auth"

const user = Auth.getUser()

const buttons = [
    {
        name: "Patients",
        link: "/patients",
        style: {
            background: "#659dbd",
            color: "black"
        },
        img: "/assets/images/patients.png"
    },
    {
        name: "Clients",
        link: "/clients",
        style: {
            background: "#995fa3",
            color: "black"
        },
        img: "/assets/images/clients.png"
    },
    {
        name: "Calendar",
        link: "/calendar",
        style: {
            background: "#fecee9",
            color: "black"
        },
        img: "/assets/images/appointments.png"
    },
    {
        name: "Inventory",
        link: "/inventory",
        style: {
            color: "black"
        },
        img: "/assets/images/inventory.png"
    },
    {
        name: "Sales",
        link: "/sales",
        style: {
            background: "#493657ff",
            color: "white"
        },
        img: "/assets/images/sales.png"
    },
    {
        name: "Admin",
        link: "/admin",
        style: {
            background: "#bbbe64ff",
            color: "black"
        },
        img: "/assets/images/admin.png"
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