import React from "react"
import {Text, View, StyleSheet} from "@react-pdf/renderer"

function InvoiceItems (props) {
    const itemstyles = StyleSheet.create({
        bodyitems: {
            flexDirection: 'row',
            fontSize: 16
        },
        item: {
            width: "55%",
            paddingLeft: "10"
        },
        cost: {
            width: "15%",
            paddingLeft: "10"
        },
        qty: {
            width: "15%",
            paddingLeft: "10"
        },
        price: {
            width: "15%",
            paddingLeft: "10"
        }
    })

    return (
        <View style={itemstyles.bodyitems}>
            <Text style={itemstyles.item}>{props.item.item_name}</Text>
            <Text style={itemstyles.cost}>{props.item.item_cost}</Text>
            <Text style={itemstyles.qty}>{props.item.item_qty}</Text>
            <Text style={itemstyles.price}>{props.item.item_price}</Text>
        </View>
    )
}

export default InvoiceItems