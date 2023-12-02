import addIcon from "../../img/add 2.svg";

import RequestCard from "../card/RequestCard";
import { createContext,  useContext,  useEffect,  useState } from "react";
import OrderPage from "../dashboard/dashboard-components/OrderPage"
import { IndexContext } from "./DashBoard";


export const PackageContext = createContext();

const DashBoardHome = () => {

    const { index, changeIndex } = useContext(IndexContext);
    const [defaultPackage,updateDefaultPackage] = useState("SAME_DAY");
    const rawData = localStorage.getItem('App data')
    const appSettings = rawData !== "undefined" && rawData ? JSON.parse(rawData) : [] ;
    const sameDayBikeSettings = appSettings.find((appSet)=>{
      return   appSet.service === "Same Day Bike Delivery"
    }) ;

    const sameDayVanSettings = appSettings.find((appSet)=>{
      return   appSet.service === "Same Day Van Delivery"
    }) ;


    
    
    const expressBikeSettings = appSettings.find((appSet)=>{
      return   appSet.service === "Express Bike Delivery"
    });
    const expressVanSettings = appSettings.find((appSet)=>{
      return   appSet.service === "Express Van Delivery"
    });


    
    
    const interStateSettings = appSettings.find((appSet)=>{
      return   appSet.service === "Inter State Delivery"
    }) ;
    
    
    const internationalSettings = appSettings.find((appSet)=>{
      return   appSet.service === "International Delivery"
    }) ;


    return (
        <div id="bg-img" className=" dashboard-home ml-[50px] h-[1200px] " >
            <div className=" h-[100%] grid pt-[100px] ">

              { index === 0 ?  
                <div className="  h-[500px] relative  mx-auto w-[700px] ">
                    <p className=" m-2 text-left text-[19px] font-[700]">Would you like to request?</p>
                    { appSettings.length > 0 ? 
                    <PackageContext.Provider value={{defaultPackage,updateDefaultPackage}}>
                        <RequestCard width={'270px'} bgc={'#27ac27'} serviceName={sameDayBikeSettings.service} disabled={sameDayBikeSettings.status === false && sameDayVanSettings.status === false} text='Same Day' index={1} />
                        <RequestCard width={'200px'} bgc={'#15B2E1'} serviceName={expressBikeSettings.service} disabled={expressBikeSettings.status === false && expressVanSettings.status === false} text='Express' index={1}  />
                        <RequestCard width={'200px'} bgc={'#02C963'} serviceName={interStateSettings.service} disabled={!interStateSettings.status} text='Interstate' />
                        <RequestCard width={'270px'} bgc={'#FFB947'} serviceName={internationalSettings.service} disabled={!internationalSettings.status} text='International' />
                    </PackageContext.Provider> 
                    : "fetching app services..."
                  }
                </div>

                    :
                    <PackageContext.Provider value={defaultPackage}>
                        <OrderPage />
                    </PackageContext.Provider>

            
            }
               
            </div>
        </div>

    )
}



export { DashBoardHome as default }