import { useParams } from "react-router-dom";
import CheckIcon from "../../img/check-circle 1.svg"
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

    function ResponseCard(){

        const [ text,updateText ] = useState({
            heading:'',
            subHeading:'',
        });

        const { message } = useParams()
        const navigate = useNavigate()
        const location = useLocation()



        
        let subHeading;
        let heading;

        useEffect(()=>{
            if(message === 'verify_email'){

                updateText(()=>{return{
                    heading:'Check your email for verification.',
                subHeading:'We’ve sent a verification link to your email.'}})
            }else if(message === 'verify_mobile'){
                
                updateText(()=>{return{
                    heading:'Success',
                    subHeading:'Welcome To Spatch'}})

            }else if(message === 'welcome_back'){


                updateText(()=>{return{
                    heading:'Welcome back ',
                    subHeading:'Enjoy the service'}})
            }else{
                navigate(`/404?error=no-message-in-response-card`)
            }
        },[message])

        function redirect(){
            navigate('/')
        }
        
 

        return  (
            <div className=" h-[900px] w-[100%] bg-[#27ac27] text-center">
                <div className="container m-auto py-[16%] text-[#FFF] font-commons">
                    <img  className=" mx-auto justify-center w-[65px] h-[48px]" onClick={()=>redirect()} src={CheckIcon} />
                    <h1 className="font-[700] text-[25px] m-1" >{text.heading}</h1>
                    <p className="font-[300]">{text.subHeading}</p>
                </div>
            </div>
        )
    }

    export { ResponseCard as default }