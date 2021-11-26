import React from "react";

function NavButtons (props) {
    return (
        <a className="zs-nav-btn border border-dark border-bottom-0 col-2 text-decoration-none" href={props.buttons.link} style={props.buttons.style}>
            <p className="text-center">{props.buttons.name}</p>
        </a>
    )
}

export default NavButtons