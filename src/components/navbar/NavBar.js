import { Component, useState } from "react";
import logo from "../../img/Group 1.svg";
import logo2 from "../../img/Group 2.svg";
import plusIcon from "../../img/burger (1).svg";
import minusIcon from "../../img/burger (2).svg";
import "./NavBar.css";
import twitterIcon from "../../img/twitter.svg";
import facebookIcon from "../../img/facebook.svg";
import instagramIcon from "../../img/instagram.svg";
import linkedinIcon from "../../img/linkedin.svg";
import { NavLink, useParams } from "react-router-dom";

function NavBar({toggleBanner}){

   const [src,changeSrc] = useState(plusIcon);
   const [ color,changeColor ] = useState('')
   const [ spatchLogo,changeLogo ] = useState(logo)
   const [ idName,changeIdName ] = useState('n-navbar')
   const [ margin,changeMargin ] = useState('-200%')
   const [ displayProps, changeDisplay ] = useState('')
//    const transition = useTransition(idName)

   function handleClick(){
    if(src == plusIcon){
        changeSrc(minusIcon)
        changeLogo(logo2)
        changeColor('#FFF')
        changeMargin('60px')
        changeDisplay('none')
    }else{
        changeMargin('-200%')
        changeSrc(plusIcon) 
        changeLogo(logo)
        changeColor('')
        changeDisplay('')
    }
    document.querySelector(".NavBar").classList.toggle("active")

}
        return(
            <div className={`NavBar `} id={"navbar"} style={{background:color,transition:'0.5s'}}>
                <div className="NavBar-left-section" >
                     <img className="Logo" id="logo" src={spatchLogo} />
                </div>
                <div>
                    <img onClick={handleClick} className="toggle-icon" id="toggle-icon" style={{right: displayProps == 'none'?'2rem':'',transition:'0.5s'}} src={src}/>
                    <button id="register-btn" style={{display:displayProps}} href="/signup"  >Register</button>
                </div>
                <div className="NavBar-right-section" id="navbar-right-section" style={{top:margin,transition:'1s'}}>
                        <NavLink className="NavBar-Link" id="NavBar-Link" to="#">About</NavLink>
                        <NavLink className="NavBar-Link" id="NavBar-Link" to="#">Contact</NavLink>
                        <NavLink className="NavBar-Link" id="NavBar-Link" >Request</NavLink>
                       
                        <button href="/signup" id="btn">Register</button>
                        <div className="n-area">
                            <p className="n-text">Connect with us on social</p>
                            <div  className="drop-down-icon">
                                <img src={instagramIcon} />
                                <img src={twitterIcon} />
                                <img src={linkedinIcon} />
                                <img src={facebookIcon} />
                            </div>
                        </div>
                </div>
                <p></p>
            </div>
        )
    
}



export { NavBar as default }

