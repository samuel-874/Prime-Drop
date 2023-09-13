import BackIcon from "../../../img/Group 5.svg"
import lockIcon from "../../../img/bxs-lock 1.svg"
import ContactIcon from "../../../img/Group 314 (1).svg";
import logo from "../../../img/deliverFull.png";
import flagIcon from "../../../img/nigeria svg.png"
import infoIcon from "../../../img/info.svg"
import { useDispatch, useSelector } from "react-redux";
import { completeRegistartion, validateForm } from "../../../service/service";
import "./Form.css"
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { startLoading, stopLoading } from "../../../app/loadingSplice";
import { setError } from "../../../app/ErrorSplice";
import axios from "axios";

function FormCompletion() {

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [fullName, updateFullName] = useState('');
    const [password, updatePassword] = useState('');
    const [mobileNo, updateMobile] = useState('');
    const [lineColor, changeLineColor] = useState('#777F8C');
    const [lineColor2, changeLineColor2] = useState('#777F8C');
    const [lineColor3, changeLineColor3] = useState('#777F8C');
    const [fullNameError, setFullnameError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [mobileNoError, setMobileNoError] = useState()


    const anyError = useSelector((state) => state.status);
    const error = useSelector((state) => state.errorMessage);
    const search = window.location.search
    const query = new URLSearchParams(search);
    const encodedValue = query.get('token');
    const decodedValue = atob(encodedValue);
    const email = decodedValue.substring(70);


    const handleSubmit = async e => {
        e.preventDefault();
        debugger
        // setFullnameError(validateForm(fullName[0], `fullname`))
        // setPasswordError(validateForm(password, `password`))
        // setMobileNoError(validateForm(mobileNo[0], `mobile  no.`))

        if (fullName !== undefined && password !== undefined && mobileNo !== undefined) {
            if (fullName[0] !== undefined) {
                const fullNameTest = fullName[0].trim();
                if (fullNameTest === '') {
                    setFullnameError('Fullname cannot be Empty');
                } else if (!fullNameTest.includes(' ')) {
                    setFullnameError('Enter a valid fullname');
                } else {
                    setFullnameError();
                    if (password[0] !== undefined) {
                        const passwordTest = password[0].trim();
                        if (passwordTest === '') {
                            setPasswordError('Password cannot be Empty');
                        } else if (passwordTest.length < 6) {
                            setPasswordError('Password must be 6 characters or more');
                        } else {
                            setPasswordError();
                            if (mobileNo[0] !== undefined) {
                                const mobileNoTest = mobileNo[0].trim()
                                if (mobileNoTest.length === 0) {
                                    setMobileNoError('Mobile no. is required');
                                } else if (mobileNoTest.length != 10) {
                                    setMobileNoError('Mobile no. is invalid');
                                } else {
                                    setMobileNoError();
                                    const data = {
                                        fullName: fullName[0],
                                        password: password[0],
                                        phoneNo: `+234${mobileNo}`
                                    }

                                    dispatch(startLoading())


                                    axios.post(`http://localhost:8080/api/v1/spatch/verification/verification_mobile?email=${email}`,data).then((response)=>{
                                        localStorage.setItem('number',data.phoneNo)
                                        window.location.assign('/signup/confirmation/phone')
                                        alert('successful')

                                       
                                    }).catch((error)=>{
                                        dispatch(stopLoading())
                                      if(error.response){
                                        if(error.response.data){
                                            if(error.response.data.message){
                                                const  response  = error.response
                                                if(response.status < 400){
                                                    // localStorage.setItem('number',data.phoneNo)
                                                    // window.location.assign('/signup/confirmation/phone')
                                            }else if(response.status === 404 && response.data.message === `User with email :${email}was not found`){
                                                    alert(`No account tied to provided email`)
                                            }else if(response.status === 401 && response.data.message === `Email has not been verified`){
                                                    alert(`Account has not yet been verified`)
                                            }else if(response.status === 403 && response.data.message === `User has completed profile already`){
                                                alert(`Alert Profile Completed Already`)
                                            }else if(response.status === 403 && response.data.message === `Mobile no. has been taken`){
                                                alert(response.data.message)

                                            }else{
                                                alert(`An error occured in the server please contact our custormer care`)
                                            }
                                            }else{
                                                alert("An error occured on the server")
                                
                                            }
                                        }
                                    }else{
                                        alert('Network Error')
                                    }
                                    })

                                }
                            } else setMobileNoError(`mobile no. is required`)

                        }
                    } else setPasswordError(`password is required`)

                }
            } else setFullnameError(`fullname is required`)

            //check other validation

        } else {
            setFullnameError(`fullname is required`)
            setPasswordError(`password is required`)
            setMobileNoError(`mobile no is required`)
        }

    }





    useEffect(() => {
        if (query === '') {
            window.location.assign(`/404?error=no-auth`)
        }
    })


    return (
        <div className="form px-[4%] py-[1%] ">
            <div className="form-spatch-logo w-[200px]" >
                <img src={logo} />
            </div>

            <div className="flex flex-col leading-8 w-96  lg:w-[1000px] md:w-[100%]   md:px-[29%] mx-auto   px-[15%]  lg:px-[35%] py-[50px]">
                <div className="w-[20px] ">
                    <img src={BackIcon} />
                </div>
                <div className="my-[16px] ">
                    <h1 className="text-[25px] text-start w-[240px] font-bold  m-[0]">Register with Prime.</h1>
                    <h3 className="font-normal w-[187px] text-[15px] leading-[18px] text-[#777F8C]" >Continue creating account with <strong className="text-[black]">{email}</strong></h3>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mt-[15px] mb-[10px] w-[240px] ">
                        <img className="w-[18px] inline-block" src={ContactIcon} />
                        <input

                            type="text"
                            name="fullname"
                            value={fullName}

                            onBlur={() => changeLineColor('#777F8C')}
                            onFocus={() => changeLineColor('#27ac27')}
                            onChange={(e) => updateFullName([e.target.value])}
                            className="w-[80%] align-left bg-inherit text-[#27ac27] text-[16px] font-medium focus:outline-none ml-6"
                            placeholder="fullname"
                        />
                        <div className={`bg-[${lineColor}] h-[1.5px] w-[240px] mt-1`} ></div>
                        {fullNameError && <p className=" text-rose-600 text-[12px] font-medium">{fullNameError}</p>}
                    </div>
                    <div className="mt-[10px] mb-[10px] w-[240px] ">
                        <img className=" inline-block w-[18px]" src={lockIcon} />
                        <input
                            name="password"

                            min={6}
                            type="password"
                            value={password}
                            onBlur={() => changeLineColor2('#777F8C')}
                            onFocus={() => changeLineColor2('#27ac27')}
                            onChange={(e) => updatePassword([e.target.value])}
                            className="w-[80%] align-left bg-inherit text-[#27ac27] text-[16px] font-medium focus:outline-none ml-6"
                            placeholder="i.e mz90ke#..."
                        />
                        <div className={`bg-[${lineColor2}] h-[1.5px] w-[240px] mt-1`}></div>
                        {passwordError && <p className=" text-rose-600 text-[12px] font-medium">{passwordError}</p>}
                    </div>
                    <div className="mt-[10px] mb-[10px] flex w-[240px] ">
                        <div className="w-[65px]">
                            <img src={flagIcon} className="w-[12px] inline-block" />
                            <select
                                name="number"
                                type="tel"
                                min={10}
                                max={10}
                                className="w-[70%] inline-block   bg-inherit text-[#000000] text-[12px] font-medium focus:outline-none "
                                placeholder="70333339000"
                            >
                                <option>+234</option>
                            </select>
                            <div className="bg-[#777F8C] h-[1.5px] w-[100%] mt-1" ></div>
                        </div>
                        <div className="ml-6">
                            <input
                                name="number"
                                type="number"
                                value={mobileNo}
                                onBlur={() => changeLineColor3('#777F8C')}
                                onFocus={() => changeLineColor3('#27ac27')}
                                onChange={(e) => updateMobile([e.target.value])}
                                className="w-[90%] inline-block align-left bg-inherit text-[#27ac27] text-[16px] font-medium focus:outline-none  "
                                placeholder="70333339000"
                            />
                            <div className={`bg-[${lineColor3}] h-[1.5px] w-[100%] mt-1`} ></div>
                            {mobileNoError && <p className=" text-rose-600 text-[12px] font-medium h-[1.5px] w-[100%] mt-1">{mobileNoError}</p>}
                        </div>
                    </div>

                    <button className="bg-[#27ac27] h-[54px] text-white w-[240px] rounded-[10px]  my-[20px] active:opacity-75 ">Continue</button>
                    <p className="w-[240px] tracking-wide leading-4 font-normal text-[12px] text-[#777F8C]">
                        By continuing, you agree to our <strong className="text-[#27ac27]" >Privacy Policy</strong> and our <strong className="text-[#27ac27]" >Terms of Service</strong>
                    </p>
                </form>
            </div>
            {anyError &&
                <div className="h-[120px] justify-around rounded z-[99999] flex w-[270px] absolute right-6 top-6 shadow text-[#4A5466] object-right-top p-4">
                    <div className="w-[70%] text-left m-0">
                        <strong className="text-[black] text-center font-[400]"> Error!</strong>
                        <p className="text-[14px]">{error}</p>
                        <Link to='/help' className="text-[14px] text-[#27ac27]">need help?</Link>
                    </div>
                    <div className=" w-[30%] pl-[20%]">
                        <img className="w-[30px]" src={infoIcon} />
                    </div>
                </div>
            }
        </div>
    )
}

export { FormCompletion as default }