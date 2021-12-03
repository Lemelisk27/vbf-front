import React, {useState, useEffect} from "react";
import "./style.css"
import Auth from "../../utils/auth"
import AdminButtons from "../../components/AdminButtons"
import Profile from "../../components/Profile"
import Clinic from "../../components/Clinic";
import Users from "../../components/Users"
import AdminInventory from "../../components/AdminInventory"
import AdminAnimals from "../../components/AdminAnimals"

function Admin (props) {
    const user = Auth.getUser()
    const [page, setPage] = useState("Profile")

    const userButtons = [
        {
            name: "Profile"
        },
        {
            name: "Clinic"
        }
    ]

    const adminButtons = [
        {
            name: "Users"
        },
        {
            name: "Inventory"
        },
        {
            name: "Animals"
        }
    ]

    const renderPage = () => {
        if (page === "Profile") {
            return <Profile />
        }
        else if (page === "Clinic") {
            return <Clinic />
        }
        else if (page === "Users") {
            return <Users />
        }
        else if (page === "Inventory") {
            return <AdminInventory />
        }
        else if (page === "Animals") {
            return <AdminAnimals />
        }
        else {
            return <Profile />
        }
    }

    const handlePageChange = (e) => {
        e.preventDefault()
        setPage(e.target.name)
    }

    return (
        <div className="zs-admin d-flex flex-row pt-3">
            <div className="zs-admin-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>Admin</h1>
                </div>
                <div className="d-flex flex-column col-11 mx-auto">
                    <div className="d-flex flex-row mt-3 col-12">
                        {userButtons.map((item,i) => {
                            return <AdminButtons key={i} name={item.name} handlePageChange={handlePageChange}/>
                        })}
                        {user.admin && (
                            adminButtons.map((item,i)=> {
                                return <AdminButtons key={i} name={item.name} handlePageChange={handlePageChange}/>
                            })
                        )}
                    </div>
                    <div className="zs-admin-content col-12 border border-dark">
                        {renderPage()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin