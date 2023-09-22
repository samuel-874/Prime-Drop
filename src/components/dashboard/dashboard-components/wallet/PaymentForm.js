import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../DashBoard';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { startLoading } from '../../../../app/loadingSplice';


export default  function PaymentForm()  {

  const [ amount, setAMount ] = useState(0);
  const dispatch = useDispatch();
  const [ formError, setFormError ] = useState(false);

  const id = localStorage.getItem('id')

 

  const { REACT_APP_FLUTTER_WAVE_PUBLIC_KEY,REACT_APP_AUTH_BASE_URL } = process.env;
  const userInfo = useContext(UserContext);


    const config = {
      public_key: REACT_APP_FLUTTER_WAVE_PUBLIC_KEY,
      tx_ref: Date.now(),
      amount: amount || 100,
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: userInfo.email,
         phone_number: userInfo.phoneNo,
        name: userInfo.fullName,
      },redirect_url: `/dashboard`,
      customizations: {
        title: userInfo.fullName.split(" ")[0],
        description: 'Wallet topup',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
      },
      
    };
  
    const handleFlutterPayment = useFlutterwave(config);


       function handleSubit(){
        console.log("first log")
      if(amount.length > 2){
        setFormError(false)

        const payload={
          "source":'Fluter wave',
          "description":"Wallet topup with gateway"
          ,"amount":amount
          ,"type":'FUNDING'}


          dispatch(startLoading())

          
        axios({
          method:'post',
          url:`${REACT_APP_AUTH_BASE_URL}/transactions/init`,
          headers:{'Authorization':`Bearer ${userInfo.token}`, 'Content-Type':'application/json'},
          data:payload
        }).then((response)=>{
            localStorage.setItem('id',response.data.data.id)
          console.log(response)
          debugger
        }).then(()=>{

        handleFlutterPayment({
          callback: (response) => {
            console.log("second log")

            console.log(response)
            if(response.status === 'success'){
              console.log("third log")
    
                 
              
             }
             closePaymentModal() // this will close the modal programmatically
          },
          onClose: () => {
            console.log("fourth log")
          },
        });

        }).catch((error)=>{
          console.log(error)
        })

      }else{

        setFormError(true)
      }


    }

  
    return (
      <div className=" ml-[100px]">
      <div>
        <h1 className=' text-[60px]  text-black font-bold'>Add Fund</h1>
      </div>
      <div className=' text-[#777F8C]'>
        <p className=' text-[20px] font-semibold' >Enter amount</p>
        <div className=' flex text-[33px]'>
        <p className='  mx-2 font-bold'>&#x20A6;</p>
        <input type='number' value={amount}  max={1000000} className=' w-[220px] text-black font-semibold'
         onChange={(e)=>{ setAMount(e.target.value); 
                          setFormError(false);}} />
        </div>
        <div className="bg-[#777F8C] h-[1px] my-[1px] w-[270px] rounded-2xl  " ></div>
        { formError && <p className=' text-[#FF3E3E]'>Amount must not be less than #300 </p>}
      </div>
  
        <button className=" border-[#27ac27] border-t-[1px] h-[60px] w-[300px] border-x-[1px] border-b-[3px] my-20"
          onClick={() => handleSubit()}
        >
          Add Fund
        </button>
      </div>
    );
  }
