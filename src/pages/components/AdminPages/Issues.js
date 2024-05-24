import React, { useEffect, useState } from 'react'
import AdminNavbar from './components/AdminNavbar';
import { Button, Input, Table } from 'reactstrap';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../utils/utils';
import { HashLoader } from 'react-spinners';

const Issues = () => {



    const [searchParams, setSearchParams] = useSearchParams();
    const [currentOrder,setCurrentOrder] = useState(false);
    const [openSuccessPopup,setOpenSuccessPopup] = useState(false);
    const [openOrderDetailsPopup,setOpenOrderDetailsPopup] = useState(false);
    const [searchQuery,setSearchQuery] = useState("")
    // const [openStatusDropdown,setOpenStatusDropdown] = useState(false)
    const accessToken = localStorage.getItem("token")
    const [loading,isLoading] = useState(false);
    var page = searchParams.get("page");

    // var se = searchParams.get("page");

    const [userMessages,setUserMessages] = useState([]);


    async function getUserMessages(){
        try{
        var res = await axios.get(baseURL+"/api/contact-us/?",{
          headers:{
            "Authorization":"bearer "+accessToken
          }
        });
        console.log(res);
        if(res.status==200){
            setUserMessages(res.data)
        }
    }catch(err){
        alert("Error")
    }
    isLoading(false)
    
      }


      useEffect(()=>{
        getUserMessages();
        isLoading(true);
      },[])

  return (
    <div className="admin-pages" style={{flexDirection:"column",padding:"20px",justifyContent:"start",overflowX:"auto"}}>
    {/* <h>Orders page!</h1> */}
    <AdminNavbar />
    <div className='order-search-main'>
    <div className='order-search'>
      <Input onChange={(e)=>setSearchQuery(e.target.value)} placeholder='Search something...'/>
      <button className='tbl-search-btn' onClick={()=>{isLoading(true);}}>
        <i className='fas fa-search'/>
      </button>
    </div>
    </div>

    {loading && <HashLoader
  color="#b95f1b"
  size={60}
/>}
            {!loading &&<Table className='admin-tbl'>
        <thead>
          <tr>
            <th>#</th>
            <th>message ID</th>

            <th>First Name</th>
            <th>Last Name</th>

            {/* <th>Last Name</th> */}
            <th>E-mail</th>
            <th>Message</th>
            

          </tr>
        </thead>
        <tbody>
          {userMessages.map((val,i)=>{
            return (
                <tr>
                <th scope="row">{i+1}</th>
                <td>{val._id}</td>
                <td>{val.firstname}</td>
                <td>{val.lastname}</td>
                <td>{val.email}</td>
                <td><p className='user-msg-para'>{val.message}</p></td>
                <td><i class='fas fa-clipboard-list' style={{'font-size':'24px'}} onClick={()=>{
                //   setCurrentOrder(val);
                //   setOpenOrderDetailsPopup(true)
                }}></i></td>
              </tr>  
            )
          })
        }
          {/* <tr>
            <th scope="row">1</th>
            <td>90fy30w82gh9281h</td>
            <td>Abcd Doe</td>
            <td>jd@jd.com</td>
            <td>tho ue psyu spd oefohf pefh opwdfhp; iwdpwjd</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>fat@fat.com</td>
            <td>tho ue psyu spd oefohf pefh opwdfhp; iwdpwjd</td>

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
        
        <td colSpan={7}>
        <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
        <Button disabled={page<=1?true:false} onClick={()=>{
          if(searchQuery){
            window.location.href = ("/admin/orders?page="+(--page)+"&searchedQuery="+searchQuery)
            return;
          }
          window.location.href = ("/admin/orders?page="+(--page))
          }}>Prev</Button>
        <Button disabled={userMessages.length<=0?true:false} onClick={()=>{
          if(searchQuery){
            window.location.href = ("/admin/orders?page="+(++page)+"&searchedQuery="+searchQuery)
            return;
          }
          window.location.href = ("/admin/orders?page="+(++page))
        }}>Next</Button>
        </div>
        
        </td>
        </tr>
        </tfoot>
      </Table>}
    </div>
  )
}

export default Issues