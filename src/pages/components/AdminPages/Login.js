import { useEffect } from "react";
import { Button, Input } from "reactstrap";
import { baseURL } from "../../utils/utils";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function AdminLogin(){


   const navigate = useNavigate();
   const notifySuccess = () => toast.success("Logged in Successfully");
   const notifyFailed = () => toast.error("Login Failed");

   

   const formik = useFormik({
    initialValues: {
      
        email:"",
        password:"",
     
        // zipcode:"",
        // state:"", 
        // address:"",
        // city:"",
        // phone:""
        
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = "Not a valid email"
      } 

      if (!values.password) {
        errors.password = "Password is required";
      }
    

      return errors;
    },

    onSubmit: function (values) {
      console.log("values");
      //setOpenPopup(true)
    }

    
  });





   async function validateLogin(){

    try{

    var dataBody={
      email:formik.values.email,
      password:formik.values.password
    }
    var resData = await axios.post(baseURL+"/api/users/admin/login",dataBody)
    if(resData.status==200){
      notifySuccess();
      localStorage.setItem("token",resData.data.token);
      navigate("/admin/orders?page=1")
    }
    }catch(e){
      notifyFailed();
    }
   }

//    useEffect(()=>{
//     validateLogin();
//    },[])



    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100vh"}}>
        <div className="admin-login-form">
        <h3 className="frs" style={{backgroundColor:"#4b545c",color:"white",fontSize:"20px",padding:"10px",textAlign:"left",paddingLeft:"20px"}}><i class="fas fa-user" style={{"color": "#ffffff","marginRight":"30px"}}></i>Admin Login</h3>
         <div style={{padding:"10px 30px"}}>
         <h5 style={{margin:"10px",fontSize:"15px",textAlign:"left"}}>E-mail <span style={{color:"red"}}>*</span></h5>

            <Input type="text" placeholder="Enter email" name="email" onChange={formik.handleChange} style={{marginBottom:"40px"}}/>{" "}
            {formik.errors.email && <p style={{color:"red"}}>{formik.errors.email}</p>}

         <h5 style={{margin:"10px",fontSize:"15px",textAlign:"left"}}>Password <span style={{color:"red"}}>*</span></h5>

            <Input type="password" placeholder="Enter password" name="password" onChange={formik.handleChange} style={{marginBottom:"30px"}} />{" "}
            {formik.errors.password && <p style={{color:"red"}}>{formik.errors.password}</p>}

         <br/>
         <Button onClick={()=>Object.keys(formik.errors).length<=0?validateLogin():alert("Please Fill All Detaills")}>Login</Button>   
        </div>
        </div>
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
 </div>
    );
}