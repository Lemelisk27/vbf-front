import React from "react";

function NavButtons (props) {
    return (
        <button className="zs-nav-btn border-bottom-0 col-2" style={props.buttons.style}>{props.buttons.name}</button>
    )
}

export default NavButtons