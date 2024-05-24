import notFoundImg from '../page_not_found.svg';

export default function NotFound(){
    return(
        <div style={{  marginTop: "80px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",height:"80vh"
    ,flexGrow:1}}>
   
   <img src={notFoundImg} className='page-not-found-img' />
    <h4 className='frs' style={{margin:"40px",color:"#3f3d56"}}>Page not Found !</h4>


    </div>
    )
}