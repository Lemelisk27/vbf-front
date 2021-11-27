import React, {useEffect, useState} from "react";
import "./style.css"
import API from "../utils/API";
import Auth from "../utils/auth"
import ClientList from "../components/ClientList"

function Client (props) {
    const [rawClients, setRawClients] = useState([])
    const [clients, setClients] = useState([])
    const token = Auth.getToken()

    useEffect (() => {
        API.getClients(token)
        .then(res=>{
            console.log(res.data)
            setRawClients(res.data)
            setClients(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return (
        <div className="zs-clients d-flex flex-row pt-3">
            <div className="zs-client-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>Clients</h1>
                    <button className="rounded bg-primary text-light col-2">Add Client</button>
                </div>
                <form className="d-flex justify-content-start mt-5 col-11 mx-auto">
                    <div className="d-flex flex-column col-3">
                        <label>Name</label>
                        <input type="text" name="client" placeholder="Type here to search..."></input>
                    </div>
                </form>
                <div className="zs-ctable col-11 mx-auto mt-5 overflow-auto">
                    <table className="table table-bordered">
                        <thead className="bg-secondary">
                            <tr className="text-center text-light">
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Pets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(item=><ClientList key={item.id} client={item}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Client