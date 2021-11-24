import React, {useState, useEffect} from "react";
import API from "../utils/API";
import "./style.css"
import PatientList from "../components/PatientList"

function Patient (props) {
    const [animals, setAnimals] = useState([])

    useEffect(() => {
        loadAnimals()
    },[])

    const loadAnimals = () => {
        API.getAnimals(props.token)
        .then(res=>{
            setAnimals(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    console.log(animals)

    return (
        <div className="zs-patients d-flex flex-row pt-3">
            <div className="zs-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>Patients</h1>
                    <button className="rounded bg-primary text-light col-2">Add Patient</button>
                </div>
                <form className="d-flex justify-content-between mt-5 col-11 mx-auto">
                    <div className="d-flex flex-column col-3">
                        <label>Name</label>
                        <input name="search" placeholder="Type here to search..."></input>                        
                    </div>
                    <div className="d-flex flex-column col-3">
                        <label>Species</label>
                        <input name="search" placeholder="All"></input>                        
                    </div>
                    <div className="d-flex flex-column col-3">
                        <label>Breed</label>
                        <input name="search" placeholder="All"></input>                        
                    </div>
                </form>
                <div className=" d-flex col-11 mx-auto justify-content-end mt-2">
                    <button className="bg-primary text-light col-1 rounded">Search</button>
                </div>
                <div className="col-11 mx-auto mt-5 zs-pcard overflow-auto">
                    <table className="table table-bordered">
                        <thead className="bg-secondary">
                            <tr className="text-center text-light">
                                <th scope="col">Name</th>
                                <th scope="col">Species</th>
                                <th scope="col">Breed</th>
                                <th scope="col">Client</th>
                                <th scope="col">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {animals.map(item=><PatientList key={item.id} animal={item}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Patient