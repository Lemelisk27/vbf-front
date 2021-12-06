import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";

function AdminInventory (props) {
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const [showItemModal, setShowItemModal] = useState(false)
    const [showUnitModal, setShowUnitModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [addNewCategory, setAddNewCategory] = useState(true)
    const [editNewCategory, setEditNewCategory] = useState(false)
    const [addNewItem, setAddNewItem] = useState(true)
    const [editNewItem, setEditNewItem] = useState(false)

    const addCategory = (e) => {
        e.preventDefault()
        setShowCategoryModal(true)
        setModalTitle("Add")
        setAddNewCategory(true)
        setEditNewCategory(false)
    }

    const editCategory = (e) => {
        e.preventDefault()
        setShowCategoryModal(true)
        setModalTitle("Edit")
        setAddNewCategory(false)
        setEditNewCategory(true)
    }

    const deleteCategory = (e) => {
        e.preventDefault()
        setShowCategoryModal(true)
        setModalTitle("Delete")
        setAddNewCategory(false)
        setEditNewCategory(false)
    }

    const addItem = (e) => {
        e.preventDefault()
        setShowItemModal(true)
        setModalTitle("Add")
        setAddNewItem(true)
        setEditNewItem(false)
        
    }

    const editItem = (e) => {
        e.preventDefault()
        setShowItemModal(true)
        setModalTitle("Edit")
        setAddNewItem(false)
        setEditNewItem(true)
    }

    const deleteItem = (e) => {
        e.preventDefault()
        setShowItemModal(true)
        setModalTitle("Delete")
        setAddNewItem(false)
        setEditNewItem(false)
    }

    const addUnit = (e) => {
        e.preventDefault()
        setShowUnitModal(true)
        setModalTitle("Add")
    }

    const editUnit = (e) => {
        e.preventDefault()
        setShowUnitModal(true)
        setModalTitle("Edit")
    }

    const deleteUnit = (e) => {
        e.preventDefault()
        setShowUnitModal(true)
        setModalTitle("Delete")
    }

    return (
        <div className="d-flex flex-row">
            <div className="zs-admin-content zs-edituser d-flex col-4">
                <div className="d-flex flex-column col-12 m-3">
                    <h1>Categories</h1>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={addCategory}>Add Category</button>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={editCategory}>Edit Category</button>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={deleteCategory}>Delete Category</button>
                </div>
            </div>
            <div className="zs-admin-content zs-edituser d-flex col-4">
                <div className="d-flex flex-column col-12 m-3">
                    <h1>Items</h1>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={addItem}>Add Item</button>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={editItem}>Edit Item</button>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={deleteItem}>Delete Item</button>
                </div>
            </div>
            <div className="zs-admin-content d-flex col-4">
                <div className="d-flex flex-column col-12 m-3">
                    <h1>Units</h1>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={addUnit}>Add Unit</button>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={editUnit}>Edit Unit</button>
                    <button className="bg-primary text-light col-6 mx-auto rounded mt-5" onClick={deleteUnit}>Delete Unit</button>
                </div>
            </div>
            <Modal
                size='lg'
                show={showCategoryModal}
                onHide={() => setShowCategoryModal(false)}
                aria-labelledby='add-modal'
                centered>
                <Modal.Header closeButton className="zs-admin-modal">
                    <Modal.Title id='add-modal'>
                        <h3>{modalTitle} Category</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {addNewCategory ? <AddCategory setShowCategoryModal={setShowCategoryModal}/>:
                    (editNewCategory ? <EditCategory setShowCategoryModal={setShowCategoryModal}/>:
                    <DeleteCategory setShowCategoryModal={setShowCategoryModal}/>)}
                </Modal.Body>
            </Modal>
            <Modal
                size='lg'
                show={showItemModal}
                onHide={() => setShowItemModal(false)}
                aria-labelledby='add-modal'
                centered>
                <Modal.Header closeButton className="zs-admin-modal">
                    <Modal.Title id='add-modal'>
                        <h3>{modalTitle} Item</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {addNewItem ? <AddItem setShowItemModal={setShowItemModal}/>:
                    (editNewItem ? <EditItem setShowItemModal={setShowItemModal}/>:
                    <DeleteItem setShowItemModal={setShowItemModal}/>)}
                </Modal.Body>
            </Modal>
            <Modal
                size='lg'
                show={showUnitModal}
                onHide={() => setShowUnitModal(false)}
                aria-labelledby='add-modal'
                centered>
                <Modal.Header closeButton className="zs-admin-modal">
                    <Modal.Title id='add-modal'>
                        <h3>{modalTitle} Unit</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Unit Modal</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AdminInventory