import plusIcon from "../../../../img/plus.svg";
import visaIcon from "../../../../img/visa.svg";
import addFundIcon from "../../../../img/addfund.svg"
import { UserContext } from "../../DashBoard"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

        function WalletHome(){
            const { balance,fullName } = useContext(UserContext)
            const navigate  = useNavigate()


            const formatter = Intl.NumberFormat("en-ng",{
                currency:'NGN'
            })
            return(
                <div>
              
                 <div className=" text-[#1D293F] mt-[60px] leading-7">
                    <p className=" font-bold text-[24px]">{`Welcome to your Wallet, ${fullName.split(" ")[0]}`}</p>
                   <p className=" font-normal text-[17px]"> Add money to your wallet to enjoy more intuitive experience</p>
                 </div>

                 <div className=" mt-7">
                    <div  className={`  rounded-3xl h-[210px] relative
                                    font-[700] text-white text-[22px] 
                                    flex flex-col p-[25px] py-[26px] justify-between bg-[#F4F4F5] w-[520px]
                                `}>
                        <p className=" font-normal text-[#777F8C] ">Balance</p>
                        <p className=" text-[35px] mt-[-50px] text-[black] ">NGN {formatter.format(balance)}</p>
                        <div className=" relative">
                            <img src={addFundIcon} className=" w-[150px]  cursor-pointer " onClick={()=>navigate('fund')}/>
                            <p className=" absolute left-12 mt-[-30px] font-normal text-[16px]">Add money</p>
                        </div>
                    </div>
                    <div className=" flex w-[520px] mt-3 justify-between">
                        <div  className={`  rounded-2xl h-[150px] relative
                                        font-[700] text-white text-[22px]  cursor-pointer
                                        flex flex-col p-[18px] justify-between w-[240px] bg-[#0E939B]
                                    `}>
                            <div className=" w-[100%] flex justify-between font-normal">
                                <p className=" text-[17px] ">visa</p>
                                <img src={visaIcon} className=" h-15 mt-[-10px]" />
                            </div>
                            <div className=" text-[14px]">
                                <div>
                                    <p className=" inline-block mx-2">****</p>
                                    <p className=" inline-block">4399</p>
                                </div>
                            </div>
                        </div>
                        <div  className={` rounded-2xl h-[150px] relative
                                        font-[700] text-white text-[22px]  cursor-pointer
                                        flex  p-[18px] justify-around w-[240px] bg-[#F4F4F5]
                                    `} >
                                    <div className=" w-[200px] my-auto h-20 grid">
                                        <img src={plusIcon} className="w-5 mt-5 mx-auto" />
                                        <p className=" text-center font-normal text-[18px] text-[#777F8C]">Add new card</p>
                                    </div>
                        </div>
                    </div>
                    </div>
                </div>
            )
        }


        export { WalletHome as default }