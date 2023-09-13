import contactIcon from "../../img/receiverName.svg"
import telIcon from "../../img/download.png";
import message from "../../img/download (1).png";
import { useEffect } from "react";

 export   function Contact(){

    useEffect(()=>{
        window.scroll({top:0,behavior:"smooth"})
    },[])

        return (
           <div className=" pl-[250px]">
            <div className=" mt-[60px]">


                 <h1 className=" text-[60px] font-semibold">Contact</h1>
                 <div className=" ml-6">
                    <img src={contactIcon} className=" w-[60px]" alt="..." />
                    <p className=" text-[40px] font-bold">Admin</p>
                    <div >
                
                        <div className=" flex my-5">
                            <img src={telIcon} className=" w-[20px]" />
                            <p className=" mx-4 text-[20px] font-semibold">+234 901721 3200</p>
                        </div>
                        
                        <div className=" flex my-5">
                            <img src={message} className=" w-[20px]" />
                            <p className=" mx-4 text-[20px] font-semibold">hello@primedrop.com</p>
                        </div>
                </div>

                 </div>
            </div>
           </div>
        )
    }