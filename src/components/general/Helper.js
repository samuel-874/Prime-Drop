import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../app/loadingSplice";

    function Helper({someFunction,successUrl}){
        const dispatch = useDispatch();
        const navigate = useNavigate();

        dispatch(startLoading())
    const response =   someFunction();
        dispatch(stopLoading())
        if(response){
            return(
                <h1>{response}</h1>
            )
        }

        if(successUrl){
            navigate(`${successUrl}`)
        }
    }

    export { Helper as default }

    

