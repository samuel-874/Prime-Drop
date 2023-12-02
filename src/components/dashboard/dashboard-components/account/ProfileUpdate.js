import backIcon from "../../../../img/Group 5.svg"
import lockIcon2 from "../../../../img/bxs-lock 1.svg"
import MessageIcon from "../../../../img/Group 314.svg"
import ContactIcon from "../../../../img/Group 314 (1).svg";
import lockIcon3 from "../../../../img/lock.svg";
import logo from "../../../../img/Group 2.svg";
import flagIcon from "../../../../img/nigeria svg.png";
import lockIcon from "../../../../img/bxs-lock 2.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../DashBoard";
import defaultAvatar from "../../../../img/profileavatar.webp"
import axios from "axios";
import { isMoment } from "moment/moment";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../../../App";
import { useDispatch } from "react-redux";
import { startLoading } from "../../../../app/loadingSplice";


    function ProfileUpdate(){

    const { setNotification } =  useContext(NotificationContext);

    const dispatch = useDispatch();
        
    const {  balance, email, fullName, imagePath,phoneNo,token } = useContext(UserContext);
    const FileInputRef = useRef(null);
    const { REACT_APP_AUTH_BASE_URL,REACT_APP_B_URL } = process.env
  
    const navigate = useNavigate();
    const fullNameArray = fullName.split(' ')
    const firstName = fullNameArray[0]
    const lastName = fullNameArray[1]
    
    const [formData, updateFormData] = useState({
        firstname:'',
        lastname:'',
        email:'',
        phoneno:'',
        password:'',
    });
    const image =  `${REACT_APP_B_URL}${imagePath}`;
    const [previewSrc,updatePreview ] = useState( image);

    const [formErrors, setFormErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneno: '',
    });
    useEffect(()=>{
     updateFormData({firstname:firstName,lastname:lastName,email:email,phoneno:phoneNo,password:'*******',image:imagePath})
            if(imagePath){
                updatePreview(`${REACT_APP_B_URL}${imagePath}`)
            }else{
                updatePreview(undefined)
            }
    
        
    },[fullName])

    function openFIleDialog(){
        FileInputRef.current.click();
    }


 
    
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          const reader = new FileReader();
    
          reader.onload = (e) => {
            updatePreview(e.target.result);

          };
    
          reader.readAsDataURL(selectedFile);

          try{
              
              const imageData = new FormData();
              imageData.append("file",selectedFile);

              axios({
                method:'post',
                url:`${REACT_APP_AUTH_BASE_URL}/file/upload_profile`,
                headers:{'Authorization':`Bearer ${token}`, 'Content-Type':'multipart/form-data'},
                data:imageData
            }).then((response)=>{
                console.log(response)
            }).catch((error)=>{
                console.log(error)
            })
          }catch(error){
            console.log(error)
          }
        }
    }

   
      

    async function handleSubmit(e){
        e.preventDefault();  

        const { firstname,lastname,email,phoneno} = formData;
        const data =  { fullName: `${firstname} ${lastname}`, email:email, phoneNo:phoneno }

        dispatch(startLoading());

      await axios({
            method:'post',
            url:`${REACT_APP_AUTH_BASE_URL}/user/profile_update`,
            headers:{'Authorization':`Bearer ${token}`, 'Content-Type':'application/json'},
            data: data
        }).then((response)=>{
            setNotification({message:'Profile update successfully',show:true});
            window.location.assign('/signin?loggedOut')
            console.log(response)
        }).catch((error)=>{
           if(error.response){
                if(error.response.data){
                    if(error.response.data.message){
                        alert(error.response.data.message)
                    }
                }
           }
        })
    }

 
    

    function updateFormField(e){

         updateFormData(
            (oldState)=>{return{...oldState,
                        [e.target.name]:e.target.value}})
    }



        return (
            <div>
               
                <div className="my-[16px] mt-0 text-[#1D293F] ">
                    <h1 className="text-[18px] text-start w-[240px] font-bold  m-[0] my-1 " >Personal Information</h1>
                    <h3 className="font-normal w-[290px] text-[14px] leading-[18px]" >
                    Add your details. We recommend uploading a photo.
                    You'll be able to change it later.</h3>
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className=" w-[270px]">
                        <div className=" flex w-[100%]">
                            <img className=" rounded-full my-auto w-[70px] h-[70px] max-h-[70px] max-w-[70px] bg-center " src={previewSrc || defaultAvatar}  />
                            <p className=" m-auto text-[#27ac27] font-medium cursor-pointer" onClick={openFIleDialog} >Change profile image</p>
                            <input type="file" ref={FileInputRef} onChange={handleFileChange}  className=" hidden" />
                        </div>
                
                <div className=" flex justify-between">
                    <div className="mt-[15px] mb-[14px] flex justify-between p-1 px-2 w-[130px] h-[50px]  rounded-md border-[#777F8C] border-[1px] ">
                        <div className=" ml-1">
                            <p className="  leading-3 text-[12px] text-[#777F8C] font-medium m-0">First Name</p>
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                required
                                onChange={updateFormField}
                                className="w-[80px] h-[20px]  align-left bg-inherit text-[16px] font-medium focus:outline-none "
                            />
                            {formErrors.firstname && <p className="text-red-500 text-[12px] m-0">{formErrors.firstname}</p>}
                        </div>
                            <img className="w-[18px] m-0 p-0 " src={ContactIcon} />                    
                    </div>
                    
                    <div className="mt-[15px] mb-[14px] flex justify-between p-1 px-2 w-[130px] h-[50px]  rounded-md border-[#777F8C] border-[1px] ">
                        <div className=" ml-1">
                            <p className="  leading-3 text-[12px] text-[#777F8C] font-medium m-0">Last Name</p>
                            <input
                                type="text"
                                name="lastname"
                                required
                                value={formData.lastname}
                                onChange={updateFormField}
                                className="w-[80px] h-[20px] align-left bg-inherit text-[16px] font-medium focus:outline-none "
                            />
                            {formErrors.lastname && <p className="text-red-500 text-[12px] m-1">{formErrors.lastname}</p>}
                        </div>
                            <img className="w-[18px] m-0 p-0 " src={ContactIcon} />                    
                    </div>
                </div>



                    <div className="mt-[10px] mb-[14px] h-[56px] rounded-md border p-2 px-4 border-[#777F8C] flex justify-between w-[268px] ">
        
                        <div className="  w-[150px]">
                            <p className="  leading-[8px] text-[12px] text-[#777F8C] font-medium m-0">Phone Number</p>
                            <input
                                name="phoneno"
                                type="tel"
                                minLength={14}
                                maxLength={14}
                                required
                                value={formData.phoneno}
                               onChange={updateFormField}
                                className="w-[180px] h-[30px] inline-block align-left bg-inherit text-[16px] font-medium focus:outline-none  "
                            />
                            {formErrors.phoneno && <p className="text-red-500 text-[12px] m-0">{formErrors.phoneno}</p>}
                        </div>
                        <div className=" flex items-center" >
                            <img src={flagIcon} className="w-[22px] h-[20px] inline-block" />
                        </div>
                    </div>


                    <div className="mt-[10px] mb-[14px] h-[56px] rounded-md border p-2 px-4 border-[#777F8C] flex justify-between w-[268px] ">
        
                        <div className="  w-[150px]">
                            <p className="  leading-[8px] text-[12px] text-[#777F8C] font-medium m-0">Email</p>
                            <input
                            type="email"
                                name="email"
                                value={formData.email}
                                onChange={updateFormField}
                                className="w-[180px] h-[30px] inline-block align-left bg-inherit text-[16px] font-medium focus:outline-none  "
                            />
                            {formErrors.email && <p className="text-red-500 text-[12px] m-0">{formErrors.email}</p>}
                        </div>
                        <div className=" flex items-center" >
                            <img src={MessageIcon} className="w-[22px] h-[20px] inline-block" />
                        </div>
                    </div>

                    <div className="mt-[10px] mb-[10px] h-[56px] rounded-md border p-2 px-4 border-[#777F8C] flex justify-between w-[268px] ">
        
                        <div className="  w-[150px]">
                            <p className="  leading-[8px] text-[12px] text-[#777F8C] font-medium m-0">Change password</p>
                            <input
                                name="password"
                                type="text"
                                readOnly
                                onClick={()=>navigate('p_u')}
                                value={formData.password}
                                className="w-[180px] h-[30px] cursor-pointer inline-block align-left bg-inherit text-[16px] font-medium focus:outline-none  "
                            />
                        </div>
                        <div className=" flex items-center" >
                            <img src={lockIcon} className="w-[22px] h-[20px] inline-block" />
                        </div>
                    </div>




                    <div className="w-[240px] tracking-wide leading-5 mt-10  font-normal text-[12px] text-[#1D293F]">
                        <p className=" text-[18px] font-bold">Loyalty Program</p>
                    <p>if you have a loyalty add the code</p>
                    </div>
                    <div className="mt-[10px] mb-[10px] h-[56px] rounded-md border p-2 px-4 border-[#777F8C] flex justify-between w-[268px] ">
        
                        <div className="  w-[150px]">
                            <input
                                name="password"
                                type="text"
                                className="w-[180px] h-[30px] inline-block align-left bg-inherit text-[16px] font-medium focus:outline-none  "
                                placeholder="code"
                            />
                        </div>
                        <div className=" flex items-center" >
                            <img src={lockIcon3} className="w-[22px] h-[20px] inline-block" />
                        </div>
                    </div>
                    <button className="bg-[#27ac27] h-[54px] text-white w-[268px] rounded-[10px]  my-[20px] active:opacity-75 ">Save Change</button>
                </form>
            </div>
        )
    }

    export { ProfileUpdate as default }