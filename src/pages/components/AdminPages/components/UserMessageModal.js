import React from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'

const UserMessageModal = ({open,setOpen,message}) => {
  return (
    <Modal isOpen={open} className='message-modal'  >
     <ModalHeader>Details Modal
        <Button onClick={()=>setOpen(!open)}><i className='fas fa-times'></i></Button>
     </ModalHeader>
    <ModalBody>
        <div className='user-body-main'>
            <div className='user-info-cols'>
                <i className='fas fa-user-circle user-icon'></i>
            </div>
            <div className='user-info-cols'>
                <span className='usr-detail'>{message.firstname + " " + message.lastname}</span>
                <span className='usr-detail'>{message.email}</span>
                {/* <span>{message.firstname}</span> */}

            </div>
        </div>
        <div className='user-body-main finria-sans' style={{gridTemplateColumns:"100%"}}>
          {message.message}
        </div>
    </ModalBody>
    </Modal>
  )
}

export default UserMessageModal