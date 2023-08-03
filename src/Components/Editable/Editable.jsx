import React, { useState } from 'react'
import './Editable.css'
import Modal from 'react-modal';


function Editable(props) {
    const [showEdit, setShowEdit] = useState(false);
    const [inputValue, setInputValue] = useState("");
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
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
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
                <form className={`editable_edit ${""}`} onSubmit={(event) => {
                        event.preventDefault();
                        if (props.onSubmit) props.onSubmit(inputValue)
                        setShowEdit(false);
                        setInputValue("");
                        closeModal();
                    }}>
                                <h2  className="board-heading" ref={(_subtitle) => (subtitle = _subtitle)}>Column Title</h2>

                        <input type="text" placeholder={"Title"} autoFocus value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} required/>

                        <div className="editable_edit_footer">
                            <button type='submit'>{props.buttonText || "Add"}</button>
                            <button onClick={closeModal}>close</button>
                        </div>
                    </form>
                    </div> 
                    
              </Modal>
              </>  

    )
}

export default Editable