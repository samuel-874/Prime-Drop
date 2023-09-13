import backIcon from "../../../../img/Group 5.svg"
import lockIcon2 from "../../../../img/bxs-lock 1.svg"
import MessageIcon from "../../../../img/Group 314.svg"
import ContactIcon from "../../../../img/Group 314 (1).svg";
import lockIcon3 from "../../../../img/lock.svg";
import logo from "../../../../img/Group 2.svg";
import flagIcon from "../../../../img/nigeria svg.png";
import lockIcon from "../../../../img/bxs-lock 2.svg";
import { useRef } from "react";
import defaultAvatar from "../../../../img/profileavatar.webp"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../DashBoard";
import { useSpringRef } from "@react-spring/web";
import { Outlet } from "react-router-dom";

 
 function Account(){

    const location = window.location
        
        return(
        <div className="form px-[4%] py-[1%]" style={{backgroundColor:'#FFFF'}}>
            <div className="  flex ml-[210px]  justify-start " >
                <img src={backIcon} onClick={()=>
                    location.pathname === '/dashboard/account' ? location.assign('/dashboard') : location.assign('/dashboard/account')
                } className="w-5 m-1 cursor-pointer " />
                <p className=" text-[24px] mx-2 font-bold"> {'Account' }</p>
            </div>

            <div className="flex flex-col leading-8 w-96  lg:w-[1030px] md:w-[100%]   md:px-[29%] mx-auto   px-[15%]  lg:px-[35%] py-[50px]">
            <Outlet />

            </div>
        </div>
        )
   
    }

    export { Account as default }