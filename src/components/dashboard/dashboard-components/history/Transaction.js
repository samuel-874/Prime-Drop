import bikeIcon from "../../../../img/bike.png";
import HistoryView from "./HistoryView";
import headerArrowIcon from "../../../../img/headerarrow.svg";
import deliveryIcon from "../../../../img/delivery.svg";
import deliveryLogo from "../../../../img/deliverFull.png";

import socialMediaIcons from "../../../../img/socialmedia.svg";
import dotMapIcon from "../../../../img/dotmap.svg";
import boxIcon from "../../../../img/box.svg";
import senderIcon from "../../../../img/sh.svg";
import receiverIcon from "../../../../img/rh.svg";
import vanIcon from "../../../../img/van.png";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Authenticated, UserContext } from "../../DashBoard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";


 function Transaction(){

    const param = useParams();
    const navigate = useNavigate();

    const {token,fullName} = useContext(UserContext); 
    const { updateAuth } = useContext(Authenticated);
    
    const [ transaction,updateTransactions ] = useState({
        averageDuration:0,
        cashToReceive:0,
        charge:0,distance: 0,
        dropOffLocation: "",
        dropOffTime:"",id: "",
        itemQuantity: 0,itemToDeliver:"no item",
        note:"",orderDate: "",
        orderStatus,pickOffLocation:"",pickUpTime:"",
        receiverPhoneNum:"",receiversName:"",requestType,
        senderPhoneNum:"",sendersName: "",vehicle
    });

    const { REACT_APP_AUTH_BASE_URL } = process.env;


    useEffect(()=>{

       const id = param.id;

       if(id){
        if(token){
     
            axios({
                method:'get',
                url:`${REACT_APP_AUTH_BASE_URL}/order`,
                params:{orderId:id},
                headers:{Authorization:`Bearer ${token}`}
            }).then((response)=>{
        
                 updateTransactions({...response.data.data})
                 console.log(response.data.data)
            }).catch((error)=>{
                if(error.response){
                    if(error.response.data){
                        if(error.response.data.message){
                                if(error.response.data.message.startsWith('No order found for id')){
                                    navigate('/404?unknow-order')
                                }
                        }
                    }
                }else{
                    updateAuth(false)
                }
                console.log(error)
            })
        }
    }else{
       navigate('/404?unauthorized-page-access')
    }
    },[token])


    if(transaction){

        var { averageDuration,cashToReceive,charge,
            distance,dropOffLocation,dropOffTime,id,
            itemQuantity,itemToDeliver,note,orderDate,
            orderStatus,pickOffLocation,pickUpTime,
            receiverPhoneNum,receiversName,requestType,
            senderPhoneNum,sendersName,vehicle} 
            = transaction;
        }

    return (
            <div className="w-[385px] my-[100px] mx-auto   ">
                <div id="header-img" className="w-[385px] h-[180px] bg-[#e3f5e7] flex">
                    <div className=" mx-5 w-[250px]">
                        <img src={deliveryIcon} alt="..." className=" w-[50px] my-5" />
                        <p className=" font-bold">{fullName && fullName.split(" ")[0]},</p>
                        <p className=" font-bold text-[20px] w-[180px]">Thank you for choosing <span className=" text-[#27ac27] ">Prime</span></p>
                    </div>
                    <div className=" flex flex-col-reverse items-end p-5 w-[192px] ">
                        <img src={boxIcon} alt="..." className=" w-[40px]" />
                    </div>

                </div>
                <div className=" ">
                    <HistoryView location={dropOffLocation} date={orderDate} charge={charge} nav={false} />
                    <div className=" w-[100%] p-1">
                        <div className=" flex justify-between px-3 text-[#808080]">
                            <p>Distance</p>
                            <p>Pickup</p>
                            <p>Delivered</p>
                        </div>
                        <div className=" flex justify-between px-3 text-[15px] font-bold">
                            <p>{`${distance}km`}</p>
                            <p>{ dropOffTime || '-'}</p>
                            <p>{pickUpTime || '-'}</p>
                        </div>
                        <div className="bg-[#777F8C] h-[1px] w-[100%] rounded-2xl mx-auto " ></div>

                        <div className=" flex justify-between pt-2 text-[green] px-3 h-10 text-[15px] ">
                            <p>item</p>
                            <div className="flex justify-between">
                                <p>x{itemQuantity}</p>
                                <p className="mx-4 text-black">{itemToDeliver}</p>
                            </div>
                        </div>

                    </div>
                    <div className="bg-[#777F8C] h-[1px] w-[100%] rounded-2xl mx-auto " ></div>
                    <div
                        id="mass-card"
                        className="     mx-auto mr-3 font-medium 
                                                        w-[65px] h-[23px] py-auto pt-1 
                                                        text-[10px] text-center 
                                                        tracking-tight text-white 
                                                        bg-[#2ec72e] rounded-b-lg
                                                        right-[-20px] bottom-9 ">
                        <p style={{ textOrientation: 'upright' }}> {requestType === 'SAME_DAY' ? 'Same Day' : 'Express'} </p>
                    </div>
                    {<div className="w-[100%]  flex flex-row justify-between h-[150px]  px-3">
                        <div className=" flex">
                            <div className=" grid justify-between mr-2 pt-2  pb-[55px] ">
                                <img src={senderIcon} alt="..." className="w-5" />
                                <img src={dotMapIcon} alt="..." className=" mx-auto h-6 my-0" />
                                <img src={receiverIcon} alt="..." className="w-5" />
                            </div>
                            <div className="text-[12px] leading-4 w-[270px] ">
                                <div className=" flex flex-col justify-between pt-1 mb-2 ">
                                    <p className=" text-[#FF9E00] text-[10px] font-bold">Picked From</p>
                                    <p className="  font-bold">{sendersName}</p>
                                    <p className=" font-light w-[190px] truncate">{pickOffLocation}</p>
                                </div>
                                {/* <div className="bg-[#777F8C] h-[1px] w-[100%] rounded-2xl mx-auto " ></div> */}

                                <div className=" flex flex-col justify-between pt-1 ">
                                    <p className=" text-[#27ac27] text-[10px] font-bold">Delivered To</p>
                                    <p className="  font-bold">{receiversName}</p>
                                    <p className=" font-light w-[190px] truncate">{dropOffLocation}</p>
                                </div>
                            </div>
                        </div>
                        <div>

                            <img src={ vehicle === 'BIKE' ? bikeIcon : vanIcon } alt="..." className=" w-[60px] m-6" />
                        </div>
                    </div>}
                </div>
                <div id="footer-img" className="w-[100%] flex flex-col h-[150px] p-3 px-5 bg-[#45d445]">
                    <div className=" ">
                        <img src={deliveryLogo} alt="..." className=" w-[80px] my-3" />
                        <div className="bg-[#BBA4DD] h-[0.5px] w-[100%] rounded-2xl mx-auto " ></div>
                    </div>
                    <div className=" flex text-white text-[8px]">
                        <div className=" pr-20" >
                            <p>Contact</p>
                            <p className="text-[9px] my-2 ">4001A Plot C, Banana Island Road, Ikoyi, Lagos.
                            (c) 2020 Spatch Logistic LLC</p>
                            <p>Report to Support Team  </p>
                        </div>
                        <div className=" m-3">
                            <img src={socialMediaIcons} alt="..." />
                        </div>
                    </div>
                    
                </div>
            </div>
    
    )
 }

    export { Transaction as default }