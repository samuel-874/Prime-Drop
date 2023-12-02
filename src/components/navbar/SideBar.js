import walletIcon from "../../img/wallet.svg";
import walletIcon2 from "../../img/wallet copy.svg";
import accoutIcon from "../../img/account.svg";
import accoutIcon2 from "../../img/account copy.svg";
import historyIcon from "../../img/history.svg";
import historyIcon2 from "../../img/history copy.svg";
import logoutIcon from "../../img/logout.svg";
import contactIcon from "../../img/contact.svg";
import { UserContext } from "../dashboard/DashBoard";
import defaultAvatar from "../../img/profileavatar.webp"
import arrowIcon from "../../img/spatch arrow.svg";
import arrowIcon2 from "../../img/spatch arrow copy.svg";
import logo2 from "../../img/Group 2.svg";
import add from "../../img/add.svg";
import { useContext, useEffect, useState } from "react";
import CustomNavLink from "../navbar/NavLink"
import { useNavigate } from "react-router-dom";
import deliveryLogo from "../../img/deliverFull.png";
import axios from "axios";

 function SideBar(){

   const {     balance, email, fullName, imagePath,phoneNo, token } = useContext(UserContext);
   const navigate = useNavigate()

   const { REACT_APP_B_URL }  = process.env
   const formatter = new Intl.NumberFormat("en-ng",{
      currency:'NGN'
   })

   let image = undefined;
   if(imagePath){
      image = `${REACT_APP_B_URL}${imagePath}`
   }
   

    return (

        <div className="bg-[#f7f8fa] text-white grid grid-rows-[200px,70px,335px]  z-[9999] top-0 bottom-0 left-0 w-[200px] fixed"> 
        <div className=" bg-[#27ac27] align-center flex flex-row">
             <div className="h-[100%] pt-[50px] ml-[20px] mr-auto">
                  <div className="w-[60px]  h-[60px] max-h-[50px] max-w-[50px] rounded-full ">
                      <img className="rounded-full my-auto bg-center h-[100%] w-[100%] bg-cover" src={ image || defaultAvatar} alt="profile"  />
                  </div>
                  <div className="w-[180px] flex flex-col justify-center    h-[45px]">
                     <p className="text-[29px] tracking-tighter leading-5 ml-[-4px] font-[600] ">{fullName || "Users Name"}</p>
                  </div>
                  <div className="w-[100px] h-[40px]">
                      <p className=" text-[12px] my-auto cursor-pointer font-light" onClick={()=>navigate('/dashboard/account')}>View Profile</p>
                  </div>
               
             </div>
        </div>
               <div className=" bg-[green]  pt-[10px] leading-5">
                   <p className="text-[12px] ml-[25px]   ">Wallet Balance </p>
                     <div className="text-[30px] font-[700] h-[40px]  flex justify-around">
                        <p className="w-[125px]  text-left text-ellipsis overflow-hidden ml-[19px] tracking-tight  ">N{ formatter.format(balance) || '0.00'}</p>
                        <img className="w-[35px] mt-[-20px] cursor-pointer" onClick={()=>window.location.assign('/dashboard/wallet/fund')} src={add} />
                     </div>
               </div>
               <div className=" grid grid-rows-[167px,167px] text-[#777F8C] font-[700]">
                  <div className="my-4 leading-8 ml-4 h-40">

                     <CustomNavLink to="" text="Request" icon={arrowIcon2} activeClassIcon={arrowIcon} />
                     <CustomNavLink to="wallet" text="Wallet" icon={walletIcon} activeClassIcon={walletIcon2} />
                     <CustomNavLink to="history" text="History" icon={historyIcon} activeClassIcon={historyIcon2} />
                     <CustomNavLink to="account" text="Account" icon={accoutIcon} activeClassIcon={accoutIcon2} />

                  </div>    
                  <div className="  my-auto ml-4">
                     <div className="bg-[#777F8C] my-2 h-[0.5px] w-[180px] mt-1" ></div>
                     <CustomNavLink to="/signin?loggedOut" text="Logout" icon={logoutIcon} />
                     <div className="bg-[#777F8C] my-2 h-[0.5px] w-[180px]  mt-1" ></div>
                     <CustomNavLink to="contact" text="Contact" icon={contactIcon} activeClassIcon={contactIcon}  />
                     <div className="bg-[#777F8C] my-2 h-[0.5px] w-[180px] mt-1" ></div>
                     <div className=" h-[100px]  pb-[15px]" ><img className="w-[100px] mx-auto ml-[10px] " src={deliveryLogo} /></div>
                  </div>
               </div>

            </div>
    )
 }

 export { SideBar as default }