import React from "react";
import "./scss/Footer.scss";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="footerContainer">
        <div class="footerDescription">
          <h3>About</h3>
          <div class="footerList">
            <p>How Airbnb works</p>
            <p>Newsroom</p>
            <p>Investors</p>
            <p>Airbnb Plus</p>
            <p>Airbnb Luxe</p>
            <p>Hotel Tonight</p>
            <p>Airbnb for Work</p>
            <p>Made possible by Hosts</p>
            <p>Careers</p>
            <p>Founders'Letter</p>
          </div>
        </div>
        <div className="border"></div>
        <div className="socialMediaIcons">
          <FaFacebookF className="socialMediaIcon" />
          <FaTwitter className="socialMediaIcon" />
          <FaInstagram className="socialMediaIcon" />
        </div>
      </div>
    </>
  );
};

export default Footer;
