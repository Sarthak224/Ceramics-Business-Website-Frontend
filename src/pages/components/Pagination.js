import { useState,useEffect } from "react";
import ReactPaginate from "react-paginate";
import { baseURL } from "../utils/utils";
import axios from "axios";
export default function Pagination(props){

 // We start with an empty list of items.
 const [pageCount, setPageCount] = useState(0);
 // Here we use item offsets; we could also use page offsets
 // following the API or data you're working with.
 const [itemOffset, setItemOffset] = useState(0);

 var itemsPerPage = 20;
 var itemLength =26;

 async function getTotalPages(){

  try{

    var res = await axios.get(baseURL+'/products/totalProducts');
    setPageCount(parseInt((res.data.data/20)+1));
  }
  catch(e){

    alert(e)

  }

 }


 useEffect(()=>{
  getTotalPages();
 },[])

 useEffect(() => {
   // Fetch items from another resources.
   const endOffset = itemOffset + itemsPerPage;
   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
   setPageCount(Math.ceil(itemLength / itemsPerPage));
 }, [itemOffset, itemsPerPage]);

 // Invoke when user click to request another page.
 const handlePageClick = (event) => {
   const newOffset = event.selected * itemsPerPage % itemLength;
   props.setPage(event.selected+1);
   console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
   setItemOffset(newOffset);
 };



    return (
        <div className='paginate-sect'>
 
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
   
        </div>
    )

}