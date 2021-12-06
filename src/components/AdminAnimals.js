import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import AddSpecies from "./AddSpecies";
import EditSpecies from "./EditSpecies";
import DeleteSpecies from "./DeleteSpecies";
import AddBreed from "./AddBreed";
import EditBreed from "./EditBreed";
import DeleteBreed from "./DeleteBreed";

function AdminAnimals (props) {
    const [showSpeciesModal, setShowSpeciesModal] = useState(false)
    const [showBreedModal, setShowBreedModal] = useState(false)
    const [showAllergyModal, setShowAllergyModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [addSpecies, setAddSpecies] = useState(true)
    const [editSpecies, setEditSpecies] = useState(false)
    const [addBreed, setAddBreed] = useState(true)
    const [editBreed, setEditBreed] = useState(false)

    const addSpeciesBtn = (e) => {
        e.preventDefault()
        setShowSpeciesModal(true)
        setModalTitle("Add")
        setAddSpecies(true)
        setEditSpecies(false)
    }

    const editSpeciesBtn = (e) => {
        e.preventDefault()
        setShowSpeciesModal(true)
        setModalTitle("Edit")
        setAddSpecies(false)
        setEditSpecies(true)
    }

    const deleteSpeciesBtn = (e) => {
        e.preventDefault()
        setShowSpeciesModal(true)
        setModalTitle("Delete")
        setAddSpecies(false)
        setEditSpecies(false)
    }

    const addBreedBtn = (e) => {
        e.preventDefault()
        setShowBreedModal(true)
        setModalTitle("Add")
        setAddBreed(true)
        setEditBreed(false)
    }

    const editBreedBtn = (e) => {
        e.preventDefault()
        setShowBreedModal(true)
        setModalTitle("Edit")
        setAddBreed(false)
        setEditBreed(true)
    }

    const deleteBreedBtn = (e) => {
        e.preventDefault()
        setShowBreedModal(true)
        setModalTitle("Delete")
        setAddBreed(false)
        setEditBreed(false)
    }

    const addAllergyBtn = (e) => {
        e.preventDefault()
        setShowAllergyModal(true)
        setModalTitle("Add")
    }

    const editAllergyBtn = (e) => {
        e.preventDefault()
        setShowAllergyModal(true)
        setModalTitle("Edit")
    }

    const deleteAllergyBtn = (e) => {
        e.preventDefault()
        setShowAllergyModal(true)
        setModalTitle("Delete")
    }

    return (
        <div className="d-flex flex-row">
            <div className="zs-admin-content zs-edituser d-flex col-4">
                <div className="d-flex flex-column col-12 m-3">
                    <h1>Species</h1>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={addSpeciesBtn}>Add Species</button>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={editSpeciesBtn}>Edit Species</button>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={deleteSpeciesBtn}>Delete Species</button>
                </div>
            </div>
            <div className="zs-admin-content zs-edituser d-flex col-4">
                <div className="d-flex flex-column col-12 m-3">
                    <h1>Breed</h1>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={addBreedBtn}>Add Breed</button>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={editBreedBtn}>Edit Breed</button>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={deleteBreedBtn}>Delete Breed</button>
                </div>
            </div>
            <div className="zs-admin-content d-flex col-4">
                <div className="d-flex flex-column col-12 m-3">
                    <h1>Allergies</h1>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={addAllergyBtn}>Add Allergy</button>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={editAllergyBtn}>Edit Allergy</button>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={deleteAllergyBtn}>Delete Allergy</button>
                </div>
            </div>
            <Modal
                size="lg"
                show={showSpeciesModal}
                onHide={() => setShowSpeciesModal(false)}
                aria-labelledby='add-modal'
                centered>
                <Modal.Header closeButton className="zs-admin-modal">
                    <Modal.Title id='add=modal'>
                        <h3>{modalTitle} Species</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {addSpecies ? <AddSpecies setShowSpeciesModal={setShowSpeciesModal}/>:
                    (editSpecies ? <EditSpecies setShowSpeciesModal={setShowSpeciesModal}/>:
                    <DeleteSpecies setShowSpeciesModal={setShowSpeciesModal}/>)}
                </Modal.Body>
            </Modal>
            <Modal
                size="lg"
                show={showBreedModal}
                onHide={() => setShowBreedModal(false)}
                aria-labelledby='add-modal'
                centered>
                <Modal.Header closeButton className="zs-admin-modal">
                    <Modal.Title id='add=modal'>
                        <h3>{modalTitle} Breed</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {addBreed ? <AddBreed setShowBreedModal={setShowBreedModal}/>:
                    (editBreed ? <EditBreed setShowBreedModal={setShowBreedModal}/>:
                    <DeleteBreed setShowBreedModal={setShowBreedModal}/>)}
                </Modal.Body>
            </Modal>
            <Modal
                size="lg"
                show={showAllergyModal}
                onHide={() => setShowAllergyModal(false)}
                aria-labelledby='add-modal'
                centered>
                <Modal.Header closeButton className="zs-admin-modal">
                    <Modal.Title id='add=modal'>
                        <h3>{modalTitle} Allergy</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Allergy Modal</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AdminAnimals