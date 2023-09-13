import axios from "axios";
import backIcon from "../../../../img/back.svg";
import closeIcon from "../../../../img/close.svg";
import { AnimatePage } from "../../../general/AnimatePage";
import { useContext, useEffect, useState } from "react";
import { Authenticated, UserContext } from "../../DashBoard";
import { useNavigate } from "react-router-dom";


function HelpDelete({updateHelpPage}) {

    const navigate = useNavigate()

    const  updateAuth = useContext(Authenticated);

    const { REACT_APP_AUTH_BASE_URL } = process.env;
    const [ Bearer,updateBearer] = useState();
   
                


    function handleSubmit(e){
        e.preventDefault();
        axios({
            method:'post',
            url:`${REACT_APP_AUTH_BASE_URL}/contact_support`,
            headers:{'Authorization':`Bearer ${Bearer}`, 'Content-Type':'application/json'},
            data:{ subject:'Acount deletion',content:'',orderId:0}
        }).then((response)=>{
            console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        const  token  = localStorage.getItem('token')
        if(token === undefined || token === null){
            navigate('/signin?loggedOut')
        }else{
            updateBearer(token)
        }
    },[])


 
    return (

        <AnimatePage>
        <div className="  h-[100%] rounded-2xl py-4 px-5 w-[100%]  ">
            <div className=" flex justify-between mx-auto items-center h-[40px] w-[400px]">
                <div className=" flex  justify-between">
                    <img src={backIcon} alt='...' className=" w-[25px] cursor-pointer" onClick={()=>updateHelpPage((oldState)=>{return{...oldState,index:0}})} />
                    <p className=" mx-4 font-bold  text-[20px]">My package was not delivered</p>
                </div>


            </div>
            <div className=" mb-6">
                <div className=" "><p className=" ml-[50px] text-[14px] text-[#777F8C] tracking-tighter">If you can figure it out, you can contact support team.</p></div>

            </div>
            <form onSubmit={handleSubmit} className=" w-[100%] flex flex-col my-4">
                <div className=" w-[410px] mx-auto">
                    <div className=" text-[15px] text-[#1D293F] leading-5 tracking-tight ">
                        <p className=" my-4">We're so sorry to say goodbye! But of course we respect your decision and that's why you can unsubscribe whenever you want. We will delete all your personal data, deactivate your account and send you a confirmation email.</p>
                        <p className=" my-4">If you would like us to delete your data, please tell below.</p>
                        <p className=" my-4">And we also want you to know that, whenever you want to return, we’ll be waiting for you with the doors open and the engine running!</p>
                    </div>

                    <div className=" mt-[80px] mb-5 "><p className=" text-center">Was this helpful? If you need more help</p></div>
                    <button type="submit" className=" flex justify-around items-center h-[50px] w-[400px] rounded-md border-[1px] border-[#A5A9B2] bg-[#E2CCFD] text-white">Contact support</button>
                </div>
            </form>
            </div>
        </AnimatePage>
        )
}

 export { HelpDelete }