import addIcon from "../../img/add 2.svg";
import infoIcon from "../../img/info 2.svg";
import SideBar from "../navbar/SideBar";
import jwtDecode from "jwt-decode";
import PopupCard from "../card/PopUpCard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import ErrorCard from "../card/ErrorCard";
import axios from "axios";

import swipeIcon from "../../img/dropdown.svg";
import backIcon from "../../img/back.svg";
import closeIcon from "../../img/close.svg";
import { HelpHome } from "./dashboard-components/help/HelpHome";
import { HelpForm } from "./dashboard-components/help/HelpForm";
import { HelpDelete } from "./dashboard-components/help/HelpDelete";
import { NotificationContext } from "../../App";

   export const UserContext = createContext({ balance:0,email:"",fullName:"",imagePath:undefined, phoneNo:"", token:"" });
   export const Authenticated = createContext();
   export const VIContext = createContext();
   export const IndexContext = createContext();


   function DashBoard(){   
   

   const { REACT_APP_AUTH_BASE_URL } = process.env;
   const navigate = useNavigate();
   const location = useLocation();
   const token = localStorage.getItem('token');
   const { setNotification } = useContext(NotificationContext);

   if(token === undefined || token === null){
      navigate('/signin?login-required')
   }

   
   const [ userInfo ,updateUserInfo ] = useState(
      { balance:0,email:"",fullName:"",imagePath:undefined, phoneNo:"", token:"" })

   const [ isAutheticated, changeAuth ] = useState(true);
   const [ index,changeIndex ] = useState(0);


   const [ helpPage,updateHelpPage ] = useState({
         index:0,
         title:'',
         showBothInput:false
      });


   const [ isVisible,toggleVisibility ] = useState({
      addIconVisibility:true,
      infoIconVisibility:true,
      showHelp:false,
      errorCard:false
  })
   

  
 
   useEffect(()=>{

      if(token === undefined || token === null){
         navigate('/signin?login-required')
      }else{
         updateUserInfo((oldInfo)=>{return{...oldInfo,token:token}})
      }

      
   
     try{
            const decodedJwt = jwtDecode(token);
            const expirationDate = decodedJwt.exp
            const date = new Date().getTime() / 1000;
            if(expirationDate >= date){
               changeAuth(true)
             }else {
                changeAuth(false)
               }
            
    
      }catch(error){
         changeAuth(false)
      }

      
         if(isAutheticated){
               axios({
                  method:'get',
                  url:`${REACT_APP_AUTH_BASE_URL}/user`,
                  headers:{'Authorization':`Bearer ${token}`, 'Content-Type':'multipart/form-data'}
               }).then((response)=>{
                  updateUserInfo((oldInfo)=>{return{...oldInfo,...response.data.data}})
               }).catch((error)=>{
                        const { response } = error;
                  if(error.response){
                        if(error.response.data){

                           if(error.response.data.error === 'Token expired'){
                              alert(`token expired`)
                              changeAuth(false)
                           }
                        }

                  }else{
                     toggleVisibility((oldState)=>{return{...oldState,errorCard:true}})
                  }
                  
               })            

               if(location.search){
                  const tid = localStorage.getItem('id')
                  const fwId = new URLSearchParams(location.search).get('transaction_id');
                  const status = new URLSearchParams(location.search).get('status');
                  const complain = new URLSearchParams(location.search).get('complain-sent')

                  
                  if(status === 'successful' && tid){
                     axios({
                        method:'post',
                        url:`${REACT_APP_AUTH_BASE_URL}/transactions/complete-transaction`,
                        headers:{'Authorization':`Bearer ${token}`, 'Content-Type':'application/json'},
                        params:{id:tid,fwId:fwId}
                   }).then((response)=>{
                     localStorage.removeItem('id')
                     setNotification({message:'Funding was successful',show:true})
                     navigate('/dashboard')
                   }).catch((error)=>{
                     console.log(error)
                   })
                  }else if( complain === 'true'){
                           setNotification({message:'Complain sent successfully',show:true})
                             navigate('/dashboard')
                     }
                  
               }

            

         }
     
   
      },[])


      useEffect(()=>{
         axios({
            url:`${REACT_APP_AUTH_BASE_URL}/user/get-app-settings`,
            headers:{Authorization: `Bearer ${token}`}
         }).then((response)=>{
            localStorage.setItem('App data',JSON.stringify(response.data.data[0] || []))
            localStorage.setItem('Route Cost',JSON.stringify(response.data.data[1] || []))
         }).catch((error)=>{

         })
      },[])

      useEffect(()=>{
         toggleVisibility((oldState)=>
         {return{...oldState,addIconVisibility:true,infoIconVisibility:true}})
     },[index])
     
 
      function updateAuth(value){
         changeAuth(value)
      }   

      function page(){
         if(helpPage.index === 2){
            return <HelpDelete {...helpPage} updateHelpPage={updateHelpPage}  />
         }else if(helpPage.index === 1){
            return <HelpForm {...helpPage} updateHelpPage={updateHelpPage} />
         }else{
            return <HelpHome  updateHelpPage={updateHelpPage} />
         }
      }



    return (
       <div  className="dashboard font-commons w-[100%] h-[900px]  left-0 ">
            <div id="body" className=" grid  relative  w-[100%]">

               <UserContext.Provider value={userInfo}>
                     <SideBar /> <h1 className=" absolute z-[99] lg:hidden text-40px">+</h1>
               </UserContext.Provider>
               
               <div className="w-[auto] top-3 right-4 z-[999] flex absolute">

                 { isVisible.infoIconVisibility ?  
                     <div className="bg-[#F7F8FA] w-[45px] m-0 h-[45px] flex   shadow-md rounded-lg ">
                        <img src={infoIcon} alt="..." className="w-[25px] mx-auto " />
                     </div>
                     :
                     <div  className={`  rounded-[10px] h-[140px]  mr-4  
                                       font-[400] text-[#4A5466] text-[12px] 
                                       flex flex-col p-[18px] justify-between  shadow-md
                                 `} 
                           style={{width:'270px',background:'#F7F8FA'}}>
                           <div className=" flex ">
                               <img src={infoIcon} alt="..." className="w-[25px] mx-auto mr-0 " /> 
                           </div>
                           <div className="mt-[-11px]">
                              <p className="text-[15px] font-[500]">Package Dimensions</p>
                              <p>The maximum dimension of your package are dependent on the luggage capacity of your choosen vehicle (car or motorbike).</p>
                              <p className=" text-[#27ac27]">More information</p>
                           </div>
                     </div>}
               </div>

               {
                  isVisible.showHelp &&
               <div className="  fixed bg-[rgba(0,0,0,0.5)] top-0 bottom-0 flex items-center left-0 right-0 z-[99999]">
                  <div className=" w-[450px] rounded-2xl relative h-[500px] bg-white mx-auto ">
                  <img src={closeIcon} alt='...' className=" absolute right-5 top-7 w-[50px] cursor-pointer" 
                      onClick={()=>{
                        toggleVisibility((oldState)=>{return{...oldState,addIconVisibility:true,showHelp:false}})
                        updateHelpPage({index:0,title:'',showBothInput:false})}} />
                    { page() }
                  </div>
               </div>
               }

               



               <div className="">
               <UserContext.Provider value={userInfo}>
                  <Authenticated.Provider value={{isAutheticated,updateAuth}}>
                     <VIContext.Provider value={{isVisible,toggleVisibility}}>
                        <IndexContext.Provider value={{index,changeIndex}}>
                              <div className=" z-[999]">
                                 {<Outlet />}
                              </div>
                        </IndexContext.Provider>
                    </VIContext.Provider>
                     {!isAutheticated && <PopupCard />}
                     { isVisible.errorCard && <ErrorCard />}
                  
                  </Authenticated.Provider>
               </UserContext.Provider>

               </div>
  
            </div>
            {
               isVisible.addIconVisibility &&
                  <div className="mx-auto mr-4 fixed bottom-0 right-0 ">
                  <img src={addIcon} alt="..." className="w-[100px] cursor-pointer" onClick={()=>toggleVisibility((oldState)=>{
                     return{...oldState,addIconVisibility:false,showHelp:true}})} /></div>
           }
 
         </div>
      )
 }

    export { DashBoard as default }