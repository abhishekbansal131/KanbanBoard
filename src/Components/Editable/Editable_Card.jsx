import React, { useState } from 'react'
import './Editable_Card.css'
import Modal from 'react-modal';

function Editable_Card(props) {
    const [showEdit, setShowEdit] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [description, setDescription] = useState("");
    const [assignee, setAssignee] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [Task, setTask] = useState("");

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function submitDetails(event) {
        event.preventDefault();
        if (props.onSubmit) props.onSubmit(inputValue, description, startDate, endDate, assignee, Task)
        setShowEdit(false);
        setInputValue("");
        setDescription("");
        setAssignee("");
        setEndDate("");
        setTask("");
        setStartDate("");
        closeModal();
    }
    return (<>
        <p className={`editable_display ${props.displayClass || ""}`} onClick={openModal}>{props.text || "Add Card"}</p>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >

            <div className='editable'>
                <form className={`editable_edit ${""}`} onSubmit={submitDetails}>
                    <h2 className='card-head' ref={(_subtitle) => (subtitle = _subtitle)}>Card Details</h2>

                   <div className='data-input'> <label>Title  :</label>
                    <input type="text" placeholder={"Title"} autoFocus value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}  required /></div>

                        <div className='data-input'> <label>Tasks :</label>
                    <input type="text" placeholder="Tasks"  value={Task}
                        onChange={(e) => setTask(e.target.value)}  required />   </div> 

                       <div className='data-input'>  <label>Start Date :</label>
                    <input type="date" placeholder="Start Date"  value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}  required/> </div>

                       <div className='data-input'> <label >End Date :</label>
                    <input type="date" placeholder="End Date"  value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}  required />   </div>   

                      <div className='data-input'>   <label>Assignee :</label>
                    <input type="text" placeholder="Assignee"  value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}  required />   </div>   

                       <div className='data-input'>  <label>Description :</label>
                    <textarea type="text" placeholder={"Description"} rows={2} cols={28} value={description}
                        onChange={(e) => setDescription(e.target.value)}  required /></div>



                    <div className="editable_edit_footer">
                        <button type='submit'>{props.buttonText || "Add"}</button>
                        <button onClick={closeModal}>Close</button>
                    </div>



                </form>
            </div>

        </Modal>
    </>

    )
}

export default Editable_Card