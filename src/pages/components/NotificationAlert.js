import {Modal,ModalBody,ModalFooter,Button} from 'reactstrap'

export default function NotificationAlert(props){
    return(
        <Modal isOpen={props.open}>
	<ModalBody style={{backgroundColor:"#ce7e2ed4",color:'white',display:"flex",alignItems:"center"}}>
    <i class="fas fa-exclamation-triangle" style={{color:"#afb7c5",fontSize:"21px"}}></i><h5>{props.message}</h5>
	</ModalBody>
	<ModalFooter>
		<Button style={{backgroundColor:"#ce7e2ed4",border:"none",marginLeft:"auto"}} onClick={()=>{props.setOpen(false)}}>Done</Button>
	</ModalFooter>
</Modal>
    )
}