import React from "react";
import "./service.css";
import { service_svg1, service_svg2, service_svg3 } from "../../utils/helper";

export default function Service() {
  return (
    <div className="container">
      <div className="comp-container">
        <div className="service">
          <div className="title">
            <h1>Our Services</h1>
            <p>Your Favorite Food Delivery Partner</p>
          </div>
          <div className="content">
            <div className="box">
              <img src={service_svg1} alt="" />
              <h3>Easy To Order</h3>
              <p>You only need a few steps in ordering food</p>
            </div>
            <div className="box">
              <img src={service_svg2} alt="" />
              <h3>Fastest Delivery</h3>
              <p>You only need a few steps in ordering food</p>
            </div>
            <div className="box">
              <img src={service_svg3} alt="" />
              <h3>Best Quality</h3>
              <p>Not only fast for us quality is also number one</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
