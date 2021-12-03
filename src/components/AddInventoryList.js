import React, {useState} from "react"

function AddInventoryList (props) {
    const [qty, setQty] = useState(0)

    const qtyChange = (e) => {
        setQty(e.target.value)
    }

    return (
        <tr>
            <td data-index={props.item.id}>{props.item.label}</td>
            <td data-index={qty}><input type="number" name="qty" className="col-12 text-center" value={qty} onChange={qtyChange}></input></td>
            <td>{props.item.unit}</td>
        </tr>
    )
}

export default AddInventoryList