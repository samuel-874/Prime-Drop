import addIcon from "../../img/add 2.svg";

import RequestCard from "../card/RequestCard";
import { createContext,  useContext,  useEffect,  useState } from "react";
import OrderPage from "../dashboard/dashboard-components/OrderPage"
import { IndexContext } from "./DashBoard";


export const PackageContext = createContext();

const DashBoardHome = () => {

    const { index, changeIndex } = useContext(IndexContext);
    const [defaultPackage,updateDefaultPackage] = useState("SAME_DAY");

    


   
    return (
        <div id="bg-img" className=" dashboard-home ml-[50px] h-[1200px] " >
            <div className=" h-[100%] grid pt-[100px] ">

              { index === 0 ?  
                <div className="  h-[500px] relative  mx-auto w-[700px] ">
                    <p className=" m-2 text-left text-[19px] font-[700]">Would you like to request?</p>
                    <PackageContext.Provider value={{defaultPackage,updateDefaultPackage}}>
                        <RequestCard width={'270px'} bgc={'#27ac27'} text='Some day' index={1} />
                        <RequestCard width={'200px'} bgc={'#15B2E1'} text='Express' index={1}  />
                        <RequestCard width={'200px'} bgc={'#02C963'} disabled={true} text='Interstate' />
                        <RequestCard width={'270px'} bgc={'#FFB947'} disabled={true} text='International' />
                    
                    </PackageContext.Provider>
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