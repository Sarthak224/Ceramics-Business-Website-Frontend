import {Modal,ModalBody,ModalFooter,Button} from 'reactstrap'

export default function NotificationPopup(props){
    return(
        <Modal isOpen={props.open}>
	<ModalBody style={{backgroundColor:"#ce7e2ed4",color:'white',display:"flex",alignItems:"center"}}>
   <i class="fas fa-check-circle" style={{color:"white",margin:"0px 10px",fontSize:"21px"}}></i><h5>{props.message}</h5>
	</ModalBody>
	<ModalFooter>
		<Button style={{backgroundColor:"#ce7e2ed4",border:"none",marginLeft:"auto"}} onClick={()=>{props.setOpen(false)}}>Done</Button>
	</ModalFooter>
</Modal>
    )
}