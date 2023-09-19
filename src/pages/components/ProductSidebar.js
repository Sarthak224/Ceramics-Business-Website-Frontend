import { Filter, X } from "react-feather";
import { useState } from "react";
import { Button } from "reactstrap";
import { useEffect } from "react";
import { assignFilters } from "../../redux/actions/productFilters";
import { useDispatch } from "react-redux";
export default function ProductSidebar(props){


    var dispatch = useDispatch();
    const [filters,setFilters] = useState({});
    const [disabledButtons,setDisabledButtons] = useState([]);


     function setPriceRange(priceRange){
        var arr = filters.price_range;
        if(arr == undefined)
        arr = [];
        arr.push(priceRange)
        console.log(priceRange)
       setFilters({...filters,price_range:arr})
     
    }
    
    function disableButton(index){
        var arr = [...disabledButtons];
        arr.push(index)
        setDisabledButtons([...arr])
    }


    useEffect(()=>{
        console.log(filters)
        dispatch(assignFilters(filters))
    },[filters])

    return(
        <div className={"product-sidebar-filter"+" "+props.sidebarClass}  style={{overflowY:"auto"}}   >
         <div style={{width:"100%",textAlign:"end"}}>
         <X onClick={()=>{props.setSidebarClass("")}} className="prod-sidebar-close-btn" size={20} />
         </div>
         <h1>Sort By</h1>
         <p style={filters.sort== undefined?{color:"#333"}:{}} onClick={()=>setFilters({...filters,sort:undefined})}>Default</p>
         <p style={filters.sort==-1?{color:"#333"}:{}} onClick={()=>setFilters({...filters,sort:-1})}>Price: High to Low</p>
         <p style={filters.sort==1?{color:"#333"}:{}} onClick={()=>setFilters({...filters,sort:1})}>Price: Low to High</p>

         <hr className="img-sep" />

         <h1>Price Filter</h1>
         <div style={{display:"flex",flexWrap:"wrap"}}>
        <Button color="" disabled={disabledButtons.includes(1)?true:false} className="button-17" style={{padding:"0px 20px",margin:"10px"}} onClick={()=>{setPriceRange({min:100,max:400});disableButton(1)}}>&#8377;100 - &#8377;400</Button>
        <Button color="" disabled={disabledButtons.includes(2)?true:false} className="button-17" style={{padding:"0px 20px",margin:"10px"}} onClick={()=>{setPriceRange({min:400,max:900});disableButton(2)}}>&#8377;400 - &#8377;900</Button>
        <Button color="" disabled={disabledButtons.includes(3)?true:false} className="button-17" style={{padding:"0px 20px",margin:"10px"}} onClick={()=>{setPriceRange({min:900,max:1500});disableButton(3)}}>&#8377;900 - &#8377;1500 </Button>
        <Button color="" disabled={disabledButtons.includes(4)?true:false} className="button-17" style={{padding:"0px 20px",margin:"10px"}} onClick={()=>{setPriceRange({min:1500,max:2500});disableButton(4)}}>&#8377;1500 - &#8377;2500</Button>

        <hr className="img-sep" />
        <Button color="" style={{color:"#fff",backgroundColor:"#D5A372",marginLeft:"30px"}} className="button-7" onClick={()=>{setFilters({});setDisabledButtons([]);}}>Reset Filters <Filter size={20} /></Button>


         </div>
        </div>
    );
}