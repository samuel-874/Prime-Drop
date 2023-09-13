import { useNavigate } from "react-router-dom";
 
 function PopupCard(){
    const navigate = useNavigate();
    return(
        <div className="fixed top-0 bottom-0 left-0 right-0 z-[9999] bg-[rgba(0,0,0,0.8)] cursor-not-allowed ">
        <div  className={` mx-auto  rounded-[10px] h-[160px] cursor-default my-[150px] relative
                 font-[700] text-white text-[22px] 
                 flex flex-col p-[18px] justify-between 
              `} 
           style={{width:'240px',background:'#27ac27'}}>
           <p className=" text-center">Session expired </p>
           <div className="bg-white text-black rounded text-center w-[80px] justify-end text-[18px] h-[40px] cursor-pointer font-roboto  mx-auto mr-[4px]" onClick={()=>navigate('/signin')}><p className="my-2">log in</p></div>
         </div>
      </div>
    )
 }

 export { PopupCard as default }