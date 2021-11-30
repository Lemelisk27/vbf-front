import React from "react";
import {Link} from "react-router-dom"

function ClientList (props) {
    console.log(props)
    return (
        <tr>
            <th scope="row"><Link to={`/clients/${props.client.id}`}>{props.client.full_name}</Link></th>
            <td>{props.client.phone}</td>
            <td>
                <ul className="m-0">
                    {props.client.Animals.map(item=><li key={item.id}><Link to={`/patients/${item.id}`}>{item.name}</Link></li>)}
                </ul>
            </td>
        </tr>
    )
}

export default ClientList