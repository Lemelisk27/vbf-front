import React, {useState, useEffect} from "react";

function ProductList (props) {
    const [cost] = useState(props.item.cost)
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const [newQty, setNewQty] = useState(0)

    const qtyChange = (e) => {
        setQty(e.target.value)
    }

    useEffect (()=>{
        setNewQty(props.item.qty - qty)
        const tempPrice = cost * qty
        setPrice(tempPrice.toFixed(2))
        props.setChange(!props.change)
    // eslint-disable-next-line
    },[qty])

    return (
        <tr>
            <td data-index={props.item.id}>{props.item.label}</td>
            <td className="text-center col-1" name="cost" data-index={newQty}>{cost}</td>
            <td data-index={qty}><input type="number" name="qty" className="col-12 text-center" value={qty} onChange={qtyChange}></input></td>
            <td className="text-center col-1" name="price">{price}</td>
        </tr>
    )
}

export default ProductList