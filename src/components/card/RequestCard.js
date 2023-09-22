import { useContext, useEffect, useState } from "react"
import arrow2 from "../../img/arrow2.svg"
import { IndexContext } from "../dashboard/DashBoard";
import { PackageContext } from "../dashboard/DashBoardHome";

    function RequestCard({width,bgc,text,disabled,index,serviceName}){
        const {  changeIndex } = useContext(IndexContext);
        const { defaultPackage,updateDefaultPackage } = useContext(PackageContext);
        const [ showError ,updateShowError ] = useState(false);
        const appSettings = JSON.parse(localStorage.getItem('App data')) || []
        const currentSettings = appSettings.find((appSet)=>{
            return appSet.service === serviceName;
        })
        useEffect(()=>{
            setTimeout(() => {
                updateShowError(false)
            }, 5000);
        },[showError])

        return (
            <div onClick={()=>{
                text !== 'Same Day'  && updateDefaultPackage(text.toUpperCase())
               !disabled &&  changeIndex(index || 0 );
                updateShowError(true)
                }}  className={`inline-block relative cursor-pointer m-[8px]  rounded-[20px] bg-white `} >
                    <div  className={`  rounded-[20px] h-[190px] relative
                                        font-[700] text-white text-[22px] 
                                        flex flex-col p-[18px] justify-between 
                                    `} 
                            style={{width:width,background:bgc,opacity:disabled && 0.1}}>
                            <img src={arrow2} className="w-[60px] mx-auto mr-2" />
                            <p className="">{text}</p>
                        </div>
                        { (disabled && showError) && <div className=" absolute top-[0] bg-[#c34040] rounded-md px-1 h-40px]  text-white">{currentSettings.systemMessage}</div>}
                      { disabled &&  <p style={{color:'black',fontWeight:700,text:'18px',position:'absolute',marginTop:'-92px',marginLeft:'20px'}}>Coming soon..</p>  } 
            </div>
        )
    }

    export { RequestCard as default }