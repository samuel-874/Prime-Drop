import BackIcon from "../../../img/Group 5.svg"
import MessageIcon from "../../../img/Group 314.svg"
import logo from "../../../img/deliverFull.png";
import infoIcon from "../../../img/info.svg"
import axios from "axios";
import { sendVerificationMail } from "../../../service/service";
import "./Form.css"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  useNavigate,Link } from "react-router-dom";
import { startLoading, stopLoading } from "../../../app/loadingSplice";

 function Form(){

    const [ email,updateEmail ] = useState('');
    const [ lineColor ,changeLineColor ] = useState('#777F8C');
    const [errorMessage, addErrorMessage ] =useState()
    const { REACT_APP_BASE_URL } = process.env


    const dispatch = useDispatch();
    const navigate = useNavigate();

  async  function handleSubmit(e){
        e.preventDefault();
        if(email != undefined && email != ''){
            
            axios.get(`${REACT_APP_BASE_URL}/verification/is_available?email=${email}`).then((response)=>{
                if(response.status < 400){
                  
                    if(response.data == false){
                        addErrorMessage(`Email has been taken`)
                       }else if(response.data == true){
                            dispatch(startLoading())
                            const response =  sendVerificationMail(email);
                           if(response){
                               addErrorMessage(response.response.data.message);      
                            }
                    }
                }else{
                    alert(`An error occured in the server`)
                }
            }).catch(e)

                dispatch(stopLoading())
        }else{
            dispatch(stopLoading())
            addErrorMessage(`Email field is empty`)
        }
    }

    return(
        <div className="form px-[4%] py-[1%] ">
            <div className="form-spatch-logo w-[200px] justify-center cursor-pointer" onClick={()=>navigate('/')}  >
                <img   src={logo} />
            </div>
            <div className="flex MainLayer flex-col leading-8 justify-content-left   w-[280px]     mx-auto   py-[50px]">
                <div className="w-[20px] cursor-pointer " onClick={()=>navigate(-1)}>
                    <img src={BackIcon} />
                </div>
                <div className="my-[16px]">
                    <h1 className="text-[24px] text-start font-bold  m-[0]">Register with Prime.</h1>
                    <h3 className="font-normal text-[14px] text-[#777F8C]" >Enter your email to create an account</h3>
                </div>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="w-[250px] mt-[20px] mb-[20px] ">
                    <img className="w-[22px] inline-block" src={MessageIcon} />
                        <input 
                            name="email" 
                              
                            type="email"  
                            value={email} 
                            onFocus={()=>changeLineColor('#27ac27')} 
                            onBlur={()=>changeLineColor('#777F8C')}
                            onChange={(e)=>updateEmail([e.target.value])} 
                            className="w-[80%] inline-block duration-100 align-left bg-inherit text-[#27ac27] text-[20px] font-medium focus:outline-none ml-6" 
                            placeholder="email..."
                        />
                        <div className={`bg-[${lineColor}] h-[2px] w-[240px] mt-1`} ></div>
                    </div>
                    <button className="bg-[#27ac27] h-[54px] text-white w-[240px] rounded-[10px]  my-[20px] active:opacity-[0.8] ">Continue</button>
                    <p className="w-[240px] tracking-wide leading-4 font-normal text-[12px] text-[#777F8C]">
                        By continuing, you agree to our <strong className="text-[#27ac27]" >Privacy Policy</strong> and our <strong className="text-[#27ac27]" >Terms of Service</strong>
                    </p>
                </form>
            </div>
            { errorMessage &&
                <div className="h-[120px] justify-around rounded flex w-[270px] absolute right-6 top-6 shadow text-[#4A5466] object-right-top p-4">
                     <div className="w-[70%] text-left m-0">
                            <strong className="text-[black] text-center font-[400]"> Error!</strong>
                            <p className="text-[14px]">{errorMessage}</p>
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

 export { Form as default }