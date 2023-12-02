import sender from "../../../img/sender.svg";
import receiver from "../../../img/receiver.svg";
import snIcon from "../../../img/senderName.svg";
import rnIcon from "../../../img/receiverName.svg";
import intermediary from "../../../img/intermediary.svg";
import item from "../../../img/item.svg";
import vehicleInfo from "../../../img/vehcleInfo.svg";
import cashIcon from "../../../img/cash.svg";
import cashIconActive from "../../../img/cash copy.svg";
import requestIcon from "../../../img/request.svg";
import dropdownIcon from "../../../img/dropdown.svg";
import vehicleIcon from "../../../img/vehicleIcon.svg";
import vehicleIconActive from "../../../img/vehicleIcon copy.svg";
import slIcon from "../../../img/senderLocation.svg";
import rlIcon from "../../../img/receiverLocation.svg";
import vanIcon from "../../../img/van.png";
import backIcon from "../../../img/back.svg";
import editIcon from "../../../img/edit.svg";
import smIcon from "../../../img/sendersPhoneNo.svg";
import noteIcon from "../../../img/note.svg";
import noteIconActive from "../../../img/note copy.svg";
import rmIcon from "../../../img/tel.svg";
import initialIcon from "../../../img/initial.svg";
import cancelIcon from "../../../img/cancel.svg";
import bikeIcon from "../../../img/bike.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IndexContext, UserContext, VIContext } from "../DashBoard";
import { PackageContext } from "../DashBoardHome";
import { useDispatch } from "react-redux";
import { startLoading } from "../../../app/loadingSplice";
  
  
  
  
  function OrderPage(){

      const navigate = useNavigate();
      const dispatch = useDispatch();
      const  { changeIndex }  = useContext(IndexContext);
      const  { toggleVisibility }  = useContext(VIContext);
      const defaultPackage = useContext(PackageContext);
      
      const { REACT_APP_AUTH_BASE_URL } = process.env
      const {     balance, email, fullName, imagePath,phoneNo,token } = useContext(UserContext);
      const appSettings = JSON.parse(localStorage.getItem('App data')) || [] ;

      const [ error,showError ] = useState({
        bikeError:false,
        vanError:false
      })

    const location = window.location;
    const [userRole, updateUserRole] = useState('SENDER');
    const [focus, toggleFocus] =
        useState({
            slFocus: false,
            rlFocus: false,
            snFocus: false,
            rnFocus: false,
            smFocus: false,
            rmFocus: false,
            itemFocus: false,
            vehicleFocus: false,
            noteFocus: false,
            cashFocus: false
        });
     
    const [sl, updateSl] = useState('');
    const [rl, updateRl] = useState('');
    const [rn, updateRn] = useState('');
    const [rm, updateRm] = useState('');
    const [sn, updateSn] = useState('');
    const [sm, updateSm] = useState('');
    const [note ,updateNote ] = useState('');
    const [charge, updateCharge ] = useState(2300);
    const [vehicle, updateVehicle] = useState('');
    const [itemField, updateItemField] = useState('');
    const [cashToReceive, updateCashToReceive ] = useState('0.00');
    const [ orderPackage,updateOrderPackage ] = useState(defaultPackage || 'SAME_DAY');


    const activeClass = { backgroundColor: '#FFF', border: '2px solid #27ac27 ', color: '#27ac27', fontWeight: '600' };
    const unactiveClass = { backgroundColor: '#F1F5FB', color: '#4A5466', fontWeight: '500' };
    const vehicleActiveClass = { color: '#27ac27', border: 'solid #27ac27', width: '300px' };
    const vehicleUnActiveClass = { color: '#1D293F', opacity: '0.6', width: '290px' };

    const isValid = cashToReceive === '0.00' || cashToReceive === '0.0' || cashToReceive.length < 3 ;


    

    useEffect(()=>{
        
      const averageDistance = Math.floor(Math.random() * 26);

      const routeCost = JSON.parse(localStorage.getItem('Route Cost'))
      let mainCost;
            if(Array.isArray(routeCost)){
                for(let i = 0 ; i < routeCost.length ; i++){
                    if(averageDistance <= routeCost[i].distanceTo && averageDistance >= routeCost[i].distanceFrom){
                        mainCost =  routeCost[i].amount;
                    }
                }


      if(mainCost != undefined && mainCost > 1){
          updateCharge(mainCost);
      }

    }
    },[])





    function format(inputString) {
        if (inputString.length === 0) {
          return inputString; 
        }
        
        const firstLetter = inputString.charAt(0);
        const restOfLetters = inputString.slice(1).toLowerCase();
        
        return firstLetter + restOfLetters;
      }



      function validate(){

        const validateSender =      sl != '' && rl != '' && rn != ''
                                    && rm != '' && note != '' && charge != ''
                                     && vehicle != '' && itemField != '' && !isValid

        const validateReceiver = sl != '' && rl != '' && sn != '' &&
                                 sm != '' && note != '' && charge != ''
                                  && vehicle != '' && itemField != '' && !isValid

        const validateIntermedtary = sl != '' && rl != '' &&  rn != '' && rm != '' &&
                                      sn != '' && sm != '' && note != '' && charge != '' 
                                      && vehicle != '' && itemField != '' && !isValid

        if(userRole === 'THIRD_PARTY'){
            return validateIntermedtary;
        }else if(userRole === 'RECEIVER'){
            return validateReceiver;
        }else{
            return validateSender;
        }
      }

            
      const bikeSettings = appSettings.find((appSet)=>{
        if(orderPackage === 'EXPRESS'){
            return appSet.service === 'Express Bike Delivery'
        }else {
            return appSet.service === 'Same Day Bike Delivery'
        }
        })

        const vanSettings = appSettings.find((appSet)=>{
                if(orderPackage === 'EXPRESS'){
                    return appSet.service === 'Express Van Delivery'
                }else {
                    return appSet.service === 'Same Day Van Delivery'
                }
        })


        useEffect(()=>{
            updateVehicle('')
        },[orderPackage])


      

   useEffect(()=>{

    toggleVisibility((oldState)=>{return{...oldState,addIconVisibility:false}})

        setTimeout(()=>{
            toggleVisibility((oldState)=>{return{...oldState,infoIconVisibility:false}})
        },4000)


        setTimeout(()=>{
                toggleVisibility((oldState)=>{return{...oldState,infoIconVisibility:true}})
        },8000)
    },[])

      useEffect(()=>{

            setTimeout(() => {
                showError({bikeError:false,vanError:false})
            }, 8000);
      },[error])

    

    const formater = new Intl.NumberFormat("en-ng",{
        currency:'NGN'
    })

    async function handleSubmit(e){
        e.preventDefault();

        const valid = validate();
        if(valid){
            
            dispatch(startLoading());
            let data ;
            if(userRole === 'SENDER'){

                data =  {  "requestType":orderPackage,
                            "vehicle":vehicle,
                            "usersIs":userRole,
                            "pickOffLocation":sl,
                            "dropOffLocation":rl,
                            "receiversName":rn,
                            "distance":"6",
                            "averageDuration":"1hr 30mins ",
                            "sendersName":fullName,
                            "senderPhoneNum":phoneNo,
                            "receiverPhoneNum":`+234${rm}`,
                            "itemToDeliver":itemField,
                            "itemQuantity":1,
                            "note":note,
                            "cashToReceive":cashToReceive,
                            "charge":charge 
                        }
            }else if(userRole === 'RECEIVER'){
                data =  {  "requestType":orderPackage,
                            "vehicle":vehicle,
                            "usersIs":userRole,
                            "pickOffLocation":sl,
                            "dropOffLocation":rl,
                            "receiversName":fullName,
                            "distance":"6",
                            "averageDuration":"1hr 30mins ",
                            "sendersName":sn,
                            "senderPhoneNum":`+234${sm}`,
                            "receiverPhoneNum":phoneNo,
                            "itemToDeliver":itemField,
                            "itemQuantity":1,
                            "note":note,
                            "cashToReceive":cashToReceive,
                            "charge":charge 
                        }
            }else if(userRole === 'THIRD_PARTY'){
                data =  {  "requestType":orderPackage,
                            "vehicle":vehicle,
                            "usersIs":userRole,
                            "pickOffLocation":sl,
                            "dropOffLocation":rl,
                            "receiversName":rn,
                            "distance":"6",
                            "averageDuration":"1hr 30mins ",
                            "sendersName":sn,
                            "senderPhoneNum":`+234${sm}`,
                            "receiverPhoneNum":`+234${rm}`,
                            "itemToDeliver":itemField,
                            "itemQuantity":1,
                            "note":note,
                            "cashToReceive":cashToReceive,
                            "charge":charge 
                        }
            }else {
                data =  {  "requestType":orderPackage,
                             "vehicle":vehicle,
                            "usersIs":userRole,
                            "pickOffLocation":sl,
                            "dropOffLocation":rl,
                            "receiversName":rn,
                            "distance":"6",
                            "averageDuration":"1hr 30mins ",
                            "sendersName":fullName,
                            "senderPhoneNum":phoneNo,
                            "receiverPhoneNum":`+234${rm}`,
                            "itemToDeliver":itemField,
                            "itemQuantity":1,
                            "note":note,
                            "cashToReceive":cashToReceive,
                            "charge":charge 
                        }
            }

            console.log(data);
           
         axios({
              url:`${REACT_APP_AUTH_BASE_URL}/order/create`,
              method:'post',
              data:data,
              headers:{'Authorization':`Bearer ${token}`, 'Content-Type':'application/json'}

        }).then((response)=>{
            setTimeout(() => {
                location.assign(`${location.origin}/dashboard/history?success`)

            }, 5000);
            console.log(response)

        }).catch((error)=>{

            console.log(error)
            if(error.response){
                if(error.response.data){
                    alert(error.response.data.message)
                }else{
                    alert('Server error')
                }
            }else{
                alert('An error occured')
            }
        })
        
        }
    }
    
          



    return (
        <div className="w-[377px]  lg:ml-[240px]  relative mx-auto ">
                    <div onClick={()=>changeIndex(0)}  className="my-4 mt-[-70px] items-center justify-center cursor-pointer">
                    <img className="inline-block mb-1 ml-4 mr-2 w-6" alt="..."  src={backIcon}/>
                    <p className="inline-block mx-1 text-[20px] font-bold">Request</p></div>


                <div className="bg-[#FFF] rounded-2xl h-[auto] py-5 shadow-lg">
                    <select className="m-4 font-semibold text-[#1D293F] text-[20px]" onClick={(e)=>updateOrderPackage(e.target.value)}>
                        <option value="SAME_DAY"  selected={defaultPackage ==='SAME_DAY'  } >Same Day</option>
                        <option value="EXPRESS"  selected={defaultPackage ==='EXPRESS'  } >Express</option>
                    </select>


                    {/*  FIRST SECTION */}
                    <div id="package"
                        className="  h-[60px]  w-[100%] grid 
                                     grid-flow-col text-[17px]
                                     overflow-x-scroll pl-6 ">
                        <div className=" m-1 h-12 rounded-[10px] w-[170px] flex p-2 cursor-pointer" style={userRole === 'SENDER' ? activeClass : unactiveClass} onClick={() => updateUserRole('SENDER')}>
                            <div><img src={sender}  alt="..." /></div>
                            <div className="w-[140px]"><p className="text-center  mx-auto justify-center">I am the sender</p></div>
                        </div>
                        <div className=" m-1 h-12 rounded-[10px] w-[170px] flex p-2 cursor-pointer" style={userRole === 'RECEIVER' ? activeClass : unactiveClass} onClick={() => updateUserRole('RECEIVER')}>
                            <div><img src={receiver}  alt="..." /></div>
                            <div className="w-[140px]"><p className="text-center   mx-auto justify-center">I am the receiver</p></div>
                        </div>
                        <div className=" m-1 h-12 rounded-[10px] w-[170px] flex p-2 tracking-tight cursor-pointer" style={userRole === 'THIRD_PARTY' ? activeClass : unactiveClass} onClick={() => updateUserRole('THIRD_PARTY')}>
                            <div><img src={intermediary}  alt="..." /></div>
                            <div className="w-[140px]"><p className="text-center mx-auto justify-center">Booking for guest</p></div>
                        </div>
                    </div>

                    {/*  SECOND SECTION */}
                    <div className=" rounded-[10px] text-[#1D293F]
                                         border border-[#D2D4D9] w-[330px]
                                         h-[50px]  mx-auto my-3 flex justify-center bg">

                        <img src={slIcon}  alt="..." className=" w-[30px] ml-2 mr-1" />
                        <input
                            value={sl}
                            required
                            placeholder="Where are we picking from?"
                            className=" w-[250px] h-[40px] my-auto px-2 "
                            onFocus={() => toggleFocus((oldState) => { return { ...oldState, slFocus: true } })}
                            onBlur={(e) => { e.target.value === '' && toggleFocus((oldState) => { return { ...oldState, slFocus: false } }) }}
                            onChange={(e) => updateSl(e.target.value)} />
                        <img
                            src={focus.slFocus ? cancelIcon : initialIcon}
                            alt="..."
                            onClick={() => {
                                toggleFocus((oldState) => { return { ...oldState, slFocus: false } });
                                updateSl('');
                            }}
                            className=" cursor-pointer w-[25px] ml-1 mr-2" />
                    </div>


                    {/*  THIRD SECTION */}
                    <div className=" w-[330px] h-[auto] min-h-[270px]
                                            mx-auto py-2   rounded-[10px]
                                            border border-[#D2D4D9] " >
                        <div className=" rounded-[6px] text-[#1D293F]   w-[320px] h-[50px]  mx-auto my-3 flex justify-center bg">

                            <img src={rlIcon}  alt="..." className=" w-[28px] ml-2 mr-1" />
                            <input
                                value={rl}
                                required
                                placeholder="Where are we delivering to?"
                                className=" w-[230px] h-[40px] my-auto px-2 "
                                onFocus={() => toggleFocus((oldState) => { return { ...oldState, rlFocus: true } })}
                                onBlur={(e) => { e.target.value === '' && toggleFocus((oldState) => { return { ...oldState, rlFocus: false } }) }}
                                onChange={(e) => updateRl(e.target.value)} />
                            <img
                                src={focus.rlFocus ? cancelIcon : initialIcon}
                                alt="..."
                                onClick={() => {
                                    toggleFocus((oldState) => { return { ...oldState, rlFocus: false } });
                                    updateRl('');
                                }}
                                className=" cursor-pointer w-[25px] ml-1 mr-2" />
                        </div>

                        {(userRole === 'THIRD_PARTY' || userRole === 'RECEIVER') &&
                            <div>
                                <div className=" rounded-[6px] text-[#1D293F]   w-[320px] h-[50px]  mx-auto my-3 flex justify-center bg">

                                    <img src={snIcon}  alt="..." className=" w-[28px] ml-2 mr-1" />
                                    <input
                                        value={sn}
                                        required
                                        placeholder="Senders's name"
                                        className=" w-[230px] h-[40px] my-auto px-2 "
                                        onChange={(e) => updateSn(e.target.value)}
                                        onFocus={() => toggleFocus((oldState) => { return { ...oldState, snFocus: true } })}
                                        onBlur={(e) => { e.target.value === '' && toggleFocus((oldState) => { return { ...oldState, snFocus: false } }) }} />
                                    <img
                                        src={focus.snFocus ? cancelIcon : initialIcon}
                                        alt="..."
                                        onClick={() => {
                                            toggleFocus((oldState) => { return { ...oldState, snFocus: false } })
                                            updateSn('');
                                        }}
                                        className=" cursor-pointer w-[25px] ml-1 mr-2" />
                                </div>


                                <div className=" rounded-[6px] text-[#1D293F]   w-[320px] h-[50px]  mx-auto my-3 flex justify-center bg">

                                    <img src={smIcon}  alt="..." className=" w-[28px] ml-2 mr-1" />
                                    <select className="  w-[50px] h-[40px] my-auto font-medium text-[14px]"><option>{`+234`}</option></select>
                                    <div className="h-[30px] bg-[#777F8C] w-[2px] rounded my-auto"></div>
                                    <input
                                        type="number"
                                        value={sm}
                                        required
                                        onChange={(e) => updateSm(e.target.value)}
                                        placeholder="Sender's mobile no."
                                        className=" w-[180px] h-[40px] my-auto px-2 "
                                        onFocus={() => toggleFocus((oldState) => { return { ...oldState, smFocus: true } })}
                                        onBlur={(e) => { e.target.value === '' && toggleFocus((oldState) => { return { ...oldState, smFocus: false } }) }} />
                                    <img
                                        src={focus.smFocus ? cancelIcon : initialIcon}
                                        alt="..."
                                        onClick={() => {
                                            toggleFocus((oldState) => { return { ...oldState, smFocus: false } })
                                            updateSm('');
                                        }}
                                        className=" cursor-pointer w-[25px] ml-1 mr-2" />
                                </div>
                            </div>}

                        {(userRole === 'THIRD_PARTY' || userRole === 'SENDER') &&
                            <div>
                                <div className=" rounded-[6px] text-[#1D293F] 
                                                    w-[320px]
                                                    h-[50px]  mx-auto my-3 flex justify-center bg">

                                    <img src={rnIcon}  alt="..." className=" w-[28px] ml-2 mr-1" />
                                    <input
                                        value={rn}
                                        required
                                        placeholder="Receiver's name"
                                        className=" w-[250px] h-[40px] my-auto px-2 "
                                        onFocus={() => toggleFocus((oldState) => { return { ...oldState, rnFocus: true } })}
                                        onBlur={(e) => { e.target.value === '' && toggleFocus((oldState) => { return { ...oldState, rnFocus: false } }) }}
                                        onChange={(e) => updateRn(e.target.value)} />
                                    <img
                                        src={focus.rnFocus ? cancelIcon : initialIcon}
                                        alt="..."
                                        onClick={() => {
                                            toggleFocus((oldState) => { return { ...oldState, rnFocus: false } })
                                            updateRn('');
                                        }}
                                        className=" cursor-pointer w-[25px] ml-1 mr-2" />
                                </div>


                                <div className=" rounded-[6px] text-[#1D293F]  w-[320px] h-[50px]  mx-auto my-3 flex justify-center bg">

                                    <img src={rmIcon}  alt="..." className=" w-[28px] ml-2 mr-1" />
                                    <select className="  w-[53px] h-[40px] my-auto text-[14px] font-medium"><option>{`+234`}</option></select>
                                    <div className="h-[30px] bg-[#777F8C] w-[2px] rounded my-auto"></div>
                                    <input
                                        type="number"
                                        value={rm}
                                        required
                                        placeholder="Receivers mobile no."
                                        className=" w-[192px] h-[40px] my-auto px-2 "
                                        onChange={(e) => updateRm(e.target.value)}
                                        onFocus={() => toggleFocus((oldState) => { return { ...oldState, rmFocus: true } })}
                                        onBlur={(e) => { e.target.value === '' && toggleFocus((oldState) => { return { ...oldState, rmFocus: false } }) }} />
                                    <img
                                        src={focus.rmFocus ? cancelIcon : initialIcon}
                                        alt="..."
                                        onClick={() => {
                                            toggleFocus((oldState) => { return { ...oldState, rmFocus: false } });
                                            updateRm('')
                                        }}
                                        className=" cursor-pointer w-[25px] ml-1 mr-2" />
                                </div>
                            </div>}


                        <div className=" rounded-[6px] text-[#1D293F] 
                                            w-[320px] h-[50px]  mx-auto my-3 flex justify-center bg">

                            <img src={item}  alt="..." className=" w-[27px] ml-2 mr-1" />
                            <input
                                required
                                placeholder="Item to deliver"
                                value={itemField} className=" w-[250px] h-[40px] my-auto px-2 "
                                onChange={(e) => updateItemField(e.target.value)}
                                onFocus={() => toggleFocus((oldState) => { return { ...oldState, itemFocus: true } })}
                                onBlur={(e) => { e.target.value === '' && toggleFocus((oldState) => { return { ...oldState, itemFocus: false } }) }} />
                            <img
                                src={focus.itemFocus ? cancelIcon : initialIcon}
                                alt="..."
                                onClick={() => {
                                    toggleFocus((oldState) => { return { ...oldState, itemFocus: false } });
                                    updateItemField('')
                                }}
                                className=" cursor-pointer w-[25px] ml-1 mr-2" />
                        </div>
                    </div>
                    {/*  LAST SECTION */}
                    <div className=" w-[320px] mx-auto  text-[16px] font-normal">

                        <div className="my-4">
                            <div className="flex cursor-pointer justify-between"
                                onBlur={() => toggleFocus((oldState) => { return { ...oldState, vehicleFocus: false } })}
                                onClick={() => toggleFocus((oldState) => { return { ...oldState, vehicleFocus: !focus.vehicleFocus } })}>
                                <div>
                                    <img src={vehicle === '' ? vehicleIcon : vehicleIconActive }  alt="..." className=" inline-block w-6 mx-1" />
                                    <p className="inline-block mx-1 text-[#777F8C]"> {(vehicle.length < 3 && vehicle.trim() === '')?'Select vehicle category': <p className="text-[black] font-semibold">{format(`${vehicle}`) } <span className="text-[#27ac27] text-[15px]">{` • N${charge}`}</span></p>}  </p>
                                </div>
                                <img src={dropdownIcon}  alt="..." className="inline-block w-5" />
                            </div>
                            {focus.vehicleFocus && <div className="my-4">
                                {<div className={`  rounded-[20px] my-2 h-[100px] relative
                                                            font-[700] text-[20px] 
                                                            flex p-[18px] justify-between 
                                                            bg-[#FFFFF]  mx-auto border-[2px] 
                                                                `}
                                    onClick={() => {
                                       bikeSettings.status && updateVehicle('BIKE');
                                       !bikeSettings.status && showError((oldState)=>{return{...oldState,bikeError:true}})
                                     }}
                                    style={vehicle === 'BIKE' ? vehicleActiveClass : vehicleUnActiveClass}>

                                    <div className="inline-block">
                                        <div><p className="inline-block font-semibold text-[#1D293F]">{'Bike'}</p> <img src={vehicleInfo}  alt="..." className="inline-block w-[15px]" /></div>
                                        <p className="inline-block text-[15px] ">{`Price N${formater.format(charge)}`}</p>
                                    </div>
                                    <img
                                        src={bikeIcon}
                                        alt="..."
                                        className="w-[60px] 
                                                            inline-block mx-auto
                                                             mr-2" />
                                    {vehicle === 'BIKE' && <div
                                        id="mass-card"
                                        className="  absolute -rotate-90 
                                                        w-[65px] h-[25px] py-auto pt-1 
                                                        text-[10px] text-center 
                                                        tracking-tight text-white 
                                                        bg-[#FF9E00] rounded-t-lg
                                                        right-[-20px] bottom-9 ">
                                        <p style={{ textOrientation: 'upright' }}>MAX 50KG</p>
                                    </div>}
                                    {error.bikeError &&  <div className=" absolute right-[-100px] rounded-md px-1 bg-[red] text-white ">{bikeSettings.systemMessage || 'Not available at the moment'}</div>}

                                </div>}

                                {<div className={`  rounded-[20px] my-2 h-[100px] relative
                                                            font-[700]  text-[20px] 
                                                            flex p-[18px] justify-between 
                                                            bg-[#FFFFF] w-[290px] mx-auto
                                                            border-[2px] 
                                                                `}
                                    onClick={() => {
                                       vanSettings.status && updateVehicle('VAN')
                                       !vanSettings.status && showError((oldState)=>{return{...oldState,vanError:true}})

                                    }}
                                    style={vehicle === 'VAN' ? vehicleActiveClass : vehicleUnActiveClass}>
                                    <div className="inline-block">
                                        <div><p className="inline-block font-semibold text-[#1D293F]">{'Van'}</p>
                                            <img src={vehicleInfo}  alt="..." className="inline-block w-[15px]" /></div>
                                        <p className="inline-block  text-[15px] ">{`Price N${formater.format(charge * 1.8)}`}</p>
                                    </div>
                                    <img src={vanIcon}  alt="..." className="w-[60px] inline-block mx-auto mr-2" />
                                    {vehicle === 'VAN' &&

                                        <div id="mass-card"
                                            className="  absolute -rotate-90
                                                w-[65px] h-[25px] py-auto pt-1
                                                text-[10px] text-center 
                                                tracking-tight text-white
                                                bg-[#FF9E00] rounded-t-lg 
                                                right-[-20px] bottom-9 ">
                                            <p style={{ textOrientation: 'upright' }}>MAX 150KG</p></div>
                                    }
                                  {error.vanError &&  <div className=" absolute right-[-100px] rounded-md px-1 bg-[red] text-white ">{vanSettings.systemMessage || 'Vehicle no available at the moment'}</div>}

                                </div>}

                            </div>}
                        </div>

                        <div className="my-4">
                            <div 
                                onClick={()=>toggleFocus((oldState)=>{return{...oldState,noteFocus:!focus.noteFocus}})}
                                onAbort={()=>toggleFocus((oldState)=>{return{...oldState,noteFocus:false}})}
                                className="flex cursor-pointer  justify-between ">
                                 <div className=" flex items-center">  
                                    <img src={note === ''? noteIcon : noteIconActive} alt="..." className=" inline-block w-5 mx-1 " />
                                    <p className="inline-block mx-1 text-[#777F8C] w-[200px] "> { note === '' ? `Leave a note` : <p className="text-black  font-medium truncate">{note}</p> }</p>
                                </div>
                                <img src={dropdownIcon}  alt="..." className="inline-block w-5" />
                            </div>
                            { focus.noteFocus &&
                                <div className="my-3 relative">
                                    <textarea value={note} onChange={(e)=>updateNote(e.target.value)} className="w-[320px] focus:outline-none h-[80px] rounded-xl p-3 border-[#27ac27] border-[1.6px] mx-auto " placeholder="Write a message" />
                                    <img src={editIcon}  alt="..." className=" bottom-3 absolute -ml-5"  />
                                </div>}
                        </div>

                        <div className="my-4">
                            <div className="flex justify-between" onClick={()=>toggleFocus((oldState)=>{return{...oldState,cashFocus:!focus.cashFocus}})}>
                                <div>
                                    <img src={ isValid ? cashIcon : cashIconActive}  alt="..." className=" inline-block w-6 mx-1" />
                                    <p className="inline-block mx-1 text-[#777F8C]" style={{color:!isValid&&'black',fontWeight: !isValid&&'500'}}>Receive cash for me <p className=" text-[#27ac27] font-semibold inline-flex ">{ !isValid  && `• NGN ${formater.format(cashToReceive)}` }</p></p>
                                </div>
                                <img src={dropdownIcon}  alt="..." className="inline-block w-5" />
                            </div>
                            { focus.cashFocus &&   <div className=" border rounded-[8px] my-2 text-[#27ac27] font-semibold">
                                   

                                    <div className="inline-block ml-[85px]">
                                        NGN
                                    </div>
                                    <input
                                        required
                                        value={cashToReceive}
                                        type="number"
                                        className=" w-[140px] h-[40px] my-auto px-1 "
                                        onChange={(e)=>updateCashToReceive(e.target.value)} 
                                        />
                                </div>}
                        </div>
           

                    </div>


                    {/* SUBMIT */}

                   { (vehicle === '' )? <div className="w-[300px] h-[45px]  rounded-[5px]
                                            text-center flex 
                                            mx-auto my-8 bg-[#27ac27] cursor-not-allowed text-[white]">
                        <div className=" flex-1 flex  justify-center  ">
                            <p className="my-auto mr-[-20px] font-semibold text-[18px] ">Request a Prime</p>
                        </div>
                        <div className="inline-block w-[40px] ">
                            <img className="w-[20px] mt-3 mx-auto"  alt="..." src={requestIcon} />
                        </div>
                    </div>
                        :
                    <div className="w-[300px] h-[60px] rounded-[5px] 
                                             flex  border-[1.4px] border-[#777F8C]
                                            mx-auto my-8 justify-center "
                          onClick={(e)=>handleSubmit(e)}>
                        <div className="  flex flex-1  justify-center  ">
                            <p className="my-auto mr-[-20px] font-bold text-[25px] text-[#27ac27] ">  {`N${formater.format(charge)}`}</p>
                        </div>



                        <div className="w-[160px]  h-[45px] rounded-[10px]
                                    text-center flex my-auto cursor-pointer
                                    mx-auto mr-2 bg-[#27ac27] text-[white]"
                                    style={{backgroundColor:!validate()&&'gray'}}>
                            <div className=" flex-1 flex  justify-center  ">
                                <p className="my-auto mr-[-20px]  font-semibold text-[15px] ">Request a Prime</p>
                            </div>
                            <div className="inline-block w-[40px] ">
                                <img className="w-[20px]  mt-3 mx-auto" alt="..." src={requestIcon} />
                            </div>
                        </div>
                    </div>}
                </div>


                    

                </div>
    )
  }

  export { OrderPage as default }