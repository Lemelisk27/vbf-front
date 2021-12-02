import React, {useState} from "react";

function InventoryList (props) {
    const [cost] = useState(props.item.cost)
    const [qty] = useState(props.item.qty)
    const [total] = useState(cost * qty)

    return (
        <tr>
            <td>{props.item.item_name}</td>
            <td>{props.item.Inventories[0].category_name}</td>
            <td>{props.item.cost}</td>
            <td>{props.item.qty} {props.item.Unit.unit_name}</td>
            <td>{total.toFixed(2)}</td>
        </tr>
    )
}

export default InventoryList