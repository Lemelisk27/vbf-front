import React from "react";

function PatientList (props) {
    return (
        <tr>
            <th scope="row">{props.animal.name}</th>
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