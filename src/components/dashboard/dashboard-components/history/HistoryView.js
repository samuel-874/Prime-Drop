import { useLocation, useNavigate, useParams } from "react-router-dom";
import cashTag from "../../../../img/cashTag.svg";
import bikeIcon from "../../../../img/bike.png";
import vanIcon from "../../../../img/van.png";
import dotMapIcon from "../../../../img/dotmap.svg";
import senderIcon from "../../../../img/sh.svg";
import rigthArrow from "../../../../img/right.svg";
import cancelIcon from "../../../../img/graycancel.svg";
import receiverIcon from "../../../../img/rh.svg";
import moment from "moment/moment";
import { useEffect, useState } from "react";



    function HistoryView({date,charge, location,canceled,bg,id,showIndex,nav,updateLt,index,updateShowIndex,sendersName,receiversName,pickOffLocation,dropOffLocation}){
        const [ showFull, updateShow ] = useState( index === showIndex);
        const param = useParams();
        const navigate = useNavigate();
        const locations = useLocation();
        const momentDate = moment(date || '');
        let formattedDate = momentDate.format('D MMMM YYYY, h:mmA');
        if(formattedDate === 'Invalid date'){
            formattedDate = ''
        }


        const formatter = Intl.NumberFormat("en-ng",{
            currency:"NGN"
        })
        // 20 August 2021, 12:32pm


        useEffect(()=>{
                updateShow( index === showIndex)

        },[showIndex])

        return (                           
         <div className="w-[100%]   mx-1 px-2" style={{backgroundColor:bg,cursor: nav && 'pointer',marginTop:showFull&& '40px',border:(showFull && !param.id )&& ' 1px solid #A5A9B2'}} onClick={()=> nav && updateShowIndex(index)} >
                <div className=" text-[13px] pt-[8px] flex justify-between flex-1 ">
                    <p>{formattedDate}</p>
                    <p className=" text-[12px] font-normal mx-2">{location||""}</p>
                </div>
                
                <div className="   h-[50px] flex justify-between">
                    <div className="flex justify-between w-[120px]">
                        <p className=" font-semibold">NGN { formatter.format(charge || 0.00)}</p>
                        { canceled &&
                            <p className=" text-[16px] font-bold text-[#FF3E3E]">cancel</p>
                        }
                    </div>
                    <div className=" flex justify-between h-6 text-[13px] ">
                        <p className=" inline-block" >Card • 4399</p>
                        <img className=" w-10 m-0 inline-block" src={cashTag} alt="..." />
                    </div>
                </div>
                <div className="bg-[#777F8C] h-[1px] w-[100%] rounded-2xl mx-auto " ></div>




             {( showFull && !param.id )&&
                <div className="w-[100%] h-[180px] mt-3 mb-[40px]">
                    <div className=" h-[170px] ">
                        <div className="w-[100%]  flex flex-row justify-between h-[140px]  px-1">
                            <div className=" flex">
                                <div className=" grid justify-between mr-2 py-2 pb-8 ">
                                    <img src={senderIcon} alt="..." className="w-5" />
                                    <img src={dotMapIcon} alt="..." className=" mx-auto h-7 my-0" />
                                    <img src={receiverIcon} alt="..." className="w-5" />
                                </div>
                                <div className="text-[12px] leading-[18px] w-[270px] ">
                                    <div className=" flex flex-col justify-between pt-1 mb-2 ">
                                        <p className=" text-[#FF9E00] text-[12px] font-bold">Picked From</p>
                                        <p className=" text-[14px] tracking-wide  font-bold">{sendersName||""}</p>
                                        {/* ################################### */}
                                        <p className="  w-[190px] font-medium tracking-wide  truncate">{pickOffLocation||""}</p>
                                    </div>
                                    <div className="bg-[#777F8C] h-[1px] w-[100%] rounded-2xl mx-auto " ></div>

                                    <div className=" flex flex-col justify-between pt-1 ">
                                        <p className=" text-[#27ac27] text-[12px] font-bold">Delivered To</p>
                                        <p className=" text-[14px] tracking-wide   font-bold">{receiversName||""}</p>
                                        <p className=" font-medium tracking-wide  w-[190px] truncate">{dropOffLocation||""}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src={ true === 'BIKE' ? bikeIcon : vanIcon } className=" w-[70px] m-6" />
                            </div>
                        </div>
                        <div className="bg-[#777F8C] h-[1px] mt-1 w-[100%] rounded-2xl mx-auto " ></div>
                        <div className=" flex justify-between p-2 cursor-pointer" >
                            <div className=" flex justify-between" onClick={()=>{
                                navigate(id);
                                window.scroll({top:0,behavior:"smooth"})}}>
                                <p className=" text-[#27ac27] font-bold mx-2">View reciept detail</p><img src={rigthArrow}  className=" w-5" />
                            </div>
                            <div>
                                <img src={cancelIcon} onClick={()=> updateShow(false)} />
                            </div>
                        </div>
                    </div>

                </div>}
        </div>
        )
    }

    export { HistoryView as default }