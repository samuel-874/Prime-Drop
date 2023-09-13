
import { useContext, useEffect } from "react";
import backIcon from "../../../../img/back.svg";
import HistoryView from "./HistoryView";
import { NotificationContext } from "../../../../App";
import headerArrowIcon from "../../../../img/headerarrow.svg";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import spatch from "../../../../img/spatchfooter.svg";
import socialMediaIcons from "../../../../img/socialmedia.svg";
import dotMapIcon from "../../../../img/dotmap.svg";
import boxIcon from "../../../../img/box.svg";
import dropArrow from "../../../../img/dropdowarrow.svg";
import senderIcon from "../../../../img/sh.svg";
import rigthArrow from "../../../../img/right.svg";
import cancelIcon from "../../../../img/graycancel.svg";
import receiverIcon from "../../../../img/rh.svg";
import TransactionList from "./TransactionList";
import axios from "axios";



function History() {

    const { setNotification } = useContext(NotificationContext);
    const { REACT_APP_AUTH_BASE_URL } = process.env;
    const navigate = useNavigate();
    const param = useParams();

    const location = window.location
    useEffect(() => {
        if (location.search === '?success') {
            setNotification({ message: 'Your order was places successfully', show: true })

            setTimeout(() => {
                navigate(location.pathname)
            }, 2000)
        }
    })



    return (
        <div className="  lg:ml-[200px] pt-[36px] bg-[#FFFFFF]   ">

            <div className=" flex lg:ml-[60px] mt-[-20px] cursor-pointer " onClick={()=>  param.id ?  navigate(-1) : navigate('/dashboard') }>
                <img src={backIcon} className="w-5 m-1 " />
                <p className=" text-[20px] font-bold"> { param.id ? `#${param.id}` : 'History' }</p>
            </div>
            
            {<Outlet />}
        </div>
    )
}

export { History as default }