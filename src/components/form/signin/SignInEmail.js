import BackIcon from "../../../img/Group 5.svg"
import lockIcon from "../../../img/bxs-lock 1.svg"
import ContactIcon from "../../../img/Group 314 (1).svg";
import logo from "../../../img/deliverFull.png";
import flagIcon from "../../../img/nigeria svg.png";
import MessageIcon from "../../../img/Group 314.svg"

import showPasswordIcon from "../../../img/showpassword.svg";
import hidePasswordIcon from "../../../img/hidepassword.svg";

import infoIcon from "../../../img/info.svg"
import {  useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate} from "react-router-dom";
import { startLoading, stopLoading } from "../../../app/loadingSplice";
import axios from "axios";
import { setError } from "../../../app/ErrorSplice";

function FormCompletion(){

     const location = useLocation()
     const dispatch = useDispatch()
     const navigate = useNavigate()

    const [ email,updateEmail ] = useState('');
    const [ mobileNo,updateMobileNo ] = useState('');
    const [ password,updatePassword ] = useState('');

    const [ lineColor ,changeLineColor ] = useState('#777F8C');
    const [ lineColor2 ,changeLineColor2 ] = useState('#777F8C');
    const [ mobileNoError,addMobileNoError ] = useState()
    const [ emailError,addEmailError ] = useState()
    const [ passwordError,addPasswordError] = useState()

    const [ showPassword, togglePassword ] = useState(false);
    const [ passwordIcon,changPasswordIcon] = useState(showPasswordIcon);


    const search =  location.search   
    const route = new URLSearchParams(search).get('route')

    const anyError = useSelector((state)=>state.error.status);
    const error    = useSelector((state)=>state.error.errorMessage);

    useEffect(()=>{
        if(window.location.search === '?loggedOut'){
            try{
                localStorage.removeItem('token')
            }catch(error){

            }
        }
    },[])

    const handleSubmit = async e => {
        
            e.preventDefault();
            if(route == 'phone'){
                if(mobileNo !== undefined){
                    if(mobileNo[0] !== undefined){
                        if (mobileNo[0].trim().length != 10) {
                            addMobileNoError('Mobile no. is invalid');
                        } else{
                                addMobileNoError();
                                if(password !== undefined){
                                    if(password[0] !== undefined){
                                        if( password[0].length >= 6 ){
                                            addPasswordError();
                                            dispatch(startLoading());
                                            await logUserIn(mobileNo[0],password[0])
                                            dispatch(stopLoading());
                                        }else addPasswordError(`password must not be less than 6 characters`);
                                    }else addPasswordError(`password is required`);
                                }else addPasswordError(`password is required`);
                            }
                        }else addMobileNoError(`mobile no. is required`);
                }else addMobileNoError(`mobile no. is required`);

                //validate for mobile errors
            }else{ 
                if(email !== undefined){
                    if(email[0] !== undefined){
                        if (!/^\S+@\S+\.com$/.test(email[0].trim())) {
                            addEmailError('Email is invalid');
                        } else{
                                addEmailError();
                                if(password !== undefined){
                                    if(password[0] !== undefined){
                                        if( password[0].length >= 6 ){
                                            addPasswordError();
                                            dispatch(startLoading());
                                            await logUserIn(email[0],password[0])
                                            dispatch(stopLoading());
                                        }else addPasswordError(`password must not be less than 6 characters`);
                                    }else addPasswordError(`password is required`);
                                }else addPasswordError(`password is required`);
                            }
                        }else addEmailError(`email is required`);
                }else addEmailError(`email is required`);
            }   

        }



        const logUserIn = async ( emailOrPhoneNo, password )  => {
            try{
              
             let response =  await axios.post(`http://localhost:8080/api/v1/spatch/authentication/authenticate_user`,{ emailOrPhoneNo, password })
                    console.log(response)
                  localStorage.setItem('token',response.data.jwt)
             window.location.assign("/dashboard")
            }catch(error){
                if(error.message === 'Network Error'){
                    dispatch(setError({message:'Bad internet connection😢. '}))
                }else if(error.response){
                        if(error.response.data){
                            if(error.response.data.message){
                                dispatch(setError({message:`${error.response.data.message}`}))
                            }else{
                                dispatch(setError({message:`AN Error occurred on the Server 😢`}))
                            }
                        }else{
                            dispatch(setError({message:`Couldn't send request 😢`}))
                        }
                }else{
                    dispatch(setError({message:`An unknow error occured 😢`}))
                }
                    dispatch(stopLoading())
              }           
        }

    return(
        <div className="form px-[4%] py-[1%] ">
            <div className="form-spatch-logo w-[200px] hover:cursor-pointer" onClick={()=>navigate('/')}  >
                <img  src={logo} />
            </div>
 
            <div className="flex flex-col leading-8 justify-content-left w-[240px] mx-auto   py-[50px]">
                <div className="w-[20px] hover:cursor-pointer " onClick={()=>navigate('/')}>
                    <img src={BackIcon} />
                </div>
                <div className="my-[16px] ">
                    <h1 className="text-[24px] text-start font-bold  m-[0]">Sign in to Prime.</h1>
                    <h3 className="font-normal w-[180px] text-[14px] leading-[18px] text-[#777F8C]" >Please enter your sign in detail</h3>
                </div>
                
                <form onSubmit={(e)=>handleSubmit(e)}>
                {
                    route == 'phone'?
                    <div className="mt-[15px] mb-[10px] ">
                    <img src={flagIcon} className="w-[12px] inline-block" />

                       <div className=" inline-block w-[70%] ml-6">
                        <input 
                            type="text"  
                            name="mobile" 
                            value={`+234`}
                             
                            onBlur={()=>changeLineColor('#777F8C')} 
                            onFocus={()=>changeLineColor('#27ac27')} 
                            className="inline-block w-[30%] align-left bg-inherit text-[#27ac27] mx-0 text-[16px] font-medium focus:outline-none " 
                            placeholder="+233"
                            />
                            
                        <input 
                            type="tel"  
                            name="mobile" 
                            value={mobileNo} 
                             
                            onBlur={()=>changeLineColor('#777F8C')} 
                            onFocus={()=>changeLineColor('#27ac27')} 
                            onChange={(e)=>updateMobileNo([e.target.value])} 
                            className="inline-block w-[70%] align-left bg-inherit mx-0 text-[#27ac27] text-[16px] font-medium focus:outline-none ml-[0]" 
                            placeholder="i.e 7000050009"
                            />
                        </div>

                            <div className={`bg-[${lineColor}] h-[2px] w-[240px] mt-1`} ></div>
                            {mobileNoError && <p className=" text-rose-600 text-[12px] font-medium">{mobileNoError}</p>}
                    </div>
                    :
                    <div className="mt-[15px] mb-[10px] ">
                    <img className="w-[18px] inline-block" src={MessageIcon} />
                        <input 
                        
                            type="text"  
                            name="email" 
                            value={email} 
                             
                            onBlur={()=>changeLineColor('#777F8C')} 
                            onFocus={()=>changeLineColor('#27ac27')} 
                            onChange={(e)=>updateEmail([e.target.value])} 
                            className="w-[80%] align-left bg-inherit text-[#27ac27] text-[16px] font-medium focus:outline-none ml-6" 
                            placeholder="i.e email@example.com"
                            />
                            <div className={`bg-[${lineColor}] h-[2px] w-[240px] mt-1`} ></div>
                            {emailError && <p className=" text-rose-600 text-[12px] font-medium">{emailError}</p>}
                    </div>

  
                        }
                        
                    <div className="mt-[10px] mb-[10px] ">
                        <img className=" inline-block w-[18px]" src={lockIcon} />
                        <input 
                            name="password" 
                            type="password"  
                            value={password} 
                            onFocus={()=>changeLineColor2('#27ac27')} 
                            onBlur={()=>changeLineColor2('#777F8C')}
                            onChange={(e)=>updatePassword([e.target.value])} 
                            className="w-[80%] align-left bg-inherit text-[#27ac27] text-[16px] font-medium focus:outline-none ml-6" 
                            placeholder="i.e Mzu%^$$49837" 
                        />
                        <div className={`bg-[${lineColor2}] h-[2px] w-[240px] mt-1`} ></div>
                        {passwordError && <p className=" text-rose-600 text-[12px] font-medium">{passwordError}</p>}
                    </div>


                    <button className="bg-[#27ac27] h-[54px] text-white w-[240px] rounded-[10px]  my-[20px] cursor-pointer active:opacity-80 ">Sign in to Prime</button>
                    <p className="w-[240px] tracking-wide leading-4 font-normal text-[12px] text-[#777F8C]">
                        By continuing, you agree to our <strong className="text-[#27ac27]" >Privacy Policy</strong> and our <strong className="text-[#27ac27]" >Terms of Service</strong>
                    </p>
                </form>
            </div>
            { anyError &&
                <div className="h-[120px] justify-around rounded flex w-[270px] absolute right-6 top-6 shadow text-[#4A5466] object-right-top p-4">
                     <div className="w-[70%] text-left m-0">
                            <strong className="text-[black] text-center font-[400]"> Error!</strong>
                            <p className="text-[14px]">{error}</p>
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

 export { FormCompletion as default }