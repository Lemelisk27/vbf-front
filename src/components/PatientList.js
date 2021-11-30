import React from "react";
import {Link} from "react-router-dom"

function PatientList (props) {
    return (
        <tr>            
            <th scope="row"><Link to={`/patients/${props.animal.id}`}>{props.animal.name}</Link></th>
            <td>{props.animal.Species.species}</td>
            <td>{props.animal.Breed.breed}</td>
            <td>{props.animal.Client.client}</td>
            <td>{props.animal.Client.phone}</td>
            <td className="text-center">{props.last}</td>
            <td className="text-center">{props.next}</td>           
        </tr>
    )
}

export default PatientList