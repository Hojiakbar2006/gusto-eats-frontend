import React from "react";
import { Image } from "antd";
import { ads_img } from "../../../utils/helper";

export default function Ads() {
  return (
    <div className="container">
      <div className="comp-container">
        <Image preview={false} src={ads_img} alt="ads" />
      </div>
    </div>
  );
}
