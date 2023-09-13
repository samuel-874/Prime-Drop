import { useContext } from "react"
import arrow2 from "../../img/arrow2.svg"
import { IndexContext } from "../dashboard/DashBoard";
import { PackageContext } from "../dashboard/DashBoardHome";

    function RequestCard({width,bgc,text,disabled,index}){
        const {  changeIndex } = useContext(IndexContext);
        const { defaultPackage,updateDefaultPackage } = useContext(PackageContext);
        return (
            <div onClick={()=>{
                text === 'Express'&& updateDefaultPackage('EXPRESS')
                changeIndex(index || 0 );
                }}  className="inline-block cursor-pointer m-[8px]  rounded-[20px] bg-white " >
                    <div  className={`  rounded-[20px] h-[190px] relative
                                        font-[700] text-white text-[22px] 
                                        flex flex-col p-[18px] justify-between 
                                    `} 
                            style={{width:width,background:bgc,opacity:disabled && 0.1}}>
                            <img src={arrow2} className="w-[60px] mx-auto mr-2" />
                            <p className="">{text}</p>
                        </div>
                      { disabled &&  <p style={{color:'black',fontWeight:700,text:'18px',position:'absolute',marginTop:'-92px',marginLeft:'20px'}}>Coming soon..</p>  } 
            </div>
        )
    }

    export { RequestCard as default }