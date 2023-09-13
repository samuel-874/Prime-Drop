import BackIcon from "../../../img/Group 5.svg"
import MessageIcon from "../../../img/Group 314.svg"
import logo from "../../../img/Group 2.svg";
import infoIcon from "../../../img/info.svg"

import { sendResetPasswordOtp, sendVerificationMail, validateForm } from "../../../service/service";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../app/loadingSplice";

 function PasswordReset(){

    const dispatch = useDispatch();

    const [ email,updateEmail ] = useState('');
    const [ lineColor ,changeLineColor ] = useState('#777F8C');
    const [errorMessage, addErrorMessage ] =useState()
 
    const navigate = useNavigate();

        async function handleSubmit(e){
        e.preventDefault();
        addErrorMessage(validateForm(email[0],'email'))
        

            if(errorMessage === undefined && email != '' && email != undefined){
                dispatch(startLoading())
                await sendResetPasswordOtp(email)

            }
    }

    return(
        <div className="form px-[4%] py-[1%] font-['TT Commons]">
            <div className="form-spatch-logo w-[100px] cursor-pointer" onClick={()=>navigate('/')}  >
                <img   src={logo} />
            </div>
            <div className="flex flex-col leading-8 justify-content-left w-[245px]  mx-auto py-[50px]">
                <div className="w-[20px] cursor-pointer inline-block " onClick={()=>navigate(-1)}>
                    <img src={BackIcon} />
                </div>
                <div className="my-[16px]">
                    <h1 className="text-[24px] text-start font-bold  m-[0]">Reset password.</h1>
                    <h3 className="font-normal text-[14px] text-[#777F8C] w-[180px] leading-4" >Enter your email to receive
                     a code to reset your password.</h3>
                </div>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="mt-[20px] mb-[20px] ">
                        <img className="w-[22px] inline-block" src={MessageIcon} />
                        <input 
                            name="email" 
                               
                            type="text"  
                            value={email} 
                            onFocus={()=>changeLineColor('#7000F6')} 
                            onBlur={()=>changeLineColor('#777F8C')}
                            onChange={(e)=>updateEmail([e.target.value])} 
                            className="w-[80%] align-left bg-inherit text-[#7000F6] text-[20px] font-medium focus:outline-none ml-6" 
                            placeholder="email..." 
                        />
                        <div className={`bg-[${lineColor}] h-[1.5px] w-[240px] mt-1`} ></div>
                    </div>
                    <button className="bg-[#7000F6] h-[54px] text-white w-[240px] rounded-[10px]  my-[20px] hover:opacity-[0.8] ">Continue to reset</button>
                    <p className="w-[240px] tracking-wide leading-4 font-normal text-[12px] text-[#777F8C]">
                        By continuing, you agree to our <strong className="text-[#7000F6]" >Privacy Policy</strong> and our <strong className="text-[#7000F6]" >Terms of Service</strong>
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

 export { PasswordReset as default }