import React, {useState, useEffect} from "react";
import Auth from "../utils/auth"
import API from "../utils/API";
import {Modal} from "react-bootstrap";
import EditClinic from "./EditClinic";

function Clinic (props) {
    const token = Auth.getToken()
    const user = Auth.getUser()
    const [showClinicModal, setShowClinicModal] = useState(false)
    const [clinic, setClinic] = useState({
        id: 0,
        name: "",
        img: "",
        email: "",
        city: "",
        phone: "",
        site: "",
        state: "",
        street: "",
        tax_rate: 0,
        zip: 0
    })

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        loadPage()
        // eslint-disable-next-line
    },[showClinicModal])

    const loadPage = () => {
        API.getClinic(token)
        .then(res=>{
            setClinic({
                ...clinic,
                id: res.data[0].id,
                name: res.data[0].name,
                img: res.data[0].img,
                email: res.data[0].email,
                city: res.data[0].city,
                phone: res.data[0].phone,
                site: res.data[0].site,
                state: res.data[0].state,
                street: res.data[0].street,
                tax_rate: parseFloat(res.data[0].tax_rate),
                zip: parseInt(res.data[0].zip)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="d-flex flex-row col-11 mx-auto mt-3">
            <img src={clinic.img} alt="Icon" className="clinic-logo col-4"></img>
            <div className="mx-auto">
                <h1>{clinic.name}</h1>
                <div>
                    <p className="mb-0">Email: {clinic.email}</p>
                    <p>Phone: {clinic.phone}</p>
                </div>
                <div>
                    <p className="mb-0">Address:</p>
                    <p className="mb-0">{clinic.street}</p>
                    <p>{clinic.city}, {clinic.state} {clinic.zip}</p>
                </div>
                {clinic.site && (
                    <p>Website: <a href={clinic.site}>{clinic.name}</a></p>
                )}
                {user.admin && (
                    <button className="bg-primary text-light rounded col-12 mx-auto mt-5" onClick={() => setShowClinicModal(true)}>Edit {clinic.name}</button>
                )}
            </div>
            <Modal
                size="lg"
                show={showClinicModal}
                onHide={() => setShowClinicModal(false)}
                aria-labelledby='add-modal'
                centered>
                <Modal.Header closeButton className="zs-admin-modal">
                    <Modal.Title id='add-modal'>
                        <h3>Edit Clinic</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditClinic clinic={clinic} setShowClinicModal={setShowClinicModal}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Clinic