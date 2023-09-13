import { Outlet, useLocation } from "react-router-dom";
import backIcon from "../../../../img/back.svg";



    function Wallet(){

        const location  = window.location
        
        return(
            <div  className=" pl-[250px] pt-[20px]  w-[screen] h-[800px] " >
            
                <div className="  flex  justify-start " >
                    <img src={backIcon} onClick={()=>
                        location.pathname === '/dashboard/wallet/fund' ? location.assign('/dashboard/wallet') : location.assign('/dashboard')
                    } className="w-5 m-1 cursor-pointer " />
                    <p className=" text-[18px] font-semibold"> {'Wallet' }</p>
                </div>
                <div >
                    <Outlet />
                </div>
            </div>
  
        )
    }

    export { Wallet as default }