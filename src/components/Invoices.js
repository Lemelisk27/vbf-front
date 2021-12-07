import React, {useEffect, useState} from "react"
import {Page, Text, View, Document, StyleSheet, Image} from "@react-pdf/renderer"
import Auth from "../utils/auth"
import API from "../utils/API"
import InvoiceItems from "./InvoiceItems"

function MyDocument (props) {
    const token = Auth.getToken()
    const client = props.client
    const invoice = props.invoice
    const [clinic, setClinic] = useState({})

    console.log(invoice)

    useEffect(()=>{
        API.getClinic(token)
        .then(res=>{
            setClinic(res.data[0])
            
        })
        .catch(err=>{
            console.log(err)
        })
        // eslint-disable-next-line
    },[])

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: 'white',
            padding: 20
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        headertext: {
            flexDirection: 'column',
            fontSize: 12,
            margin: 10
        },
        img: {
            width: 100,
            height: 100
        },
        div: {
            borderTop: "1px solid black",
            marginTop: 10,
        },
        body: {
            flexDirection: 'column',
            margin: 10,
            fontSize: 16,
            minHeight: "550px"
        },
        bodytitles: {
            flexDirection: 'row',
            fontSize: 16
        },
        titleitem: {
            border: "1px solid black",
            width: "55%",
            paddingLeft: "10"
        },
        titlecost: {
            border: "1px solid black",
            width: "15%",
            paddingLeft: "10"
        },
        titleqty: {
            border: "1px solid black",
            width: "15%",
            paddingLeft: "10"
        },
        titleprice: {
            border: "1px solid black",
            width: "15%",
            paddingLeft: "10"
        },
        footercontent: {
            border: "1px solid black",
            width: "25%",
            fontSize: 16,
            margin: 10
        }
    })

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.headertext}>
                        <Text>{clinic.name}</Text>
                        <Text>{clinic.street}</Text>
                        <Text>{clinic.city}, {clinic.state} {clinic.zip}</Text>
                        <Text>Phone: {clinic.phone}</Text>
                        <Text>Email: {clinic.email}</Text>
                    </View>
                    <Image
                        style={styles.img}
                        src={clinic.img}
                    />
                    <View style={styles.headertext}>
                        <Text>{client.first_name} {client.last_name}</Text>
                        <Text>{client.street}</Text>
                        <Text>{client.city}, {client.state} {client.zip}</Text>
                        <Text>Phone: {client.phone}</Text>
                    </View>
                </View>
                <View style={styles.div}></View>
                <View style={styles.body}>
                    <View style={styles.bodytitles}>
                        <Text style={styles.titleitem}>Item</Text>
                        <Text style={styles.titlecost}>Cost</Text>
                        <Text style={styles.titleqty}>Quantity</Text>
                        <Text style={styles.titleprice}>Price</Text>
                    </View>
                    {invoice.Invoiceitems.map(item => <InvoiceItems key={item.id} item={item}/>)}
                </View>
                <View style={styles.footercontent}>
                    <Text>Subtotal ${invoice.subtotal}</Text>
                    <Text>Tax ${invoice.tax}</Text>
                    <Text>Total ${invoice.total}</Text>
                    <Text>Paid ${invoice.paid}</Text>
                    <Text>Due ${invoice.due}</Text>
                </View>
            </Page>
        </Document> 
    )
}

export default MyDocument