import { ChevronDown, Menu, Minus, Plus, RefreshCw, ShoppingBag } from "react-feather"
import { Link, useNavigate } from "react-router-dom"
import { DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown, ModalHeader, ModalBody, Modal, ModalFooter, Button } from "reactstrap"
import p1 from '../product-images/product-1.png'
import p2 from '../product-images/product-2.png'
import p3 from '../product-images/product-3.png'
import p4 from '../product-images/product-4.png'
import p5 from '../product-images/product-5.png'
import p6 from '../product-images/product-6.png'
import p7 from '../product-images/product-7.png'
import p8 from '../product-images/product-8.png'
import p9 from '../product-images/product-9.png'
import p10 from '../product-images/product-10.png'
import p12 from '../product-images/product-12.png'
import p13 from '../product-images/product-13.png'
import p14 from '../product-images/product-14.png'
import p15 from '../product-images/product-15.png'
import p16 from '../product-images/product-16.png'
import p17 from '../product-images/product-17.png'
import p18 from '../product-images/product-18.png'
import p19 from '../product-images/product-19.png'
import p20 from '../product-images/product-20.png'
import p21 from '../product-images/product-21.png'
import BeatLoader from 'react-spinners/BeatLoader'
import p22 from '../product-images/product-22.png'
import notFoundImage from './utils/Icons/not-load-img.png';
import { useEffect, useState } from "react"
import { baseURL } from "./utils/utils"
import axios from "axios"
import Pagination from "./components/Pagination"
import ProductSidebar from "./components/ProductSidebar"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import { assignFilters } from "../redux/actions/productFilters"
import { assignCartQty } from "../redux/actions/navigation"
import ProductCategoryTabs from "./components/ProductCategoryTabs"
import { css } from "jquery"

