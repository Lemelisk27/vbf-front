import React from "react";
import "./style.css"

function Error () {
    return (
        <div className="zs-error d-flex flex-column bg-secondary col-12">
            <h1 className="text-center mt-5">Error 404, Site not Found</h1>
            <a className="text-center text-light" href="/">Go Home</a>
        </div>
    )
}

export default Error