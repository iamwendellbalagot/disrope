import React, {useState, useEffect} from 'react';
import './Modal.css';

const Modal = (props) => {
    const [open, setOpen] = useState(false);
    const closeModal = () => {
        setOpen(false);
    }

    useEffect(() => {
        setOpen(props.open)
    }, [props.open])
    return (
        <div className={`modal ${!open && 'closed'}`} >
            <div className="modal__contents">
                {props.children}
            </div>
            <div className='modal__backdrop' onClick={closeModal}>

            </div>
        </div>
    )
}

export default Modal
