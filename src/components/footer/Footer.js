import DivButton from "../button/Button";
import img from "../../img/footerimg.png";
import img1 from "../../img/footerimg1.png";
import logo from "../../img/Group 2.svg";
import appleicon from "../../img/apple.svg";
import twitterIcon from "../../img/twitter.svg";
import linkedinIcon from "../../img/linkedin.svg";
import facebookIcon from "../../img/facebook.svg";
import instagramIcon from "../../img/instagram.svg";
import playstore from "../../img/icons8-google-play.svg";
import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="footer-first-section">
                <div className="img-area">
                    <img id="img" src={img} />
                    <img id="img1" src={img1} />
                </div>

                <div className="text-area">
                    <h1>Manage your deliveries with spatch easily.</h1>
                    <h4>Time is the most precious thing you have when running your business. You can off the time to ponder on logistics.</h4>
                    <div className="btn-container">
                        <button className="text-area-btn">Contact for Support</button>
                    </div>
                </div>
            </div>
            <div className="footer-second-section">
                <div className="col-container">
                    <div className="col-1">
                        <h1>
                            <img className="Logo" src={logo} />
                        </h1>
                        <div className="col-1-text-container">
                            <p id="col-1-text">We delivered over 20,000 jobs successfully since we started this journey.</p>
                        </div>
                    </div>
                    <div className="col-2">
                        <h1 className="footer-heading">Company</h1>
                        <div className="col-list">
                            <li>Company</li>
                            <li>Blog</li>
                            <li>Careers</li>
                            <li>Contact</li>
                        </div>
                    </div>
                    <div className="col-3">
                        <h1 className="footer-heading">Service</h1>
                        <div className="col-list">
                            <li>Same Day</li>
                            <li>International</li>
                            <li>Express</li>
                            <li>Bulk Service</li>
                        </div>
                    </div>
                    <div className="col-4">
                        <h1 className="footer-heading">Download our app</h1>
                        <DivButton

                            icon={appleicon}
                            backgroundcolor="#4d03a9"
                            minitext="Available on"
                            largetext="App Store"
                        />

                        <DivButton
                            id="play-store-div-btn"
                            backgroundcolor="#F1F5FB"
                            icon={playstore}
                            color="black"
                            minitext="Get it on"
                            largetext="Google Store"
                        />
                    </div>
                </div>
                <div className="footer-bottom">
                    <p id="bottom-text-2" className="footer-bottom-text">Connect with us on social</p>
                    <div className="footer-bottom-icons">
                        <img src={facebookIcon} />
                        <img src={twitterIcon} />
                        <img src={instagramIcon} />
                        <img src={linkedinIcon} />
                    </div>
                    <p id="bottom-text-1" className="footer-bottom-text">© Spatch 2021, All Rights Reserved</p>
                </div>
            </div>

        </div>
    )
}

export { Footer as default }