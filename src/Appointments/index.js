import React from "react";
import "./style.css"
import Calendar from "../components/Calendar"

function Appointments (props) {
    return (
        <div className="zs-appointments d-flex flex-row pt-3">
            <div className="zs-appt-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>Appointments</h1>
                </div>
                <div className="mt-3 mx-auto col-11">
                    <Calendar />
                </div>
            </div>
        </div>
    )
}

export default Appointments