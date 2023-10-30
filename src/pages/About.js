import { Button,Row,Col } from 'reactstrap'
import {ShoppingBag,ShoppingCart} from 'react-feather'
import { Link } from 'react-router-dom'
import about1 from '../About-1.jpg'
import about2 from '../About-2.jpg'
import about3 from '../About-3.jpg'
import Categories from './components/Categories'

export default function About(){
    return(
        <div style={{  marginTop: "110px"
    }}>
 <div className="about-page-top-sect">
     <div style={{margin:"2%",display:"block",textAlign:"left"}}>
    <h1 className='down-top-animate delay-1 ftr italic category-main-sect-title' style={{color:"#999999",fontWeight:"normal",lineHeight:"4.8rem",textAlign:"center"}}>Join Us on this Artistic Journey</h1>
    </div>
    <p className='ftr italic para-mobile' style={{fontSize:"20px",margin:"0% 10%"}}>We invite you to immerse yourself in the world of Vinkee Bhasiin Ceramics, where every piece carries a story and each touch evokes wonder. Thank you for being a part of this artistic expedition. </p>
    </div>  

    <div className='about-body'>
       <div className='about-sect-1 '>
        <h1 className='category-main-sect-title'  ><b>A Self-Taught Odyssey</b></h1>
        <p className='para-mobile' style={{marginBottom:"50px"}}>
        Largely self-taught, I've embraced curiosity as my guiding force in this artistic exploration. This approach has led to a richly diverse portfolio, ranging from functional tableware to sculptural masterpieces. Each piece bears the mark of a personal journey, a testament to the power of self-discovery in art.
        </p>
       </div>


       <div className='about-sect-2 '>
          <Row className='bg-white'>
            <Col md="6" className='about-col mobile-col-hide' style={{padding:"0px"}} >
               <img src={about1} style={{width:"100%",height:"100%",maxHeight:"599px"}} /> 
            </Col>
            <Col className='about-col mobile-col-background1' md="6" style={{alignItems:"left"}}>
            <h1 className='frs' style={{margin:"10px 50px"}}><b>Simplicity and Craftsmanship at the Core</b></h1>
           <p className='frs text-mobile' style={{padding:"60px",textAlign:"left"}}>      At the heart of Vinkee Bhasiin Ceramics lies a dedication to simplicity, handcraftsmanship, and the celebration of functional beauty. With a delicate balance of traditional techniques and contemporary sensibilities, each creation is an embodiment of meticulous care and devotion.</p>
                <Button color="" style={{backgroundColor:"#D5A372",color:"#fff",padding:"5px 15px",marginBottom:"30px"}}  className='about-btn'>Go to</Button>
           
            </Col>

          </Row>
          <Row className='bg-white'>
          <Col className='about-col mobile-col-background2' md="6" style={{alignItems:"left"}}>
          <h1 className='frs' style={{margin:"10px 50px"}}><b>Natural Charm and Unique Character</b></h1>
           <p className='frs text-mobile'  style={{padding:"60px",textAlign:"left"}}>    Every piece exudes a natural, distinctive charm. It is a reflection of a thoughtful design process, one that ensures no two creations are alike. Each work of art carries a unique character, an imprint of its journey from raw clay to finished masterpiece.</p>
                <Button color="" style={{backgroundColor:"#D5A372",color:"#fff",padding:"5px 15px",marginBottom:"30px"}}  className='about-btn'>Go to</Button>
            </Col>
          <Col md="6" className='about-col mobile-col-hide' style={{padding:"0px"}}>
          <img src={about2} style={{width:"100%",height:"100%",maxHeight:"599px"}} /> 

          </Col>

          </Row>
       </div>
       <h1 className='frs about-heading-temp' style={{margin:"10vh 2vh 0px",textUnderlineOffset:"initial",textDecoration:"underline"}}> Shop now by Category <i class="fas fa-shopping-bag" style={{color: "inherit",marginLeft:"30px"}}></i></h1>

       <Categories/>

       <h1 className='frs about-heading-temp' style={{margin:"30vh 0px"}}> <i class="fab fa-instagram" style={{margin:"0px 30px"}}></i>Follow us on Instagram</h1>

    </div>



    



    </div>
    )
}