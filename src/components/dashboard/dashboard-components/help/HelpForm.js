import axios from "axios";

import backIcon from "../../../../img/back.svg";
import closeIcon from "../../../../img/close.svg";
import { AnimatePage } from "../../../general/AnimatePage";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../DashBoard";
import fileIcon from "../../../../img/file.svg";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../../../App";


function HelpForm({title,showBothInput,updateHelpPage}) {
    const { setNotification } =  useContext(NotificationContext);
    const { REACT_APP_AUTH_BASE_URL } = process.env;
    const navigate = useNavigate();
    const FileInputRef = useRef(null);
    const [ Bearer, updateBearer ] = useState();
    const [ formData, updateFormData  ] = useState({
        content:'',
        orderId:''
    });

    const [attachment,updateAttachement ] = useState([])

    
    function openFIleDialog(){
        FileInputRef.current.click();
    }


 

        
    const handleFileChange = (event) => {
        if(attachment.length <4){
        
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          const reader = new FileReader();
            
          reader.onload = (e) => {
            const image = selectedFile
           updateAttachement((arrayElement)=>{return[...arrayElement,image]})
  
          };
    
          reader.readAsDataURL(selectedFile);
        }
    }else{
        alert(`Max attachment is 3`)
    }
    }

    const handleRemoveAttachment = (indexToRemove) => {
        updateAttachement((prevAttachments) =>
          prevAttachments.filter((_, index) => index !== indexToRemove)
        );
      };
      


   async  function handleSubmit(e){
        e.preventDefault();

        let complainId;



        const data = { subject:title,content:formData.content,orderId:formData.orderId || 0  }
        const jsonData = JSON.stringify(data)
            await axios ({
                method:'post',
                url:`${REACT_APP_AUTH_BASE_URL}/contact_support`,
                headers:{'Authorization':`Bearer ${Bearer}`, 'Content-Type':'application/json'},
                data: data
            }) .then((response)=>{
           complainId = response.data.data.id
            
           try{
            
            if(attachment){

        
            for( let i = 0 ;i < attachment.length ;i++){
                const imageData = new FormData();
                imageData.append("file",attachment[0]);
                
                axios({
                    method:'post',
                    url:`${REACT_APP_AUTH_BASE_URL}/file/complain_attachment`,
                    headers:{'Authorization':`Bearer ${Bearer}`, 'Content-Type':'multipart/form-data'},
                    params:{ id:complainId},
                    data:imageData
                }).then((response)=>{
                    window.location.assign('/dashboard?complain-sent=true')
                }).catch((error)=>{
                    console.log(error)
                })
        }    }

        }catch(error){
          console.log(error)
        }



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


    useEffect(()=>{
        const  token  = localStorage.getItem('token')
        if(token === undefined || token === null){
          navigate('/signin?loggedOut')
        }else{
            updateBearer(token)
        }
    },[])

    return (
        <AnimatePage>
        <div className=" h-[100%] rounded-2xl py-4 px-5 w-[100%]  ">
            <div className=" flex justify-between mx-auto items-center h-[40px] w-[400px]">
                <div className=" flex  justify-between">
                    <img src={backIcon} alt='...' className=" w-[25px] cursor-pointer" onClick={()=>updateHelpPage((oldState)=>{return{...oldState,index:0}})} />
                    <p className=" mx-4 font-bold  text-[20px]">{title}</p>
                </div>

            </div>
            <div className=" mb-6">
                <div className=" "><p className=" ml-[50px] text-[14px] text-[#777F8C] tracking-tighter">If you can figure it out, you can contact support team.</p></div>

            </div>
            <form className=" w-[100%] flex flex-col" onSubmit={handleSubmit}>
                <div className=" w-[410px] mx-auto">

                    { showBothInput && 
                    <input value={formData.orderId} onChange={(e)=>updateFormData((oldState)=>{return{...oldState,orderId:e.target.value}})} className=" h-[45px] w-[400px] my-1 p-1 px-4 rounded-md border-[1px] border-[#A5A9B2]" required={showBothInput} placeholder="Order ID" type="number" />}
                    <input value={formData.content} onChange={(e)=>updateFormData((oldState)=>{return{...oldState,content:e.target.value}})} className=" h-[45px] w-[400px] my-1 p-1 px-4 rounded-md border-[1px]  border-[#A5A9B2]" required placeholder="Give us more detail to work with" />
                    <div className=" flex justify-around items-center my-1 h-[45px] mt-1 mb-3 w-[400px] rounded-md border-[1px] border-[#A5A9B2] bg-[#E2CCFD]">
                        <p className=" cursor-pointer " onClick={openFIleDialog}>Add attachment</p>
                        <input type="file" ref={FileInputRef} onChange={handleFileChange}  className=" hidden" />
                    </div>
                    <div className=" h-[120px]  flex items-center ">

                    <div className="px-4 flex justify-start ">
                       {
                            attachment.map((img,index)=><div key={index}  className=" mx-1 h-[80px] w-[70px] relative"><img className=" rounded-md"  src={fileIcon} alt='...' /> <img src={closeIcon} className=" w-5 absolute top-[-6px] right-[-6px] cursor-pointer" onClick={()=>handleRemoveAttachment(index)} /></div>)
                        }

                    </div>
                    </div>
                    <div className=" mt-4"><p className=" text-[15px]">Please add any picture or screenshots of the item</p></div>

                    <button type="submit" className=" flex justify-around items-center h-[50px] w-[400px] rounded-md border-[1px] border-[#A5A9B2] bg-[#27ac27] text-white">Contact support</button>
                </div>
            </form>
            </div>
        </AnimatePage>)
}

export { HelpForm }