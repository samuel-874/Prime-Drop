import { Component, useState } from "react";
import "./Home.css";
import Card from "../card/Card"
import Footer from "../footer/Footer";
import NavBar from "../navbar/NavBar";
import DivButton from "../button/Button";
import heart from "../../img/heart.svg";
import icon1 from "../../img/Icon1.svg";
import icon2 from "../../img/icon2.svg";
import icon3 from "../../img/icon3.svg";
import icon4 from "../../img/icon4.svg";
import appleicon from "../../img/apple.svg";
import profilepic1 from "../../img/profile1.svg";
import profilepic2 from "../../img/profile2.svg";
import profilepic3 from "../../img/profile3.svg";
import profilepic4 from "../../img/profile4.svg";
import playstore from "../../img/icons8-google-play.svg";
import ScreenShot from "../../img/Image.png";
import ScreenShot3 from "../../img/bike@2x.png";
import ScreenShot2 from "../../img/screenshot-2.png";



class Home extends Component{
    constructor(props){
        super(props);
      
        this.bannerAds = (<div className="home-banner-middle-section">
                                <h1 className="home-banner-heading">Providing reliable and smart logic solutions.</h1>
                                <h2 className="home-banner-subheading">Just as you take pride in leading your market,we take pride in giving you unparalled delivery services.</h2>
                                <button className="home-banner-btn">Register with us</button>
                                <h3 className="home-banner-minitxt">It's all free no charges</h3>
                                <img className="screenshot" src={ScreenShot}  id="screenshot" />
                            </div>)
    this.state = { bannerContent:this.bannerAds,backgroundcolor:'#6609d8' }
    }

    render(){        
        return (
            <div className="Home">
                {/** Page Top */}
                <div className="home-banner" style={{backgroundColor:this.state.backgroundColor}}>
                    <NavBar />
                    {this.state.bannerContent}
                </div>

                    {/** Page Body */}
                <div className="home-body">
                    <div className="home-body-first-section">
                        <div className="first-section-text">
                            <h1>Trusted to deliver.</h1>
                            <h3>It’s simple. Concentrate on what you do best. We take care of the rest.</h3>
                        </div>
                        <div className="first-section-adscontainer">
                            <Card id="body-card"
                                icon={icon1}
                                heading="Customer Experience" 
                                subheading="We blend human support with functional design to 
                                    offer a unique 360° customer experience."
                            />
                                    
                            <Card 
                                id="ads-2"
                                icon={icon2}
                                heading="Reliable and Efficient"
                                subheading="Spatch is a smart logistics company that offers unparalleled efficiencies services."
                            />
                            <Card
                                id="body-card" 
                                icon={icon3} 
                                heading="Scalable Solutions" 
                                subheading="We make sure your business deliveries needs are covered.
                                Spatch tailors its service to match your requirements."
                            />
                                    
                            <Card 
                                id="body-card"
                                icon={icon4} 
                                heading="Professional Spatcher" 
                                subheading="Spatch experienced drivers reflect the professional image
                                that your customers expect from your business." 
                            />
                        </div>
                    </div>
                    <div className="home-body-second-section">
                        <div id="second-section-left" className="second-section-left">
                            <div className="section-left-container">
                                    <h1 className="bold-heading" >We simplify how you do deliver</h1>
                                <h4 className="light-subheading">Booking your order made easy.
                                    Fully optimized for you and your business on the go. Clear and transparent prices.
                                </h4>
                                    <button className="btn">Register with us</button>
                            </div>
                        </div>
                        <div className="second-section-right">
                                <img className="screenshot-2" src={ScreenShot2} />
                        </div>
                    </div>
                    <div className="home-body-third-section">
                        <div className="body-thrid-section-left">
                                <div className="oval">
                                    {/* This will be styled to an oval */}
                                </div>
                              <img className="screenshot-3" src={ScreenShot3} />
                        </div>
                        <div className="body-thrid-section-right">
                            <div className="section-left-container">
                                <h1 className="bold-heading" id="bold-heading-2" >Work anywhere, with any device</h1>
                                <h4 className="light-subheading" id="light-subheading-2">These companies release their own versions
                                        of the operating systems with minor changes,
                                                and yet always with the same bottom line. </h4>

                                    
                                <DivButton 
                                    icon={appleicon} 
                                    largetext="App Store"
                                    minitext="Available on" 
                                    backgroundcolor="#4d03a9" 
                                    />
                                
                                <DivButton
                                    color="black" 
                                    id="play-store-div-btn"
                                    icon={playstore} 
                                    minitext="Get it on" 
                                    largetext="Google Play" 
                                    backgroundcolor="#F1F5FB" 
                                    />
                                    
                            </div>
                        </div>
                        <div>

                        </div>
                                    
                    </div>
                    <div className="home-body-forth-section">
                        <div className="review-container">
                                     <img className="heart" src={heart} />
                                <div className="forth-section-text"> 
                                    <h1 className="fourth-section-header">What our customers are saying about us.</h1>
                                </div>
                                    
                                    {/** change the style's name */}
                                <div id="snaps-inline" className="fourth-section-reviews">
                                    
                                    <Card id="review"
                                        icon={profilepic1} 
                                        heading="I owe these guys my life. Already used their landing page templates for my latest two projects." 
                                        subheading="@nifries"
                                    />
                                
                                    
                                    <Card id="review"
                                        icon={profilepic2} 
                                        heading="Time is the most precious thing you have when bootstrapping. You can't take time to ponder on design…" 
                                        subheading="@johnsmith"
                                    />

                                
                                    <Card id="review"
                                        icon={profilepic3} 
                                        heading="I owe these guys my life. Already used their landing page templates for my latest two projects." 
                                        subheading="@thetoyin"
                                    />

                                    <Card id="review"
                                        icon={profilepic4} 
                                        heading="I owe these guys my life. Already used their landing page templates for my latest two projects." 
                                        subheading="@mariam"
                                    />
                                </div>
                        </div>
                    </div>           
                </div>
                    <Footer />
            </div>
            )
        }
        
    }
        export { Home as default }