import logo from './logo.svg';
import './App.css';
import {
  RouterProvider,Route,Routes, useNavigate
} from "react-router-dom";
import { routes,admin_routes } from './routes';
import Navbar from './pages/components/Navbar';
import Footer from './pages/components/Footer';
import { useEffect,useRef,useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import { useDispatch, useSelector } from 'react-redux';
import { assignCartQty, assignOverlay } from './redux/actions/navigation';
import {HashLoader} from 'react-spinners'
import Sidebar from './pages/components/AdminPages/components/Sidebar';
import axios from 'axios';
import { baseURL } from './pages/utils/utils';
function App() {

  var navigate  = useNavigate();
  var location = useLocation();
  var isAdmin = location.pathname.includes('admin')
  const [loadProgress,setProgress] = useState(0);
  
  
  // useEffect(()=>{
  //   window.onbeforeunload = ()=>{
  //     //ref.current
  //     alert("")
  //     setProgress(30);
  //   }
  // })

  var dispatch = useDispatch();
  var openOverlay=useSelector(state=>state.changeOverlayReducer);
  // alert(openOverlay)

  async function verifyLogin(){


    try{

    const token = localStorage.getItem("token");
    if(token == null){
    navigate('/admin/login',{state:{notLoggedIn:true}})
    return;  
  }
    var resData = await axios.post(baseURL+"/api/users/admin/verifyLogin",{},{
      headers:{
        "authorization" : "bearer "+token
      }
    })
    if(resData.status==200){
      if(location.pathname=="/admin/login")
      navigate('/admin/orders?page=1')
      return;
    }
    }catch(e){
      navigate('/admin/login', {state:{notLoggedIn:true}})
    }
   }

  useEffect(()=>{
  window.scrollTo({ top: 0, left: 0, });
   
  console.log(location)
  if(isAdmin && ((location.state && location.state.notLoggedIn == undefined)||location.state==undefined)){
   
    verifyLogin();
  }
  // setTimeout(()=>{
     
    // },2000)
  
  },[location])
  

  useEffect(()=>{
    var productsOnCart = localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[];
    dispatch(assignCartQty(productsOnCart.length))
  },[])

  return (
    
    <div className="App ">
 
    {openOverlay && <div className={'loading-overlay'} style={{position:"fixed"}}>
    <div className='main-sect'>
      <HashLoader size={65} loading={true} color="#965c22" />
      <h3 style={{color:"#333"}}>Loading...</h3>
    </div>
  </div>}
    <div className={isAdmin?'admin-sect-main':''} style={openOverlay?{opacity:0.5}:{}} >
    <LoadingBar progress={loadProgress} color='#f11946' onLoaderFinished={() => setProgress(0)} />

   { !isAdmin ? <Navbar />:<Sidebar /> }
    <Routes>
     { routes.map((val)=>{
      return <Route path={val.path} element={val.element} />
     })
}
    </Routes>
    {/* <Routes>
     { admin_routes.map((val)=>{
      return <Route path={val.path} element={val.element} />
     })
}
    </Routes>      */}
    {!isAdmin && <Footer/>}
    </div>
    </div>
  );
}

export default App;
