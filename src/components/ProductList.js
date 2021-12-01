import React, {useState, useEffect} from "react";

function ProductList (props) {
    const [cost] = useState(props.item.cost)
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)

    const qtyChange = (e) => {
        setQty(e.target.value)
    }

    useEffect (()=>{
        const tempPrice = cost * qty
        setPrice(tempPrice.toFixed(2))
        props.setChange(!props.change)
    },[qty])

    return (
        <tr>
            <td>{props.item.label}</td>
            <td className="text-center col-1" name="cost">{cost}</td>
            <td><input type="number" name="qty" className="col-12 text-center" value={qty} onChange={qtyChange}></input></td>
            <td className="text-center col-1" name="price">{price}</td>
        </tr>
    )
}

export default ProductList