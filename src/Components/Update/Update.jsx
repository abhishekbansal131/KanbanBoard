import React, {useEffect, useState} from 'react';
 
import Modal from 'react-modal';

function Update(props) {
    const [showEdit, setShowEdit] = useState(false);
    const [inputValue, setInputValue] = useState(props.Title);
    const [description, setDescription] = useState(props.Description);
    const [assignee, setAssignee] = useState(props.Assignee);
    const [startDate, setStartDate] = useState(props.StartDate);
    const [endDate, setEndDate] = useState(props.EndDate);
    const [Task, setTask] = useState(props.Task);
    const [modalIsOpen, setIsOpen] = useState(false);
    let subtitle;
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
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    function submitDetails(event) {
        event.preventDefault();
        const data = JSON.parse(localStorage.getItem("Entries")) || [];
        data.map((board)=>{
            board.cards.map((card)=>{
                if(card.id === props.Id){
                    card.title = inputValue;
                    card.assignee = assignee;
                    card.Task = Task;
                    card.startDate = startDate;
                    card.endDate = endDate;
                    card.desc = description;
                }
            })
        })
        localStorage.setItem("Entries", JSON.stringify(data));
        window.location.reload(false);
        setShowEdit(false);
        closeModal();
    }
    return (
        <>
 <div class="card_buttons">
                <button className='show-button btn btn-info' onClick={openModal}>Update</button>
            </div>            <Modal
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
                                onChange={(e) => setInputValue(e.target.value)} required /></div>

                        <div className='data-input'> <label>Tasks :</label>
                            <input type="text" placeholder="Tasks" value={Task}
                                onChange={(e) => setTask(e.target.value)} required />   </div>

                        <div className='data-input'>  <label>Start Date :</label>
                            <input type="date" placeholder="Start Date" value={startDate}
                                onChange={(e) => setStartDate(e.target.value)} required /> </div>

                        <div className='data-input'> <label >End Date :</label>
                            <input type="date" placeholder="End Date" value={endDate}
                                onChange={(e) => setEndDate(e.target.value)} required />   </div>

                        <div className='data-input'>   <label>Assignee :</label>
                            <input type="text" placeholder="Assignee" value={assignee}
                                onChange={(e) => setAssignee(e.target.value)} required />   </div>

                        <div className='data-input'>  <label>Description :</label>
                            <textarea type="text" placeholder={"Description"} rows={2} cols={28} value={description}
                                onChange={(e) => setDescription(e.target.value)} required /></div>



                        <div className="editable_edit_footer">
                            <button type='submit'>{"Update"}</button>
                            <button onClick={closeModal}>Close</button>
                        </div>



                    </form>
                </div>

            </Modal>
        </>
    )
}

export default Update