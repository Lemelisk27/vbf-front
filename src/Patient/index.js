import React from "react";
import "./style.css"

function Patient (props) {
    return (
        <div className="zs-patients d-flex flex-row pt-3">
            <div className="zs-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between">
                    <h1>Patients</h1>
                    <button className="rounded bg-primary text-light col-2">Add Patient</button>
                </div>
                <div className="d-flex justify-content-between mt-5 col-11 mx-auto">
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
                </div>
            </div>
        </div>
    )
}

export default Patient