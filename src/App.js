import './App.css';
import Form from "./components/form/signup/Form1";
import FormCompletion from "./components/form/signup/Form2";
import { ValidateMail, resendMobileOtp, sendResetPasswordOtp } from './service/service';
import SignInEmailForm from "./components/form/signin/SignInEmail"
import OnBoarding from "./components/onboarding/OnBoarding";
import infoIcon from "./img/info 2.svg";
import PaymentForm from "./components/dashboard/dashboard-components/wallet/PaymentForm";
import PasswordResetVerifyOtp from "./components/form/password-reset/PasswordConfirmation";
import PasswordResetCompletion from "./components/form/password-reset/PasswordResetCompletion";
import PasswordReset from "./components/form/password-reset/PasswordReset";
import PhoneConfirmation from "./components/form/signup/Form3";
import NotFound from "./components/general/NoFound";
import DashBoard from "./components/dashboard/DashBoard"
import ResponseCard from "./components/ResponseCard/ResponseCard.js"
import { BrowserRouter, Routes ,Route, useNavigate } from 'react-router-dom';
import Helper from "./components/general/Helper";
import DashBoardHome from "./components/dashboard/DashBoardHome";
import CreditCardForm from './components/dashboard/dashboard-components/wallet/CreditCardForm';
import DashBoardRequest from "./components/dashboard/dashboard-components/Request";
import DashBoardAccount from "./components/dashboard/dashboard-components/account/Account";
import DashBoardHistory from "./components/dashboard/dashboard-components/history/History";
import Home from "./components/home/Home";
import ProfileUpdate from "./components/dashboard/dashboard-components/account/ProfileUpdate"
import PasswordUpdate from "./components/dashboard/dashboard-components/account/PasswordUpdate";
import Wallet from "./components/dashboard/dashboard-components/wallet/Wallet";
import WalletHome from "./components/dashboard/dashboard-components/wallet/WalletHome";
import TransactionList from "./components/dashboard/dashboard-components/history/TransactionList";
import Transaction from "./components/dashboard/dashboard-components/history/Transaction";
import BadResponseCard from "./components/ResponseCard/BadResponseCard";
import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '@react-spring/web';
import { AddCard } from './components/dashboard/dashboard-components/wallet/AddCard';
import { Contact } from './components/general/Contact';
import { stopLoading } from './app/loadingSplice';

  export const NotificationContext = createContext();

  function App() {
  const loading = useSelector( state => state.loading.value)
  const {REACT_APP_MY_NEW_KEY} = process.env;
  const dispatch = useDispatch();

  const [ notification,setNotification ] = useState({message:'',show:false})

  useEffect(()=>{
    setTimeout(()=>{
      setNotification((oldState)=>{return{...oldState,show:false}})
    },10000)
  },[notification])


  function stoploader(){
      dispatch(stopLoading());
  }
    useEffect(()=>{
      if(loading){
        setTimeout(stoploader,10000)
      }
    },[loading])





  return (
    <div className="App">
    {
      loading &&
      <div className=' fixed top-0 bottom-0 z-[9999]  cursor-not-allowed left-0 right-0 flex items-center ml-[50%]'>
            <div class="loading-spinner">
                  <div class="spinner"></div>
                  <p className=' loading-text '>loading...</p>
                  </div>
            </div>
          }


    <div className="w-[390px] rounded-2xl absolute z-[99999] left-[450px] top-[-100px] h-[60px] flex p-3 pl-8 bg-[#F7F8FA] shadow-md"
        style={{top: notification.show ? '20px' : '-100px',transition:' top 1s'}}>
        <img src={infoIcon} alt="..." className="w-[25px] m-1 " />
        <p className="text-[17px] font-semibold m-1 font-commons">{notification.message}</p>
    </div>


      <NotificationContext.Provider value={{notification,setNotification}}>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<OnBoarding />} />  
                  <Route path='signup' element={<Form />} />
                  <Route path='signin' element={<SignInEmailForm />} />
                  <Route path='dashboard' element={<DashBoard />}>
                  <Route path='contact' element={<Contact />} />
                      <Route path="" element={<DashBoardHome />}/>
                      <Route path="request" element={<DashBoardRequest />} />
                      <Route path="wallet" element={<Wallet />} >
                         <Route path="" element={<WalletHome />} />
                         <Route path="getCard" element={<AddCard />} />
                         <Route path="fund" element={<PaymentForm />} />
                         <Route path='addcard' element={<CreditCardForm />} />
                        
                        
                      </Route>

                      <Route path="history" element={<DashBoardHistory />} >
                          <Route path="" element={<TransactionList />} />
                          <Route path=":id" element={<Transaction />} />
                      </Route>
                      <Route path="account" element={<DashBoardAccount />} >
                        <Route path='' element={<ProfileUpdate />} />
                        <Route path='p_u' element={<PasswordUpdate />}  />
                      </Route>
                  </Route>
                  <Route path='signup/confirmation/:message' element={<ResponseCard />} />
                  <Route path='signup/error/:message' element={<BadResponseCard />} />
                  <Route path='signup/spatch/confirmation/email'  element={<Helper someFunction={ValidateMail} />} />
                  <Route path='signup/completion' element={<FormCompletion />} />
                  <Route path='signup/confirmation/phone' element={<PhoneConfirmation />} />
                  <Route path='signup/confirmation/phone/resend'  element={<Helper someFunction={resendMobileOtp} />} />
                  <Route path='password-reset/' element={<PasswordReset />} />
                  <Route path='password-reset/confirmation' element={<PasswordResetVerifyOtp />} />
                  <Route path='password-reset/completion' element={<PasswordResetCompletion />} />
                  <Route path='landing-page' element={<Home />} />
                  <Route path='*' element={<NotFound />} />
              </Routes>
          </BrowserRouter>
      </NotificationContext.Provider>
    </div>
    );
  }

export default App;
