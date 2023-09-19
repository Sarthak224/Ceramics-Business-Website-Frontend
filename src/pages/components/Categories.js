import categoryImage1 from'./categories-images/category1.jpg';
import categoryImage2 from'./categories-images/category-2.jpg';
import categoryImage3 from'./categories-images/category-3.jpg';
import {ArrowRight} from 'react-feather'
import {Row,Col } from 'reactstrap'

export default function Categories(){
    return(
        <div className="categories-main-sect" style={{marginTop:"90px"}}>
          <div>
            <h2 className='ftr' style={{fontWeight:"normal",fontSize:"39px",fontStyle:"italic"}}>Categories</h2>
            <div className="categories-box-parent" style={{margin:"auto"}}>
            <Col md="7" className="category-col" style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <h2 style={{fontWeight:"bold",fontSize:"32px",color:"rgb(153, 153, 153)"}}>All Categories</h2>
            <h2 style={{fontWeight:"bold",fontSize:"19px",color:"#ffffff"}}>See our categories </h2>

            </Col>
            <Col md="3" className="category-col2">

             <Row className='category-subrow1'>
                <Col md="6" className='item' style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <h2 style={{fontWeight:"bold",fontSize:"22px",color:"rgb(153, 153, 153)"}}>Crockery</h2>
            <h2 style={{fontWeight:"normal",fontSize:"12px",color:"white",border:"2px solid white", padding:"4px 10px",cursor:"pointer"}}>view <ArrowRight size={10}/> </h2>

                </Col>
                <Col md="6" className='item2' style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <h2 style={{fontWeight:"bold",fontSize:"22px",color:"rgb(153, 153, 153)"}}>Vases</h2>
            <h2 style={{fontWeight:"normal",fontSize:"12px",color:"white",border:"2px solid white", padding:"4px 10px",cursor:"pointer"}}>view <ArrowRight size={10}/> </h2>

                </Col>
             </Row>


             {/* <Row className='category-subrow2'>
               <Col md="5" className='item' style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <h2 style={{fontWeight:"bold",fontSize:"22px",color:"rgb(153, 153, 153)"}}>Gift products</h2>
            <h2 style={{fontWeight:"normal",fontSize:"12px",color:"white",border:"2px solid white", padding:"4px 10px",cursor:"pointer"}}>view <ArrowRight size={10}/> </h2>

               </Col>
               <Col md="5" className='item' style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <h2 style={{fontWeight:"bold",fontSize:"22px",color:"rgb(153, 153, 153)"}}>All Products</h2>
            <h2 style={{fontWeight:"normal",fontSize:"12px",color:"white",border:"2px solid white", padding:"4px 10px",cursor:"pointer"}}>view <ArrowRight size={10}/> </h2>

               </Col>
             </Row> */}
             {/* <div className='category-subrow1'>
             </div>


             <div className='category-subrow2'>
             </div> */}



             </Col>
            </div>
          </div>
        </div>
    );
}