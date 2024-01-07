import BackIcon from "../../img/Group 5.svg"
import MessageIcon from "../../img/Group 314.svg"
import newLogo from "../../img/deliverFull.png";
import logo from "../../img/Group 2.svg";
import { Link } from "react-router-dom";
import { sendVerificationMail } from "../../service/service";
import { useState } from "react";

 function OnBoarding(){

    const [ email,updateEmail ] = useState();
    const [ lineColor ,changeLineColor ] = useState('#777F8C');
    const [errorMessage, addErrorMessage ] =useState(`email has been taken`)

    function handleSubmit(e){
        e.preventDefault();
        if(email != undefined){
          const response =  sendVerificationMail(email);
        }else{
            alert("can't submit empty form")
        }


    }

    return(
        <div className="form px-[4%] py-[1%] font-['TT-Commons']  justify-center">
            <div className="form-spatch-logo w-[200px]" >
                <img  src={newLogo} />
            </div>
             <div className="body flex flex-col leading-8 mx-auto w-[240px] justify-center    py-[50px]">
                <div className="w-[20px] ">
                    <img src={BackIcon} />
                </div>
                <div className="my-[16px]">
                    <h1 className="text-[24px] text-start font-bold w-[240px]  m-[0]">Glad you made it here.</h1>
                    <h3 className={`font-[400]  text-[16px] text-[${lineColor}] leading-5 w-[240px]  `} >Need to deliver your merchandise?
                    Let Prime Drop take care of that.</h3>
                </div>

                    <Link to="/signup" className="font-[500] bg-[#27ac27] h-[54px]  text-white w-[240px] rounded-[10px]  my-[20px] flex flex-col justify-center"><p className="text-center">Register with PrimeDrop</p></Link>
                    <Link to="/signin" className="font-[500] bg-[#FFFF] h-[54px] text-[#777F8C] w-[240px] rounded-[10px]  my-[20px] flex flex-col justify-center"><p className="text-center">Sign in to PrimeDrop</p></Link>

            </div>

        </div>
    )
 }

 export { OnBoarding as default }