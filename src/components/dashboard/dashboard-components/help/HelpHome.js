import swipeIcon from "../../../../img/dropdown.svg";
import closeIcon from "../../../../img/close.svg";
import { AnimatePage } from "../../../general/AnimatePage";



function HelpHome({ updateHelpPage}) {


   return (
      <AnimatePage>
      <div className="h-[100%] text-[#1D293F] w-[100%] rounded-2xl p-6">
            <div className=" flex justify-between">
                  <p className=" font-bold text-[20px]">Help</p>
             
            </div>
         <div className=" mb-8"><p className=" text-[15px]">How can we be of help to you?</p></div>
            <div className=" my-15">
               <div className="  flex justify-between my-2">
                     <p className=" font-medium text-[15px]">I can’t order</p>
                     <img src={swipeIcon} className=" -rotate-90 w-[20px] cursor-pointer" onClick={(e)=>updateHelpPage((oldState)=>{return{...oldState,title:'I can’t order',index:1}})} />
               </div>
         <div className="bg-[#777F8C] h-[0.5px] w-[100%] rounded-2xl mx-auto " ></div>

               <div className="  flex justify-between my-2">
                  <p className=" font-medium text-[15px]">I can’t add money to my wallet</p>
                  <img src={swipeIcon} className=" -rotate-90 w-[20px] cursor-pointer"  onClick={(e)=>updateHelpPage((oldState)=>{return{...oldState,title:'I can’t add money to my wallet',index:1}})}  />
               </div>
         <div className="bg-[#777F8C] h-[0.5px] w-[100%] rounded-2xl mx-auto " ></div>

               <div className="  flex justify-between my-2">
                  <p className=" font-medium text-[15px]">I can’t add payment method</p>
                  <img src={swipeIcon} className=" -rotate-90 w-[20px] cursor-pointer"  onClick={(e)=>updateHelpPage((oldState)=>{return{...oldState,title:'I can’t add payment method',index:1}})}  />
               </div>
         <div className="bg-[#777F8C] h-[0.5px] w-[100%] rounded-2xl mx-auto " ></div>

               <div className="  flex justify-between my-2">
                  <p className=" font-medium text-[15px]">My package was not delivered</p>
                  <img src={swipeIcon} className=" -rotate-90 w-[20px] cursor-pointer"  onClick={(e)=>updateHelpPage((oldState)=>{return{...oldState,title:'My package was not delivered',index:1,showBothInput:true}})}  />
               </div>
         <div className="bg-[#777F8C] h-[0.5px] w-[100%] rounded-2xl mx-auto " ></div>


               <div className="  flex justify-between my-2">
                  <p className=" font-medium text-[15px]">I want to delete my account</p>
                  <img src={swipeIcon} className=" -rotate-90 w-[20px] cursor-pointer"   onClick={(e)=>updateHelpPage((oldState)=>{return{...oldState,title:'I want to delete my account',index:2}})}  />
               </div>
          <div className="bg-[#777F8C] h-[0.5px] w-[100%] rounded-2xl mx-auto " ></div>

            </div>
            </div>
      </AnimatePage>
   )
}

export { HelpHome }