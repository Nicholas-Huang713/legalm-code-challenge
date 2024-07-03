import React from 'react'
import Modal from '../../components/Modal/Modal';
import {useSelector} from 'react-redux';
import './DetailModal.scss';

export default function DetailModal({isOpen, handleCloseDetailModal}) {
    const { dog, owners } = useSelector((state) => state.dog.dogs);

  return (
    <Modal isOpen={isOpen} onClose={handleCloseDetailModal}>
        {dog.name && owners.length > 0 ? 
        <div className='modal-content-wrapper'>
            <header>
                <h2>{dog.name}</h2>
            </header>
            <div className='modal-section'>
                <div className='modal-spacing'><strong>Owner:</strong> {owners[0].name}</div>
                <div><strong>Exp:</strong> {owners[0].exp}yrs</div>
            </div>
            <div>
                <img src={dog.img} className='modal-image'/>
            </div>
            <div>
            <strong>Favorite Food:</strong> {dog.food}
            </div>
        </div>
            : null
        }

    </Modal>
  )
}
