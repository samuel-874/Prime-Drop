import showPasswordIcon from "../../../../img/showpassword.svg";
import hidePasswordIcon from "../../../../img/hidepassword.svg";
import lockIcon3 from "../../../../img/lock.svg";
import logo from "../../../../img/Group 2.svg";
import flagIcon from "../../../../img/nigeria svg.png";
import lockIcon from "../../../../img/bxs-lock 2.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../DashBoard";
import defaultAvatar from "../../../../img/profileavatar.webp"
import axios from "axios";
import { NotificationContext } from "../../../../App";




    function PasswordUpdate(){

        const { REACT_APP_AUTH_BASE_URL } = process.env
        const { token } = useContext(UserContext);
        const { setNotification } =  useContext(NotificationContext);

        const [ formData, updateFormData ] = useState({
            currentPassword:'',
            newPassword:'',
            confirmPassword:''
        }) 

        
        const [ formErrors, updateFormErrors ] = useState({
            currentPasswordError:'',
            newPasswordError:'',
            confirmPasswordError:''
        }) 



        const [ showPassword, togglePassword ] = useState({
            currentPassword:true,
            newPassword:false,
            confirmPassword:false,
        });
        const [ passwordIcon,changPasswordIcon] = useState({           
            currentPassword:lockIcon3,
            newPassword:showPasswordIcon,
            confirmPassword:showPasswordIcon,
        });
        
        function handleSubmit(e){
            e.preventDefault();
            const { currentPassword,newPassword ,confirmPassword} = formData;
            const newErrors = {}
            if(currentPassword.length < 6){
               newErrors.currentPasswordError = 'Current password cannot be less than 6'
            }
           
            if(newPassword.length < 6){
               newErrors.newPasswordError = 'New password must be 6 or more characters'
            }

            if( confirmPassword !=  newPassword){
                newErrors.confirmPasswordError = 'Passwords don\'t match !'
          
            }

            updateFormErrors(newErrors)
           
            if(Object.values(newErrors).every((error) => error == '')){
                
                if(confirmPassword.length > 6){
                    const data ={
                        "currentPassword":currentPassword,
                        "newPassword":newPassword
                    }

                    axios({
                        method:'post',
                        url:`${REACT_APP_AUTH_BASE_URL}/user/password_update`,
                        headers:{'Authorization':`Bearer ${token}`, 'Content-Type':'application/json'},
                        data: data
                    }).then((response)=>{
                       updateFormData({
                            currentPassword:'',
                            newPassword:'',
                            confirmPassword:''
                        })
                        setNotification({message:'Password update Successfully',show:true})
                        console.log(response)
                    }).catch((error)=>{
                       if(error.response){
                            if(error.response.data){
                                if(error.response.data.message){
                                   if(error.response.data.message === 'Current password is invalid'){
                                    updateFormErrors((oldState)=>{return{...oldState,currentPasswordError:'Current password is not correct'}})
                                   }
                                }
                            }
                       }
                    })
                }
            }

           
        
        }

        useEffect(() => {
            window.scroll({
                top: 0,
                behavior: "smooth"
            })
        },[])



        return (   
       <div>
         
            <form onSubmit={handleSubmit} >
       <div>
            <h1 className="text-[18px] text-start w-[240px] font-bold  m-[0] " >Current Password</h1>
                <h3 className="font-normal w-[290px] text-[14px] leading-[18px]" >
                Confirm current password</h3>

            <div className="mt-[30px] mb-[10px] h-[50px] rounded-md border p-2 px-4 border-[#777F8C] flex justify-between w-[268px] ">
   
                <div className="  w-[150px]">
                    <input
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={(e)=>updateFormData((oldState)=>{return{...oldState,currentPassword:e.target.value}})}
                        type={ showPassword.currentPassword ? 'text' : 'password'}
                        className="w-[180px] h-[30px] inline-block align-left bg-inherit text-[16px] font-medium focus:outline-none  "
                        placeholder="Current password"
                    />
                   { formErrors.currentPasswordError && <p className=" text-[10px] w-[180px] text-[red] font-medium m-1">{formErrors.currentPasswordError}</p>}
                </div>
                <div className=" flex items-center" >
                    <img src={ passwordIcon.currentPassword} onClick={()=>togglePassword((oldState)=>{return{...oldState,currentPassword:!showPassword.currentPassword}})} className="w-[22px] h-[20px] inline-block" />
                </div>
             </div>
        </div>

        <div className=" mt-10">
             <h1 className="text-[18px] text-start w-[240px] font-bold  m-[0] " >New Password</h1>
             <h3 className="font-normal w-[290px] text-[14px] leading-[18px]" >Provide the new password</h3>


                <div className="mt-[30px] mb-[10px]  h-[50px] rounded-md border p-2 px-4 border-[#777F8C] flex justify-between w-[268px] ">
       
                    <div className="  w-[150px]">
                        <input
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={(e)=>updateFormData((oldState)=>{return{...oldState,newPassword:e.target.value}})}
                            type={ showPassword.newPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            className="w-[180px] h-[30px] inline-block align-left bg-inherit text-[16px] font-medium focus:outline-none  "
                        />
                        { formErrors.newPasswordError && <p className=" text-[10px]  w-[180px] text-[red] font-medium m-1">{formErrors.newPasswordError}</p>}

                    </div>
                    <div className=" flex items-center" >
                        <img src={ passwordIcon.newPassword } onClick={(e)=>{
                            togglePassword((oldState)=>{return{...oldState,newPassword:!showPassword.newPassword}});
                              passwordIcon.newPassword === showPasswordIcon ? changPasswordIcon((oldState)=>{return{...oldState, newPassword: hidePasswordIcon }}) :  changPasswordIcon((oldState)=>{return{...oldState, newPassword: showPasswordIcon }})
                        }} className="w-[22px] h-[20px] inline-block" />
                    </div>
                </div>

                <div className="mt-[20px] mb-[10px] h-[50px] rounded-md border p-2 px-4 border-[#777F8C] flex justify-between w-[268px] ">
       
                    <div className="  w-[150px]">
                        <input
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e)=>updateFormData((oldState)=>{return{...oldState,confirmPassword:e.target.value}})}
                            type={ showPassword.confirmPassword ? 'text' : 'password'}
                            placeholder="Confirm New Password"
                            className="w-[180px] h-[30px] inline-block align-left bg-inherit text-[16px] font-medium focus:outline-none  "
                        />
                     { formErrors.confirmPasswordError && <p className=" text-[10px]  w-[180px] text-[red] font-medium m-1">{formErrors.confirmPasswordError}</p>}

                    </div>
                    <div className=" flex items-center" >
                        <img src={ passwordIcon.confirmPassword } onClick={(e)=>{
                            togglePassword((oldState)=>{return{...oldState,confirmPassword:!showPassword.confirmPassword}});
                            passwordIcon.confirmPassword === showPasswordIcon ? changPasswordIcon((oldState)=>{return{...oldState, confirmPassword: hidePasswordIcon }}) :  changPasswordIcon((oldState)=>{return{...oldState, confirmPassword: showPasswordIcon }})
                        }} className="w-[22px] h-[20px] inline-block" />
                    </div>
                </div>
                </div>



          
                <button className="bg-[#27ac27] h-[54px] text-white w-[268px] rounded-[10px]  my-[20px] active:opacity-75 ">Save Change</button>
            </form>
            </div>)
    }

    export { PasswordUpdate as default }