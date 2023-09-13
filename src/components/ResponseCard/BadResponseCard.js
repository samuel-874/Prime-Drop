import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../app/loadingSplice";

    function BadResponseCard(){
        const { REACT_APP_BASE_URL } = process.env
        const { message } = useParams()
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const location = useLocation()

        const query = new URLSearchParams(window.location.search);
        
        const encodedValue = query.get('token');
        const decodedValue = atob(encodedValue);
        const otp = decodedValue.substring(64, 70);
        const email = decodedValue.substring(70);

        let subHeading;
        let heading;

        if(message === 'token_expired'){
            heading ='Ops! verification mail expired 😢';
            subHeading = (<div>Click <a className="text-[orange] cursor-pointer" onClick={()=>redirect()}>here</a> to get another verification mail</div>)
        }

       async function redirect(){
            dispatch(startLoading())
            try{
              await  axios.post(`${REACT_APP_BASE_URL}/verification/resend?email=${email}`);
              navigate('/signup/confirmation/verify_email');
            }catch(error){
                if(error.request){
                    alert(`Network error`)
                }else{
                    alert(error.response.message)
                }
            }

           
            dispatch(stopLoading())
        }

        return  (
            <div className=" h-[900px] w-[100%] bg-[#7000FC] text-center">
                <div className="container m-auto py-[15%] text-[#FFF] font-commons">

                    <h1 className="font-[700] text-[25px] m-1" >{heading}</h1>
                    <p className="font-[500]">{subHeading}</p>
                </div>
            </div>
        )
    }

    export { BadResponseCard as default }