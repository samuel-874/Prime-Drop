import BackIcon from "../../../img/Group 5.svg";
import lockIcon from "../../../img/bxs-lock 2.svg";
import ContactIcon from "../../../img/Group 314 (1).svg";
import infoIcon from "../../../img/info.svg"
import { Link } from "react-router-dom";
import logo from "../../../img/Group 2.svg";
import { sendResetPasswordOtp, sendVerificationMail, validateForm, validateResetPasswordOtp } from "../../../service/service";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../app/loadingSplice";


 function PasswordResetConfirmation(){

    const dispatch = useDispatch()

    const [ otp,updateCode ] = useState('');
    const [ lineColor ,changeLineColor ] = useState('#777F8C');
    const [ errorMessage, addErrorMessage ] = useState()


    const searchParam = window.location.search
    if (searchParam === undefined) addErrorMessage(`You are not permited to access this endpoint`)
     const user = new URLSearchParams(searchParam).get('user')

     function handleSubmit(e){
             
            e.preventDefault();
                
                 dispatch(startLoading())
               
           
                        addErrorMessage(validateForm(otp[0],`otp`)) 
                
                            dispatch(stopLoading())
                                if(otp !== '' && otp !== undefined && otp[0].length === 6){
                                   validateResetPasswordOtp(user,otp)
                                }
                            
      
                  
                     
                
                     
                 
            }
            
       
     
          
        
      

    



    return(
        <div className="form px-[4%] py-[1%] ">
            <div className="form-spatch-logo w-[100px]" >
                <img  src={logo} />
            </div>
 
            <div className="flex flex-col leading-8 justify-content-left w-[1000px] ml-[57px]  px-[35%] py-[50px]">
                <div className="w-[20px] ">
                    <img src={BackIcon} />
                </div>
                <div className="my-[16px] ">
                    <h1 className="text-[24px] text-start font-bold  m-[0]">Verification.</h1>
                    <h3 className="font-normal w-[280px] text-[13px] leading-[18px] text-[#777F8C]" >We’ve sent a verification code to your detail:
                     <strong className="text-[#444547] block">{user}</strong></h3>
                </div>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="mt-[10px] mb-[10px] ">
                        <img className="w-[18px] inline-block" src={lockIcon} />
                        <input 
                            name="otp"  
                            type="number"  
                            value={otp} 
                            onFocus={()=>changeLineColor('#7000F6')} 
                            onAbort={()=>changeLineColor('#777F8C')}
                            onChange={(e)=>updateCode([e.target.value])} 
                            className="w-[80%] align-left bg-inherit text-[#7000F6] text-[16px] font-medium focus:outline-none ml-6" 
                            placeholder="Enter code" 
                        />
                        <div className={`bg-[${lineColor}] h-[1.5px] w-[240px] mt-1`} ></div>
                    </div>

                    <button className="bg-[#7000F6] h-[54px] text-white w-[240px] rounded-[10px]  my-[20px]" type="submit">Continue to reset</button>
                    <p className="w-[240px] tracking-wide leading-4 font-normal text-[12px] text-[#7000F6] my-[10px]">Didn’t get the mail?</p>
                    <p className="w-[240px] tracking-wide leading-4 font-normal text-[13px] text-[#777F8C]">Verify that your email address is correct,
                    or check your spam folder.</p>
                    <button onClick={()=>sendResetPasswordOtp(user)} className="bg-[#FFFFFF] h-[54px] text-[#777F8C] w-[240px] rounded-[10px]  my-[20px] ">Resend code</button>
                    <p className="w-[240px] tracking-wide leading-4 font-normal text-[12px] text-[#7000F6]">
                        Or RESTART
                    </p>
                </form>
            </div>

            { 
                errorMessage &&
                <div className="lg:h-[120px] h-[90px] justify-around rounded flex lg:w-[250px] absolute right-6 top-6 shadow text-[#4A5466] object-right-top p-1 lg:p-4">
                     <div className="w-[70%] text-left m-0">
                            <strong className="text-[black] text-center font-[400] sm:text-[14px]"> Error!</strong>
                            <p className="lg:text-[14px] text-[10px]">{errorMessage}</p>
                            <Link to='/help' className="lg:text-[14px] text-[10px] text-[#7000F6]">need help?</Link>
                    </div>
                    <div className=" w-[30%] lg:pl-[10%]">
                            <img className="lg:w-[30px] w-[20px]" src={infoIcon}/>
                    </div>
                </div>
            }

        </div>
    )
 }

 export { PasswordResetConfirmation as default }