import React from "react";

function ListItems (props) {
    return (
        <option data-index={props.id}>{props.options}</option>
    )
}

export default ListItems