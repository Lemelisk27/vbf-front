import React from "react";

function ClientList (props) {
    return (
        <tr>
            <th scope="row">{props.client.full_name}</th>
            <td>{props.client.phone}</td>
            <td>
                <ul className="m-0">
                    {props.client.Animals.map(item=><li key={item.id}>{item.name}</li>)}
                </ul>
            </td>
        </tr>
    )
}

export default ClientList