import React, {useEffect, useState} from "react";
import Auth from "../utils/auth"
import API from "../utils/API";
import {Modal} from "react-bootstrap";
import EditProfile from "./EditProfile"
import ChangePassword from "./ChangePassword";

function Profile (props) {
    const user = Auth.getUser()
    const token = Auth.getToken()
    const [showModal, setShowModal] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [userInfo, setUserInfo] = useState({
        first_name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: 0,
        Role: {
            title: ""
        }
    })

    useEffect(()=>{
        loadPage()
    // eslint-disable-next-line
    },[])

    useEffect(()=>{
        loadPage()
    // eslint-disable-next-line
    },[showModal])

    const loadPage = () => {
        API.getUser(user.id,token)
        .then(res=>{
            setUserInfo(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const passwordBtn = () => {
        setChangePassword(true)
        setShowModal(true)
    }

    const editBtn = () => {
        setChangePassword(false)
        setShowModal(true)
    }

    return (
        <div className="col-11 mx-auto mt-3">
            <div>
                <h1 className="mb-0">Welcome {userInfo.first_name}</h1>
                <h5>{userInfo.Role.title}{user.admin && (" - Administrator")}</h5>
            </div>
            <div>
                <p className="mb-0">Email: {userInfo.email}</p>
                <p>Phone: {userInfo.phone}</p>
                <p className="mb-0">Address:</p>
                <p className="mb-0">{userInfo.street}</p>
                <p>{userInfo.city}, {userInfo.state} {userInfo.zip}</p>
            </div>
            <div className="d-flex flex-row justify-content-around mt-5">
                <button className="col-3 bg-primary text-light rounded" onClick={editBtn}>Edit Profile</button>
                <button className="col-3 bg-primary text-light rounded" onClick={passwordBtn}>Change Password</button>
            </div>
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='add-modal'
                centered>
                <Modal.Header closeButton className="zs-admin-modal">
                    <Modal.Title id="add-modal">
                        <h3>Edit Profile</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {changePassword ? <ChangePassword user={userInfo} setShowModal={setShowModal}/> : <EditProfile user={userInfo} setShowModal={setShowModal}/>}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Profile