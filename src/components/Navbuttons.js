import React from "react";

function NavButtons (props) {
    return (
        <a className="d-flex flex-row zs-nav-btn border border-dark border-bottom-0 col-2 text-decoration-none " href={props.buttons.link} style={props.buttons.style}>
            <div className="d-flex flex-row col-8 mx-auto">
                <img src={props.buttons.img} alt="Icon" className=""></img>
                <p className="text-center align-self-center">{props.buttons.name}</p>
            </div>
        </a>
    )
}

export default NavButtons