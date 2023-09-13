import BackIcon from "../../../img/Group 5.svg"
import lockIcon from "../../../img/bxs-lock 1.svg"
import ContactIcon from "../../../img/Group 314 (1).svg";
import logo from "../../../img/Group 2.svg";
import { resetPassword, sendVerificationMail } from "../../../service/service";
import { useState } from "react";

function PasswordResetCompletion(){

    const [ password,updatePassword ] = useState('');
    const [ confirmPassword,updateConfirmPassword ] = useState('');
    const [ passwordError,addPasswordError ] = useState()
    const [ confirmPasswordError,addConfirmPasswordError ] = useState()
  
    const [ lineColor ,changeLineColor ] = useState('#777F8C');
    const [ lineColor2 ,changeLineColor2 ] = useState('#777F8C');
    const email = new URLSearchParams(window.location.search).get('user')


    function handleSubmit(e){
            e.preventDefault();
            
            if(password !== undefined){
                if(password[0] === ''){
                    return addPasswordError(`password Cannot be empty`)
                }
                 if(password[0].length < 6){
                    addPasswordError(`password must not be less than six characters`)
                }else{
                    addPasswordError()

                }
                 if(confirmPassword !== undefined ){
                    if(confirmPassword[0] === ''){
                        addConfirmPasswordError(`password mismatch`)
                    }
                     if (password[0] !== confirmPassword[0]){
                        addConfirmPasswordError(`password mismatch`)
                    }else{
                        addConfirmPasswordError()
                        resetPassword({password:password[0],email:email})
                    }
                }else addConfirmPasswordError(`password mismatch`)
            }else addPasswordError(`password Cannot be empty`)





    }

    return(
        <div className="form px-[4%] py-[1%] ">
            <div className="form-spatch-logo w-[100px]" >
                <img  src={logo} />
            </div>
 
            <div className="flex flex-col leading-8 justify-content-left w-[245px]  mx-auto  py-[50px]">
                <div className="w-[20px] ">
                    <img src={BackIcon} />
                </div>
                <div className="my-[16px] ">
                    <h1 className="text-[24px] text-start font-bold  m-[0]">Create new password.</h1>
                    <h3 className="font-normal text-[12px] leading-[18px] text-[#777F8C]" >Set your new password, and keep it safe.</h3>
                </div>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="mt-[10px] mb-[10px] ">
                        <img className="w-[18px] inline-block" src={lockIcon} />
                        <input 
                            name="password" 
                             
                            type="password"  
                            value={password} 
                            onChange={(e)=>updatePassword([e.target.value])}
                            onFocus={()=>changeLineColor('#7000F6')} 
                            onAbort={()=>changeLineColor('#777F8C')}
                            className="w-[80%] align-left bg-inherit text-[#7000F6] text-[16px] font-medium focus:outline-none ml-6" 
                            placeholder="New password" 
                        />
                        
                        <div className={`bg-[${lineColor}] h-[1.5px] w-[240px] mt-1`} ></div>
                        {passwordError && <p className=" text-rose-600 text-[12px] font-medium">{passwordError}</p>}
                    </div>
                    
                    <div className="mt-[10px] mb-[10px] ">
                        <img className="w-[18px] inline-block" src={lockIcon} />
                        <input 
                            name="password-confirm" 
                              
                            type="password"  
                            value={confirmPassword}
                            onChange={(e)=>updateConfirmPassword([e.target.value])}
                            onFocus={()=>changeLineColor2('#7000F6')} 
                            onAbort={()=>changeLineColor2('#777F8C')}
                            className="w-[80%] align-left bg-inherit text-[#7000F6] text-[16px] font-medium focus:outline-none ml-6" 
                            placeholder="Confirm password" 
                        />

                        
                        <div className={`bg-[${lineColor2}] h-[1.5px] w-[240px] mt-1`} ></div>
                        {confirmPasswordError && <p className=" text-rose-600 text-[12px] font-medium">{confirmPasswordError}</p>}
                    </div>


                    <button className="bg-[#7000F6] h-[54px] text-white w-[240px] rounded-[10px]  my-[20px]" type="submit">Continue</button>
                </form>
            </div>

        </div>
    )
 }

 export { PasswordResetCompletion as default }