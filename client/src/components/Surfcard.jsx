import React, { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import './Surfcard.css';

export default function Surfcard({ title, description, id }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [updateTitle, setUpdateTitle] = useState(title);
    const [updateDescription, setUpdateDescription] = useState(description);

    const handleUpdate = async () => {
        alert(`${updateTitle} and ${updateDescription}`)
    }

    const handleDelete = async () => {
        // TODO: popup modal with info to update
    }


    return (
        <>
            <div className="cardDiv">
                <h4 className='headerCard'>{title}</h4>
                <p className='paraCard'>{description}</p>
                <button onClick={handleDelete}><FaRegTrashAlt /></button>
                <button onClick={() => setModalOpen(true)}><FaRegEdit /></button>
            </div>

            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <span className="close-button" onClick={() => setModalOpen(false)}>
                            &times;
                        </span>
                        <h3>Update Form</h3>
                        <form onSubmit={handleUpdate}>
                            <input onChange={(e) => setUpdateTitle(e.target.value)} type="text" className="form-input" value={updateTitle} />
                            <textarea onChange={(e) => setUpdateDescription(e.target.value)} className="form-input" placeholder="Description" value={updateDescription}></textarea>
                            <button type="submit">update</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
