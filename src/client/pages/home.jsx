import React from "react";
import { Ads, Recommended, SendFeedback, Service } from "../components";

export default function Home() {
  return (
    <>
      <Ads />
      <Recommended />
      <Service />
      <SendFeedback />
    </>
  );
}
