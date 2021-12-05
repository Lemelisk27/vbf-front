import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API"
import ListItems from "./ListItems";

function DeleteUser (props) {
    const token = Auth.getToken()
    const user = Auth.getUser()
    const [pageLoad, setPageLoad] = useState(true)
    const [userList, setUserList] = useState([])
    const [selectedUser, setSelectedUser] = useState("")
    const [userId, setUserId] = useState(0)

    useEffect(()=>{
        onLoad()
        // eslint-disable-next-line
    },[])

    const cancelBtn = (e) => {
        e.preventDefault()
        props.setShowUserModal(false)
    }

    const changeUser = (e) => {
        setSelectedUser(e.target.value)
        setPageLoad(false)
    }

    const onLoad = () => {
        API.getAllUsers(token)
        .then(res=>{
            setUserList(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        for (let i = 0; i < userList.length; i++) {
            if(userList[i].full_name === selectedUser) {
                setUserId(userList[i].id)
            }
        }
        // eslint-disable-next-line
    },[selectedUser])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        API.deleteUser(userId,token)
        .then(res=>{
            console.log(res)
            props.setShowUserModal(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="d-flex flex-column col-12">
            {pageLoad ? (
                <div className="d-flex flex-column col-11 px-1 py-2 mx-auto">
                    <label>Select a User to Delete</label>
                    <select name="selectUser" style={{height: "31px"}} value={selectedUser} onChange={changeUser}>
                        <option defaultValue="Select a User">Select a User</option>
                        {userList.filter(name => name.first_name !== user.firstName).map(item => <ListItems key={item.id} options={item.full_name}/>)}
                    </select>
                </div>
            ):(
                <div className="d-flex flex-column col-12">
                    <h2 className="text-center">Are you Sure?</h2>
                    <h4 className="text-center">This Will <strong className="text-danger">Permanently</strong> Delete {selectedUser}</h4>
                </div>
            )}
            <div className="d-flex flex-row col-12 justify-content-around mt-3">
                {!pageLoad && (
                    <button className="bg-danger text-light rounded col-3" onClick={handleFormSubmit}>Yes</button>
                )}
                <button className="bg-primary text-light rounded col-3" onClick={cancelBtn}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteUser