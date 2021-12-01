import React, {useState} from "react";
import "./style.css"
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { Typeahead } from 'react-bootstrap-typeahead'

function Sales (props) {
    const [productList, setProductList] = useState(false)

    return (
        <div className="zs-sales d-flex flex-row pt-3">
            <div className="zs-sales-card d-flex flex-column col-11 m-auto rounded">
                <div className="d-flex flex-row col-11 mx-auto mt-4 justify-content-between border-bottom border-dark pb-4">
                    <h1>Sales</h1>
                    <div className="d-flex flex-row col-8 justify-content-end">
                        <button className="bg-primary text-light col-3 mx-3 rounded align-self-end" style={{height: "33px"}}>Add</button>
                        <div className="d-flex flex-column col-5">
                            <label className="text-end">Client</label>
                            <input type="text" name="client" placeholder="Type Here to Search..."></input>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column col-11 mx-auto mt-5">
                    <h3>Products</h3>
                    <div className="d-flex flex-row col-12">
                        <input type="text" name="product" placeholder="Type Here to Search..." className="col-9"></input>
                        <button className="col-2 rounded bg-primary text-light mx-3">Add</button>
                    </div>
                </div>
                <div className="zs-product-list d-flex flex-column col-11 mx-auto border border-dark mt-3 overflow-auto">
                    {!productList && (
                        <p className="text-center my-auto">No Products Entered</p>
                    )}
                </div>
                <div className="d-flex flex-column col-11 mx-auto">
                    <div className="d-flex flex-column border border-dark col-2 mt-2 justify-content-between">
                        <table className="mx-2">
                            <tbody>
                                <tr>
                                    <th scope="row">Subtotal:</th>
                                    <td>$0.00</td>
                                </tr>
                                <tr>
                                    <th scope="row">Tax:</th>
                                    <td>$0.00</td>
                                </tr>
                                <tr>
                                    <th scope="row">Total:</th>
                                    <td>$0.00</td>
                                </tr>
                                <tr>
                                    <th scope="row">Paid:</th>
                                    <td>$0.00</td>
                                </tr>
                                <tr>
                                    <th scope="row">Due:</th>
                                    <td>$0.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sales