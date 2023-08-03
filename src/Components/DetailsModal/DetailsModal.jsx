import React from 'react'
import Modal from 'react-modal';
import './DetailsModal.css'
import Editable_Card from '../Editable/Editable_Card';

function DetailsModal(props) {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: '25vw',
            transform: 'translate(-50%, -50%)',
            alignItem: 'center',
            borderRadius: '15px'
        },
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <>
            <div class="card_buttons">
                <button className='show-button btn btn-info' onClick={openModal}>Show More</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='editable'>
                    <h2 className='card-head' ref={(_subtitle) => (subtitle = _subtitle)}>Card Details</h2>
                    <p><span>Title :</span> {props.Title}</p>
                    <p><span>Task : </span>{props.Task}</p>
                    <p><span>Start Date :</span> {props.StartDate}</p>
                    <p><span>End Date :</span> {props.EndDate}</p>
                    <p><span>Assignee : </span>{props.Assignee}</p>
                    <p><span>Description :</span> {props.Description}</p>
                </div>
                <button className='btn btn-primary close-button' onClick={closeModal}>Close</button>
            </Modal>
        </>
    )
}

export default DetailsModal