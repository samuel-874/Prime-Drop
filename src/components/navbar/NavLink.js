import { useEffect, useState } from "react";
import activeIcon from "../../img/activeIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";


    function NavLink({text,to,icon,activeClassIcon}){

        const navigate = useNavigate();
        const location = useLocation();

        const [active,toggleActive] = useState(false)

        useEffect(()=>{
    
            if(location.pathname === `/dashboard/${to}` || location.pathname === `/dashboard${to}` || location.pathname.startsWith(`/dashboard/${to}/`)){
               toggleActive(true)
            }else{
                toggleActive(false)
            }
        },[window.location.pathname])


        return(
            <div onClick={()=>{navigate(to)}} className="cursor-pointer">
            { <img src={active ? activeClassIcon : icon} 
              className="inline-block w-5 mx-1 text-[#777F8C]" />}
              
              <p style={{color:active ? '#4d4e51':'#777F8C',display:'inline-block',marginRight:'4px' }}>{text}</p>
               { active && <img className="inline-block w-7" src={activeIcon} alt="..." />}
            </div> 
        )
        
    }
    

    export { NavLink as default }