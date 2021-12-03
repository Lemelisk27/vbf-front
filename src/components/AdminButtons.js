import React from "react";

function AdminButtons (props) {
    return (
        <div className="d-flex col-2">
            <button className="col-12 rounded-top" name={props.name} onClick={props.handlePageChange}>{props.name}</button>
        </div>
    )
}

export default AdminButtons