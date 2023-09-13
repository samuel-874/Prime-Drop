import BackIcon from "../../../img/Group 5.svg"
import lockIcon from "../../../img/bxs-lock 2.svg"
import ContactIcon from "../../../img/Group 314 (1).svg";
import logo from "../../../img/deliverFull.png";
import { useDispatch, useSelector } from "react-redux";
import infoIcon from "../../../img/info.svg"
import { Link, useNavigate } from "react-router-dom";
import { resendMobileOtp, sendVerificationMail } from "../../../service/service";
import "./Form.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { startLoading, stopLoading } from "../../../app/loadingSplice";
import { setError } from "../../../app/ErrorSplice";


 function PhoneConfirmation(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ code,updateCode ] = useState('');  
    const [error,updateError ] = useState({status:false,message:''});
    const formError = useSelector(({error})=>error);

    const [ lineColor ,changeLineColor ] = useState('#777F8C');

    const number = localStorage.getItem('number') || 'something'
    if(number === 'something'){
        navigate('/404?error=access-denial')
    }

    const resendOtp = async ( ) =>{
        if(number){
            try{
                await  axios.post(`http://localhost:8080/api/v1/spatch/verification/resend_mobile`,{mobile:number})
                window.location.assign(`${window.location.href}?status=resent`)
              }catch(error){
                if(error.response){
                    if(error.response.data){
                        alert(error.response.data.message || 'Error occured on the server')
                    }
                    setTimeout(()=>{
                        window.location.assign('/dashboard')
                    })
                  }else {
                    alert('Network Error')
                  }
              
              }
        }else{
            alert("Mobile no. required")
        }
    }
    

    const handleSubmit = async (e) =>{
            e.preventDefault();
            if(code.length === 6){
                dispatch(startLoading())
                axios.post(`http://localhost:8080/api/v1/spatch/verification/verify_mobile`,{mobile:number,otp:code}).then(
                    ()=>{
                        localStorage.removeItem('number')
                        window.location.assign('/signup/confirmation/verify_mobile')
                        
                    }).catch((error)=>{
                        dispatch(stopLoading())

                        if(error.response){
                            if(error.response.data){
                                console.log(error.response.data)
                                if(error.response.data.message){

                                    dispatch(setError({message:error.response.data.message}))
                                }else{
                                    dispatch(setError({message:"An error occured on the server"}))
   
                                }
                            }
                        }else{
                            dispatch(setError({message:"Bad Network connection"}))
                        }
                    }) 
   
         
            }else{
                updateError({status:true,message:'Otp is Not valid'})

            }
     

    }   
    
    
    useEffect(()=>{
        console.log(formError)
        updateError({status:formError.status,message:formError.errorMessage})
    },[formError])




    return(
        <div className="form px-[4%] py-[1%] ">
            <div className="form-spatch-logo w-[200px]">
                <img  src={logo} />
            </div>
 
            <div className="flex flex-col leading-8 justify-content-left w-[280px] mx-auto    py-[50px]">
                <div className="w-[20px] ">
                    <img src={BackIcon} />
                </div>
                <div className="my-[16px] ">
                    <h1 className="text-[24px] text-start font-bold  m-[0]">Phone Confirmation.</h1>
                    <h3 className="font-normal w-[220px] text-[12px] leading-[18px] text-[#777F8C]" >We’ve sent a verification code to your number: <strong className="text-[black]">{`(${number.substring(0,4)}) ${number.substring(4)}`}</strong></h3>
                </div>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="mt-[10px] mb-[10px] ">
                        <img className="w-[18px] inline-block" src={lockIcon} />
                        <input 
                            name="code" 
                            required 
                            type="number"
                            value={code} 
                            onFocus={()=>changeLineColor('#27ac27')} 
                            onAbort={()=>changeLineColor('#777F8C')}
                            onChange={(e)=>updateCode(e.target.value)} 
                            className="w-[80%] align-left bg-inherit text-[#27ac27] text-[16px] font-medium focus:outline-none ml-6" 
                            placeholder="Enter code" 
                        />
                        <div className={`bg-[${lineColor}] h-[1.5px] w-[240px] mt-1`} ></div>
                    </div>

                    <button className="bg-[#27ac27] h-[54px] text-white w-[240px] rounded-[10px]  my-[20px]" type="submit">Continue</button>
                    <p className="w-[240px] tracking-wide leading-4 font-normal text-[12px] text-[#27ac27] my-[10px]">Didn’t get the mail?</p>
                    <p className="w-[240px] tracking-wide leading-4 font-[300] text-[14px] text-[#777F8C]">Verify that your email address is correct,
                    or check your spam folder.</p>
                    </form>
                    <button className="bg-[#FFFFFF] h-[54px] text-[#777F8C] w-[240px] rounded-[10px]  my-[20px] " onClick={()=>{resendOtp(number)}} >Resend code</button>
                    <p className="w-[240px] tracking-wide leading-4 font-normal text-[12px] text-[#27ac27]">
                        Or RESTART
                    </p>
            </div>
            { error.status &&
                <div className="h-[120px] justify-around rounded flex w-[270px] absolute right-6 top-6 shadow text-[#4A5466] object-right-top p-4">
                     <div className="w-[70%] text-left m-0">
                            <strong className="text-[black] text-center font-[400]"> Error!</strong>
                            <p className="text-[14px]">{error.message}</p>
                            <Link to='/help' className="text-[14px] text-[#27ac27]">need help?</Link>
                    </div>
                    <div className=" w-[30%] pl-[20%]">
                            <img className="w-[30px]" src={infoIcon}/>
                    </div>
                </div>
            }

        </div>
    )
 }

 export { PhoneConfirmation as default }