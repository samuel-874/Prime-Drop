import HistoryView from "./HistoryView";
import bikeIcon from "../../../../img/bike.png";
import vanIcon from "../../../../img/van.png";
import dotMapIcon from "../../../../img/dotmap.svg";
import senderIcon from "../../../../img/sh.svg";
import rigthArrow from "../../../../img/right.svg";
import cancelIcon from "../../../../img/graycancel.svg";
import receiverIcon from "../../../../img/rh.svg";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../../DashBoard";
import { useNavigate } from "react-router-dom";

 export const ShowFullContext = createContext();
 
 function TransactionList(){
      
     const navigate = useNavigate();

     const [ transactions,updateTransactions ] = useState();
     const [ showIndex,updateShowIndex ] = useState(0); 
     const [ lt,updateLt] = useState();
     const  { token }  = useContext(UserContext);
     const { REACT_APP_AUTH_BASE_URL } = process.env;


     
     function updateHelper(index){
        updateShowIndex(index)
   }

   



     useEffect(() =>  {

          if(token){
               axios({
                    url: `${REACT_APP_AUTH_BASE_URL}/order/all`,
                    headers: { Authorization:`Bearer ${token}`, 'Content-Type':'multipart/form-data'}
               }).then((response) => {
                const array = response.data.data
                if(array){
                   updateTransactions(array.reverse()) 
                }
                    console.log('transact:', transactions)
               }).catch((error)=>{
                    console.log(error)
               })
          }

     },[token])

   

     useEffect(()=>{
        if(transactions){
            updateLt(transactions[0])
       }
     },[transactions])

     function changeLt(i){
        updateLt(transactions[i])
        window.scroll({top:0,behavior:"smooth"})
     }


          return (
               <div>
                <div className="flex flex-col w-[100%]  my-5">
                    <div className=" FirstBody mx-auto  mt-10 w-[450px] h-[700px]">
                        <div className=" text-[18px] text-[#1D293F] m-2">
                            <p className=" font-bold">These are your order history</p>
                            <p className=" text-[14px] font-normal">Confirm your current password</p>
                        </div>
                        <div className="h-[500px]   w-[100%] mt-10 ">
                        {/* CODE GOES HERE */}


     {                       <div className="  h-[auto] pb-20 ">
                        
                            { transactions ?  transactions.map((transaction,index)=>
                                <HistoryView index={index} updateShowIndex={updateHelper } showIndex={showIndex} updateLt={changeLt} id={transaction.alphaNumericId} key={transaction.id} location={transaction.dropOffLocation} date={transaction.orderDate} charge={transaction.charge} canceled={transaction.orderStatus === 'CANCELLED'} nav={true} receiversName={transaction.receiversName} sendersName={transaction.sendersName} pickOffLocation={transaction.pickOffLocation} dropOffLocation={transaction.dropOffLocation}    />)
                               : "no transactions yet" 
                           }
                            </div>}

                        </div>
                    </div>

                </div>
            </div>
          )
     }

     export { TransactionList as default }