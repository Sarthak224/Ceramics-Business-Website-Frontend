import { Link, useLocation, useNavigate } from 'react-router-dom'
import orderSuccessImg from './categories-images/shopping_illustration.svg'

export default function CheckoutSuccess(){

    var location = useLocation();
    var navigate = useNavigate();
    if(!(location.state && location.state.checkoutSuccess)){
        navigate('/')
    }
    localStorage.setItem("cart",JSON.stringify([]))


    return(
        <div style={{  marginTop: "80px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",height:"80vh"
    }}>
   	<div className='frs' style={{display:"flex",alignItems:"center",flexDirection:"column",color:"#333",justifyContent:"space-between",margin:"40px"}}><h3><b>Order placed Successfully! </b><i class="fas fa-check-circle" style={{"color": "#32e81e"}}></i></h3>
    </div>
   <img src={orderSuccessImg} className='page-not-found-img' />
    <h6 className='frs' style={{margin:"10px",color:"#28b8d9",marginTop:"40px",cursor:"pointer"}} onClick={()=> {}}><Link to ='/'>Back to Home Page</Link></h6>
    <h6 className='frs' style={{margin:"10px",color:"#28b8d9",cursor:"pointer"}} onClick={()=> {}}><Link to='/products'>Back to Products Page</Link></h6>


    </div>
    )
}