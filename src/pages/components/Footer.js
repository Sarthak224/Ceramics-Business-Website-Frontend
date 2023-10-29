import { Link } from 'react-router-dom';
import logo from '../../logo.png';
export default function Footer(){
    return(
        <footer class="footer">
 <div className=' nav-middle' style={{textAlign:"center",margin:" -10px auto"}}>
          <div className='nav-comp nav-color' style={{marginRight:"0%",marginBottom:"20px"}}>
		    <img src={logo} width={92} height={92}  />
            {/* <span className='brand-text ' style={{marginRight:"10%",marginBottom:"0px"}}>React Pottery</span> */}
          </div>
		</div>
  	 <div class="container">
	  
  	 	<div class="row" style={{justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
  	 		<div class="footer-col">
  	 			<h4 style={{position:"relative"}}>company</h4>
  	 			<ul>
  	 				<li><Link to='/AboutUs'>About us</Link></li>
  	 				<li><Link to="/products">See our Products</Link></li>
  	 				<li><Link to="/contact-us">Connect</Link></li>
  	 				{/* <li><a href="#">affiliate program</a></li> */}
  	 			</ul>
  	 		</div>
  	 		{/* <div class="footer-col">
  	 			<h4 style={{position:"relative"}}>get help</h4>
  	 			<ul>
  	 				<li><a href="#">FAQ</a></li>
  	 				<li><a href="#">shipping</a></li>
  	 				<li><a href="#">returns</a></li>
  	 				<li><a href="#">order status</a></li>
  	 				<li><a href="#">payment options</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4 style={{position:"relative"}}>online shop</h4>
  	 			<ul>
  	 				<li><a href="#">watch</a></li>
  	 				<li><a href="#">bag</a></li>
  	 				<li><a href="#">shoes</a></li>
  	 				<li><a href="#">dress</a></li>
  	 			</ul>
  	 		</div> */}
  	 		<div class="footer-col">
  	 			<h4 style={{position:"relative"}}>follow us</h4>
  	 			<div class="social-links">
  	 				<a  href="https://www.facebook.com/people/Vinkee-Bhasiin-Ceramics/100063774127500/" target="_blank"><i class="fab fa-facebook-f"></i></a>
  	 				{/* <a href="#"><i class="fab fa-twitter"></i></a> */}
  	 				<a  href="https://www.instagram.com/vinkeebhasiin/" target="_blank"><i class="fab fa-instagram"></i></a>
  	 				{/* <a href="#"><i class="fab fa-linkedin-in"></i></a> */}
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>
    )
}