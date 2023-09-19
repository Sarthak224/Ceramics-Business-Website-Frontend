import { Button, Col, Input, Modal, ModalBody, ModalFooter, Row, Table } from 'reactstrap';
import { baseURL } from '../../utils/utils';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Select from 'react-select';
import { useFormik } from 'formik';
import NotificationPopup from '../NotificationPopup';
import { ToastContainer, toast } from 'react-toastify';
export default function ProductsAdmin(){

    var navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    var page = searchParams.get("page");
    if(page==null)
    page = 1;
    const [products,setproducts] = useState([]);
    const [openEditPopup,setOpenEditPopup] = useState(false)
    const [openCreatePopup,setOpenCreatePopup] = useState(false)
    const [openDeletePopup,setOpenDeletePopup] = useState(false)

    const [currentProduct,setCurrentProduct] = useState(null);
    const [openSuccessPopup,setOpenSuccessPopup] = useState(false);
    const [openCreateImgPopup,setOpenCreateImgPopup] = useState(false);
    const [openProductDetailsPopup,setOpenProductDetailsPopup] = useState(false);
    const [fileData,setCurrentFileData] = useState([])

    const formik = useFormik({
      initialValues: {
        
          title:"",
          price:"",
          description: "",
          category: "",
          originalPrice:"",
          qty:"",
          // zipcode:"",
          // state:"", 
          // address:"",
          // city:"",
          // phone:""
          
      },
      validate: (values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "Product Title is required";
        }
         if (!values.price) {
          errors.price = "Price is required";
        }
         if (!values.description) {
          errors.description = "Description is required";
        }
         if (!values.category) {
          errors.category = "Category is required";
        }
         if (!values.originalPrice) {
          errors.originalPrice = "Original Price is required";
        }
        if (!values.qty) {
          errors.qty = "Quantity is required";
        }
  //       if (!values.lastname) {
  //         errors.lastname = "Lastname is required";
  //       }
  //       if (!values.phone) {
  //         errors.phone = "Phone no is  required";
  //       }
  //       if (!values.zipcode) {
  //         errors.zipcode = "zipcode is required";
  //       }
       
  //       if (!values.email) {
  //         errors.email = "Email is required"
  //       } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
  //         errors.email = "Not a valid email"
  //       } 
       
  //       if (!values.state) {
  //         errors.state = "State is required";
  //       }
  //       if (!values.address) {
  //         errors.address = "Address is required";
  //       }
  //       if(!values.city){
  //         errors.city = "City is Required";
         
  //       }
  //     //   if(values.password.length>=8){
  //     //     var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  //     //     if(!regularExpression.test(values.password) && values.password.length>=8)
  //     //    errors.password = "password should contain alphanumeric and special characters";

  //     //   }
  //      if(!values.phone.length!=10 && !/^\d+$/.test(values.phone)){
  //   errors.phone ='Phone is Invalid'
  //  }
        return errors;
      },

      onSubmit: function (values) {
        console.log("values");
        //setOpenPopup(true)
      }
  
      
    });



  
   

  function editProduct(product,index){
    // console.log(product,formik)
    // formik.setFieldValue("title",product.title);
    // formik.setFieldValue("title",product.title)
    // formik.setFieldValue("price",product.price)
    // formik.setFieldValue("description",product.description)
    // formik.setFieldValue("category",product.category)
    // formik.setFieldValue("originalPrice",product.original_price)
    // // formik.setFieldValue("title",product.title)
    // console.log(formik.initialValues)
    // formik.setValues({
    //   title:product.title,
    //   price:product.price,
    //   description:product.description,
    //   category:product.category,
    //   originalPrice:product.original_price,

    // })
    // alert(product.title)
    setCurrentProduct({product,index});
   setOpenEditPopup(true);
  }

  const notifySuccess = () => toast.success("Product Deleted Successfully.");

  const notifyFailed = () => toast.error("Failed while deleting product.");


  async function getproducts(){
    try{
    var res = await axios.get(baseURL+"/products/allProducts?page="+page,{});
    console.log(res);
    if(res.status==200){
        setproducts(res.data)
    }
}catch(err){
    alert("Error")
}
  }

  useEffect(()=>{
    getproducts();
  },[])

  async function updateProduct(){
    try{
      var dataBody = {
        id:currentProduct.product._id,
        productData:{
        title:formik.values.title,
        price:formik.values.price,
        description:formik.values.description,
        category:formik.values.category,
        original_price:formik.values.originalPrice,
        qty:formik.values.qty
        }
      }
      var res = await axios.post(baseURL+"/products/updateProduct",dataBody);
      console.log(res);
      if(res.status==200){
        //  alert("Updated")

          setOpenEditPopup(false);
          getproducts();
          setOpenSuccessPopup(true);

      }
  }catch(err){
      alert("Error")
  }
  }
  async function deleteProduct(){
    try{
      var resp = await axios.post(baseURL+"/products/deleteProduct",{id:currentProduct.product._id});
      if(resp.status==200 && resp.data.msg){
        setOpenDeletePopup(false);
        notifySuccess();
        getproducts();

      }
    }
    catch(e){
      console.log(e)
      notifyFailed();
    }
  }


   async function createProduct(){
    try{
      var dataBody = {
        title:formik.values.title,
        price:formik.values.price,
        description:formik.values.description,
        category:formik.values.category,
        original_price:formik.values.originalPrice
        }
      
      var res = await axios.post(baseURL+"/products/createProduct",dataBody);
      console.log(res);
      if(res.status==200){
        //  alert("Updated")

          setOpenCreatePopup(false);
          getproducts();
          setOpenSuccessPopup(true);
          setCurrentProduct({product:res.data})
          setOpenCreateImgPopup(true);
      }
  }catch(err){
      alert("Error")
  }
  }

   async function updateProductImage(img){
    try{
     
      img=[];
      console.log(fileData)
      


      var formData = new FormData();
      console.log(img)
      for(var i=0;i<fileData.length;++i){
        formData.append("productImage", fileData[i]);
      }
      // formData.append('productImage',img);
      formData.append('p_id',currentProduct.product._id)
      var res = await axios.post(baseURL+"/products/updateProductImage",formData);
      console.log(res);
      if(res.status==200){
        //  alert("Updated")
        alert("Updated Image")
        if(openCreateImgPopup)
        setOpenCreateImgPopup(false);

      }
  }catch(err){
    console.log(err)
      alert("Error")
  }
  }
   console.log(fileData)
  // alert(openEditPopup)
    return(

        <div className="admin-pages" style={{flexDirection:"column",padding:"20px",justifyContent:"start"}}>
            {/* <h>products page!</h1> */}
            <Button style={{marginRight:"auto",marginBottom:"20px"}} onClick={()=>setOpenCreatePopup(true)}>Create new Product + </Button>
            <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>   </th>

            <th>Product ID</th>

            <th>Title</th>
            {/* <th></th> */}
            <th>Price</th>
            <th>Action</th>
            {/* <th>Subtotal</th> */}

          </tr>
        </thead>
        <tbody className='admin-tbl'>
          {products.map((val,i)=>{
            return (
                <tr>
                <th scope="row">{i+1}</th>
                <td><img src={val.image[0]} width="60" height="60" /></td>
                <td>{val._id}</td>
                <td>{val.title}</td>
                <td><b>&#8377;</b> {val.price}</td>
                {/* <td>{val.email}</td> */}
                <td style={{display:"flex"}}><i class="fas fa-edit" style={{margin:"15px"}} onClick={()=>editProduct(val,i)}></i><i class="fas fa-trash-alt" onClick={()=>{setOpenDeletePopup(true);setCurrentProduct({product:val})}} style={{margin:"15px"}}></i>
                <i class='fas fa-clipboard-list' style={{margin:"15px"}} onClick={()=>{
                  setCurrentProduct({product:val});
                  setOpenProductDetailsPopup(true)
                }}></i>
                </td>
                {/* <td><b>&#8377;</b> {val.subtotal}</td> */}

              </tr>  
            )
          })
        }
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
        <tfoot>
        <tr>
        <td colSpan={6}>
        <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
        <Button disabled={page<=1?true:false} onClick={()=>window.location.href = ("/admin/products?page="+(--page))}>Prev</Button>
        <Button disabled={products.length<=0?true:false} onClick={()=>window.location.href = ("/admin/products?page="+(++page))}>Next</Button>
        </div>
         </td>
        </tr>
        </tfoot>

      </Table>
      
      <Modal isOpen={openEditPopup} onOpened={async()=>{
    // formik.setFieldValue("title",currentProduct.product.title);
    // formik.setFieldValue("title",currentProduct.product.title)
    // formik.setFieldValue("price",currentProduct.product.price)
    // formik.setFieldValue("description",currentProduct.product.description)
    // formik.setFieldValue("category",currentProduct.product.category)
    // formik.setFieldValue("originalPrice",currentProduct.product.original_price)
    // formik.setFieldValue("title",currentProduct.product.title)
    await formik.setValues({
      title:currentProduct.product.title,
      price:currentProduct.product.price,
      description:currentProduct.product.description,
      category:currentProduct.product.category,
      originalPrice:currentProduct.product.original_price,

    })
      }}    >
        <ModalBody >
        <h5 style={{margin:"10px",fontSize:"15px"}}>Product Title <span style={{color:"red"}}>*</span></h5>
                    <Input type="text" placeholder='Enter Title' name="title" onChange={formik.handleChange}/>{" "}
                  {formik.errors.title && <p style={{color:"red"}}>{formik.errors.title}</p>}
                    <h5 style={{margin:"10px",fontSize:"15px"}}>Price <span style={{color:"red"}}>*</span></h5>
                    <Input type="text" placeholder='Enter Price' name="price" onChange={formik.handleChange}/>{" "}
					{formik.errors.price && <p style={{color:"red"}}>{formik.errors.price}</p>}
                    <h5 style={{margin:"10px",fontSize:"15px"}}>Description <span style={{color:"red"}}>*</span></h5>
                    <Input type="textarea" rows="4" placeholder='Enter Description' name="description" onChange={formik.handleChange}/>{" "}
					{formik.errors.description && <p style={{color:"red"}}>{formik.errors.description}</p>}
                    <h5 style={{margin:"10px",fontSize:"15px"}}>Category <span style={{color:"red"}}>*</span></h5>
                    <Input type="text" placeholder='Enter Category' name="category" onChange={formik.handleChange}/>{" "}
					{formik.errors.category && <p style={{color:"red"}}>{formik.errors.category}</p>}
                    <h5 style={{margin:"10px",fontSize:"15px"}}>Original Price <span style={{color:"red"}}>*</span></h5>
                    <Input type="text" placeholder='Enter original price' name="originalPrice" onChange={formik.handleChange}/>{" "}
					{formik.errors.originalPrice && <p style={{color:"red"}}>{formik.errors.originalPrice}</p>}
          <h5 style={{margin:"10px",fontSize:"15px"}}>Product Quantity <span style={{color:"red"}}>*</span></h5>

          <Input type="text" placeholder='Enter Quantity' name="qty" onChange={formik.handleChange}/>{" "}
					{formik.errors.qty && <p style={{color:"red"}}>{formik.errors.qty}</p>}
           
           <h5 style={{margin:"10px",fontSize:"15px"}}>Product Image <span style={{color:"red"}}>*</span></h5>

                     <input type="file" id="file-id" multiple="multiple" name="productImage"  onChange={(e)=>{
                      
                     // fileData = ( e.target.files)//[0];
                     console.log(e.target.files)
                      setCurrentFileData(e.target.files)
                     }}/>

                     <Button onClick={()=>{if(fileData.length>0)updateProductImage(fileData)}}>Upload Image</Button>
                    {/* <h5 style={{margin:"10px",fontSize:"15px"}}>Zipcode <span style={{color:"red"}}>*</span></h5>
                    <Input type="number" placeholder='Enter Zipcode' name="zipcode" onChange={formik.handleChange}/>{" "}
					{formik.errors.zipcode && <p style={{color:"red"}}>{formik.errors.zipcode}</p>}
                    <h5 style={{margin:"10px",fontSize:"15px"}}>Phone <span style={{color:"red"}}>*</span></h5>
                    <Input type="number" placeholder='Enter Phone'name="phone" onChange={formik.handleChange}/>{" "}
					{formik.errors.phone && <p style={{color:"red"}}>{formik.errors.phone}</p>}
                    <h5 style={{margin:"10px",fontSize:"15px"}}>Emai <span style={{color:"red"}}>*</span></h5>
                    <Input type="email" placeholder='Enter Email' name="email" onChange={formik.handleChange}/>{" "}
					{formik.errors.email && <p style={{color:"red"}}>{formik.errors.email}</p>} */}
 
        </ModalBody>
        <ModalFooter>
          <Button onClick={()=>updateProduct()}>Update </Button>
          <Button  onClick={()=>{setOpenEditPopup(false)}} >Cancel </Button>

        </ModalFooter>
      </Modal>


         <Modal isOpen={openCreatePopup} onOpened={async()=>{
    // formik.setFieldValue("title",currentProduct.product.title);
    // formik.setFieldValue("title",currentProduct.product.title)
    // formik.setFieldValue("price",currentProduct.product.price)
    // formik.setFieldValue("description",currentProduct.product.description)
    // formik.setFieldValue("category",currentProduct.product.category)
    // formik.setFieldValue("originalPrice",currentProduct.product.original_price)
    // formik.setFieldValue("title",currentProduct.product.title)
  
      }}   
      
      >
        <ModalBody >
        <h5 style={{margin:"10px",fontSize:"15px"}}>Product Title <span style={{color:"red"}}>*</span></h5>
                    <Input type="text" placeholder='Enter Title' name="title" onChange={formik.handleChange}/>{" "}
                  {formik.errors.title && <p style={{color:"red"}}>{formik.errors.title}</p>}
                    <h5 style={{margin:"10px",fontSize:"15px"}}>Price <span style={{color:"red"}}>*</span></h5>
                    <Input type="text" placeholder='Enter Price' name="price" onChange={formik.handleChange}/>{" "}
					{formik.errors.price && <p style={{color:"red"}}>{formik.errors.price}</p>}
                    <h5 style={{margin:"10px",fontSize:"15px"}}>Description <span style={{color:"red"}}>*</span></h5>
                    <Input type="textarea" rows="4" placeholder='Enter Description' name="description" onChange={formik.handleChange}/>{" "}
					{formik.errors.description && <p style={{color:"red"}}>{formik.errors.description}</p>}
                    <h5 style={{margin:"10px",fontSize:"15px"}}>Category <span style={{color:"red"}}>*</span></h5>
                    <Input type="text" placeholder='Enter Category' name="category" onChange={formik.handleChange}/>{" "}
					{formik.errors.category && <p style={{color:"red"}}>{formik.errors.category}</p>}
                    <h5 style={{margin:"10px",fontSize:"15px"}}>Original Price <span style={{color:"red"}}>*</span></h5>
                    <Input type="text" placeholder='Enter original price' name="originalPrice" onChange={formik.handleChange}/>{" "}
					{formik.errors.originalPrice && <p style={{color:"red"}}>{formik.errors.originalPrice}</p>}
          <h5 style={{margin:"10px",fontSize:"15px"}}>Product Quantity <span style={{color:"red"}}>*</span></h5>

          <Input type="text" placeholder='Enter Quantity' name="qty" onChange={formik.handleChange}/>{" "}
					{formik.errors.qty && <p style={{color:"red"}}>{formik.errors.qty}</p>}
           
                    {/* <h5 style={{margin:"10px",fontSize:"15px"}}>Zipcode <span style={{color:"red"}}>*</span></h5>
                    <Input type="number" placeholder='Enter Zipcode' name="zipcode" onChange={formik.handleChange}/>{" "}
					{formik.errors.zipcode && <p style={{color:"red"}}>{formik.errors.zipcode}</p>}
                    <h5 style={{margin:"10px",fontSize:"15px"}}>Phone <span style={{color:"red"}}>*</span></h5>
                    <Input type="number" placeholder='Enter Phone'name="phone" onChange={formik.handleChange}/>{" "}
					{formik.errors.phone && <p style={{color:"red"}}>{formik.errors.phone}</p>}
                    <h5 style={{margin:"10px",fontSize:"15px"}}>Emai <span style={{color:"red"}}>*</span></h5>
                    <Input type="email" placeholder='Enter Email' name="email" onChange={formik.handleChange}/>{" "}
					{formik.errors.email && <p style={{color:"red"}}>{formik.errors.email}</p>} */}
 
        </ModalBody>
        <ModalFooter>
          <Button onClick={()=>createProduct()}>Create Product </Button>
          <Button  onClick={()=>{setOpenCreatePopup(false)}} >Cancel </Button>

        </ModalFooter>

      </Modal>

      <Modal isOpen={openCreateImgPopup}>
        <ModalBody>
        <h5 style={{margin:"10px",fontSize:"15px"}}>Product Image <span style={{color:"red"}}>*</span></h5>

<input type="file" name="productImage" multiple="multiple" onChange={(e)=>{
 var fileData = e.target.files[0];

 updateProductImage(fileData);
  
}}/>
        </ModalBody>
      </Modal>

      <Modal isOpen={openDeletePopup}>
        <ModalBody>
          <h5 className='frs' style={{fontWeight:"normal"}}>Delete Product : <span style={{color:"red",fontSize:"16px"}}>{currentProduct && currentProduct.product.title}</span>. Are you sure?</h5>
        </ModalBody>
        <ModalFooter>
          <div style={{display:"flex",justifyContent:"end",width:"100%"}}>
            <Button onClick={deleteProduct} style={{margin:"0px 20px"}}>Yes</Button>
            <Button onClick={()=>setOpenDeletePopup(false)}>Cancel</Button>
          </div>
        </ModalFooter>
      </Modal>


      <Modal isOpen={openProductDetailsPopup} className='coupon-popup-main'>
        <ModalBody>
            {currentProduct && currentProduct.product && <div className='frs' style={{}}>
            <h5 style={{fontWeight:"normal",textAlign:"center",marginBottom:"30px",borderBottom:"1px solid #c5c5c5",paddingBottom:"15px"}}>Product Details</h5>
            {/* <p><b>Product ID: </b> <b></b>{currentProduct.product._id} </p>

            <p><b>Product Title: </b> <b></b>{currentProduct.product.title} </p>
            <p><b>Price: </b> <b>&#8377;</b>{currentProduct.product.price} </p>
            <p><b>Original Price: </b> <b>&#8377;</b>{currentProduct.product.original_price} </p>
            <p><b>Quantity: </b> <b></b>{currentProduct.product.qty} </p> */}
            
            {/* <p><b>Description: </b> <b></b>{currentProduct.product.description} </p> */}
            <Row>
              <Col><b>Product ID: </b></Col>
              <Col><p>{currentProduct.product._id}</p></Col>
            </Row>
            <Row>
              <Col><b>Product Title: </b></Col>
              <Col><p>{currentProduct.product.title}</p></Col>
            </Row>
            <Row>
              <Col><b>Price: </b></Col>
              <Col><p><b>&#8377;</b> {currentProduct.product.price}</p></Col>
            </Row>
            <Row>
              <Col><b>Original Price: </b></Col>
              <Col><p><b>&#8377;</b> {currentProduct.product.original_price}</p></Col>
            </Row>
            <Row>
              <Col><b>Quantity: </b></Col>
              <Col><p>{currentProduct.product.qty}</p></Col>
            </Row>
            <Row>
              <Col><b>Description: </b></Col>
              <Col><p>{currentProduct.product.description}</p></Col>
            </Row>
            {/* <p><b>Product Title: </b> <b></b>{currentProduct.product.title} </p> */}

            </div>}
        </ModalBody>
        <ModalFooter>
        <Button onClick={()=>setOpenProductDetailsPopup(false)}>Close</Button>
        </ModalFooter>
      </Modal>










 <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
       <NotificationPopup open={openSuccessPopup} setOpen={setOpenSuccessPopup} message={"Updated Successfully"}/>
        </div>
    )
}