export default function Products() {


  var dispatch = useDispatch();

  var navigator = useNavigate();
  const [products, setProducts] = useState([]);
  const [retryApi, setRetry] = useState(true);
  const [page, setPage] = useState(1);
  const [errorComponent, setErrorComponent] = useState(false);
  const [loader, setLoader] = useState(false);

  const [productData, setProductData] = useState({});
  const [qty, setQty] = useState(1);
  const [cartPopup, setCartPopup] = useState(false);
  const [sidebarClass, setSidebarClass] = useState("");
  const [parentCategory, setParentCategory] = useState("All")


  var productFilters = useSelector(state => state.productFilterReducer);




  async function getProducts() {
    setLoader(true)

    try {

      var url = baseURL;
      var productURL = baseURL + "/products/?page=" + page;
      if (productFilters.category) {
        productURL = productURL + "&category=" + productFilters.category
      }
      var res = await axios.post(productURL, { filters: productFilters }, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      });
      console.log(res.data)

      if (res.data) {

        res.data = res.data.map((val) => {

          if (val.image)
            //  val.image = val.image.replace("localhost","192.168.29.69")
            return val;
        })
        console.log(res.data)
        // alert(page)

        setProducts([...res.data]);
      }

      setErrorComponent(false);
    } catch (err) {
      // alert(err)
      console.log(err)
      setErrorComponent(true);
    }
    setLoader(false)

  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, });
    getProducts();
  }, [page, productFilters]);



  function addProductToCart(product_id) {
    var data = localStorage.getItem("cart");
    if (data) {

      data = JSON.parse(data);
      var isIdPresent = false
      data.map(val => {
        if (val.product_id == product_id) {
          isIdPresent = true;
        }
      })
      if (isIdPresent) {
        var tempData = data;
        for (var i = 0; i < tempData.length; ++i) {
          if (tempData[i].product_id == product_id)
            tempData[i].qty = qty;
        }
        data = tempData;
      } else
        data.push({
          product_id,
          qty,
        })
    }
    else {
      data = [{
        product_id,
        qty,
      }]

    }

    dispatch(assignCartQty(data.length));
    localStorage.setItem("cart", JSON.stringify(data));
    setCartPopup(false);
    notifySuccess();
  }


  console.log(products)

  const notifySuccess = () => toast.success("Successfully added on Cart.");

  return (
    <div className="product-sect-main" style={{ marginTop: "120px", }}>

      <ProductCategoryTabs setCategory={setParentCategory} parentCategory={parentCategory} />
      <h3 className="product-title-main finria-sans" style={{ marginBottom: "40px", position: "relative", textAlign: "center", marginTop: "40px", marginLeft: "auto", marginRight: "auto" }}><span style={{ backgroundColor: "#ffffff", padding: "0px 20px", marginBottom: "0px" }}>Our Products</span></h3>


      <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
        {!(errorComponent) && <ProductSidebar parentCategory={parentCategory} sidebarClass={sidebarClass} setSidebarClass={setSidebarClass} />}
        <div className="product-sect-main" style={{ width: "calc(99vw - 390px)", position: "relative", margin: "auto" }}>
          <div style={{ width: "100%", textAlign: "left", marginLeft: "30px", display: "flex", alignItems: "center" }}>
            <Menu className="prod-sidebar-open-btn" size={20} style={{ cursor: "pointer" }} onClick={() => setSidebarClass("prod-sidebar-active")} /> <span className="finria-sans prod-sidebar-open-text" style={{ marginTop: "6px", marginLeft: "20px" }}>Open Filters</span>
          </div>
          {/* onClick={()=>navigator("/product-view?product_id="+val.detail_id+"&product="+val.title)} */}
          {(products.length > 0 && !errorComponent) ? products.map((val, i) => {
            return (
              <div className="product-item finria-sans"  >
                <img className="prod-col1 prod-img" src={val.image} onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "" + notFoundImage;
                  currentTarget.setAttribute("class", 'error-img');
                }} />
                <hr className='img-sep prod-sep-line' />
                <div className="prod-col2">
                  {/* <h3 className="category-text"><span className="category-label" style={{color:"#0d4471d1"}}>Category</span> - {val.category}</h3> */}

                  <h3 className="product-title finria-sans">{val.title}</h3>
                  <span style={{ padding: "1px" }}><span><b>Price</b></span>: &#x20b9; {val.price}</span><span style={{ fontWeight: "bold", color: "rgb(29, 217, 23)" }}> {(((val.original_price - val.price) / val.original_price) * 100).toFixed(2)} % Off </span><br />
                  <p style={{ padding: "1px", color: "rgb(109 91 91)", marginTop: "5px", marginBottom: "0px" }} className="f1" >Qty: <b style={{ fontSize: "12px", color: "black" }}>{val.qty > 10 ? "in Stock" : val.qty <= 0 ? <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span> : <span style={{ color: "red", fontWeight: "bold" }}>only {val.qty} left</span>}</b></p>

                  <Link style={{ color: "white", textDecoration: "none" }} to={"/product-view?product_id=" + val.detail_id + "&product=" + val.title}><button disabled={val.qty == 0 ? true : false} className="add-cart-btn vertical-btn-marg finria-sans" >View <i class="fas fa-shopping-cart" style={{ color: "#f5f5f5" }}></i></button></Link>
                  <button onClick={() => { setProductData(val); setCartPopup(true) }} style={{ marginTop: "5px", marginBottom: "10px" }} disabled={val.qty <= 0 ? true : false} className="add-cart-btn vertical-btn-marg finria-sans" ><span onClick={(e) => e.preventDefault()} style={{ color: "white", textDecoration: "none", }} >Add Cart <i class="fas fa-shopping-cart" style={{ color: "#f5f5f5" }}></i></span></button>

                </div>
              </div>
            )
          }) : (errorComponent) ?
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh", flexDirection: "column", margin: "auto" }}>
              <i class="fas fa-exclamation-triangle" style={{ color: "#afb7c5", fontSize: "155px" }}></i>
              <p style={{ color: "#333", fontWeight: "bold", fontSize: "21px", marginTop: "40px" }}>Unable to Load Products...</p><p className="refresh-text" onClick={() => { setPage(new Number(page)); setErrorComponent(false) }}>Retry <RefreshCw size={10} /> </p>
            </div> : (products.length == 0 && !loader) ? <div className="product-not-found-sect" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh", flexDirection: "column", margin: "auto" }}>
              <i class="fas fa-search-minus" style={{ "color": "#c9c9d6", marginBottom: "20px", fontSize: "37px" }}></i>
              <p style={{ color: "#afb7c5", marginTop: "15px" }}>No products Found</p>
            </div> : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh", flexDirection: "column", margin: "auto" }}>
              <BeatLoader size={25} loading={true} color="#965c22" />
              <p style={{ color: "#afb7c5", marginTop: "15px" }}>Loading Products...</p>
            </div>
          }
        </div>
      </div>
      <Pagination setPage={setPage} />


      <Modal isOpen={cartPopup}>
        <ModalHeader>Select Quantity:</ModalHeader>
        <ModalBody>
          <div style={{ border: "1px solid #c5c5c5", width: "120px", height: "35px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px" }}>
            <Plus className='button-7 add-del-btn' onClick={() => { if (qty < 3 && qty < productData.qty) setQty(qty + 1) }} size={35} />
            <span style={{ padding: "19px" }}>{qty}</span>
            <Minus className='button-7 add-del-btn' onClick={() => { if (qty > 0) setQty(qty - 1) }} size={35} />
          </div>

        </ModalBody>
        <ModalFooter>
          <Button className="button-7" color="" style={{ marginLeft: "20px", backgroundColor: "#D5A372", color: "#fff" }} onClick={() => addProductToCart(productData.detail_id)}>Add to Cart</Button>
          <Button className="button-7" color="" style={{ marginLeft: "20px", backgroundColor: "#D5A372", color: "#fff" }} onClick={() => { setCartPopup(false); setQty(1); }}>Cancel</Button>

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
    </div>
  )
}