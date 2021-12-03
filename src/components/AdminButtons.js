import React from "react";

function AdminButtons (props) {
    const oldClass = `col-12 admin-btns border-bottom-0 ${props.name}-`

    return (
        <div className="d-flex col-2">
            <button className={oldClass + props.newClass} name={props.name} onClick={props.handlePageChange}>{props.name}</button>
        </div>
    )
}

export default AdminButtons