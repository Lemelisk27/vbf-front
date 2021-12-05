import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import AddUser from "../components/AddUser"
import EditUser from "../components/EditUser"
import DeleteUser from "../components/DeleteUser"
import AddRole from "../components/AddRole"
import EditRole from "../components/EditRole"
import DeleteRole from "../components/DeleteRole"

function Users (props) {
    const [showUserModal, setShowUserModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [showRoleModal, setShowRoleModal] = useState(false)
    const [addUser, setAddUser] = useState(true)
    const [editUser, setEditUser] = useState(false)
    const [addNewRole, setAddNewRole] = useState(true)
    const [editOldRole, setEditOldRole] = useState(false)


    const addUsers = (e) => {
        e.preventDefault()
        setShowUserModal(true)
        setModalTitle("Add")
        setAddUser(true)
        setEditUser(false)
    }

    const editUsers = (e) => {
        e.preventDefault()
        setShowUserModal(true)
        setModalTitle("Edit")
        setAddUser(false)
        setEditUser(true)
    }

    const deleteUsers = (e) => {
        e.preventDefault()
        setShowUserModal(true)
        setModalTitle("Delete")
        setAddUser(false)
        setEditUser(false)
    }

    const addRole = (e) => {
        e.preventDefault()
        setShowRoleModal(true)
        setModalTitle("Add")
        setAddNewRole(true)
        setEditOldRole(false)
    }

    const editRole = (e) => {
        e.preventDefault()
        setShowRoleModal(true)
        setModalTitle("Edit")
        setAddNewRole(false)
        setEditOldRole(true)
    }

    const deleteRole = (e) => {
        e.preventDefault()
        setShowRoleModal(true)
        setModalTitle("Delete")
        setAddNewRole(false)
        setEditOldRole(false)
    }

    return (
        <div className="d-flex flex-row">
            <div className="zs-admin-content zs-edituser d-flex flex-row col-6">
                <div className="d-flex flex-column col-12 m-3">
                    <h1>Users</h1>
                    <button className="rounded mx-auto bg-primary text-light col-6 mt-5" onClick={addUsers}>Add User</button>
                    <button className="rounded mx-auto bg-primary text-light col-6 mt-5" onClick={editUsers}>Edit User</button>
                    <button className="rounded mx-auto bg-primary text-light col-6 mt-5" onClick={deleteUsers}>Delete User</button>
                </div>
            </div>
            <div className="zs-admin-content d-flex flex-row col-6">
            <div className="d-flex flex-column col-12 m-3">
                    <h1>Roles</h1>
                    <button className="rounded mx-auto bg-primary text-light col-6 mt-5" onClick={addRole}>Add Role</button>
                    <button className="rounded mx-auto bg-primary text-light col-6 mt-5" onClick={editRole}>Edit Role</button>
                    <button className="rounded mx-auto bg-primary text-light col-6 mt-5" onClick={deleteRole}>Delete Role</button>
                </div>
            </div>
            <Modal
                size='lg'
                show={showUserModal}
                onHide={() => setShowUserModal(false)}
                aria-labelledby='add-modal'
                centered>
                <Modal.Header closeButton className="zs-admin-modal">
                    <Modal.Title id='add-modal'>
                        <h3>{modalTitle} User</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {addUser ? <AddUser setShowUserModal={setShowUserModal}/>:
                    (editUser ? <EditUser setShowUserModal={setShowUserModal}/>:
                    <DeleteUser setShowUserModal={setShowUserModal}/>)}
                </Modal.Body>
            </Modal>
            <Modal
                size='lg'
                show={showRoleModal}
                onHide={() => setShowRoleModal(false)}
                aris-labelledby='add-modal'
                centered>
                <Modal.Header closeButton className="zs-admin-modal">
                    <Modal.Title id='add-modal'>
                        <h3>{modalTitle} Role</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {addNewRole ? <AddRole setShowRoleModal={setShowRoleModal}/>:
                    (editOldRole ? <EditRole setShowRoleModal={setShowRoleModal}/>:
                    <DeleteRole setShowRoleModal={setShowRoleModal}/>)}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Users