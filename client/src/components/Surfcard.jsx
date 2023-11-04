import React, { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import './Surfcard.css';

export default function Surfcard({ title, description, id }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [updateTitle, setUpdateTitle] = useState(title);
    const [updateDescription, setUpdateDescription] = useState(description);

    const handleUpdate = async (e) => {
        try{
            e.preventDefault();
            let response = await fetch(`/api/locations/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: updateTitle,
                    description: updateDescription
                }),
            });
            if (response.ok){
                window.location.reload();
            }
            else{
                alert('something went wrong, try again');
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        
        const shouldDelete = window.confirm("Are you sure you want to delete?");
    
        if (shouldDelete) {
            try {
                let response = await fetch(`/api/locations/${id}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    alert('Successful deletion!');
                    window.location.reload();
                } else {
                    alert('Something went wrong, try again');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    return (
        <>
            <div className="cardDiv">
                <div className='headerDiv'>
                    <h4 className='headerCard'>{title}</h4>
                    <div className='place'></div>
                    <div className='twoButtons'>
                        <button style={{fontSize: '16px'}} onClick={() => setModalOpen(true)}><FaRegEdit /></button>
                        <button style={{fontSize: '16px', marginLeft: '10px'}} onClick={handleDelete}><FaRegTrashAlt /></button>
                    </div>
                </div>
                <p className='paraCard'>{description}</p>
            </div>

            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <span className="close-button" onClick={() => setModalOpen(false)}>
                            &times;
                        </span>
                        <form className='modalForm' onSubmit={handleUpdate}>
                            <div className='inputFlex'>
                                <span className='asteric'>*</span>
                                <input onChange={(e) => setUpdateTitle(e.target.value)} type="text" className="modalInput" value={updateTitle} />
                            </div>
                            <div className='inputFlex'>
                                <span className='asteric'>*</span>
                                <textarea onChange={(e) => setUpdateDescription(e.target.value)} className="modalTextarea" placeholder="Description" value={updateDescription}></textarea>
                            </div>
                            <button className="modalButton" type="submit">update</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
