import React, { useState } from "react";
import GuideComponent from "./components/Guide";
// import Header from "./components/header";
import NonSearchingHeader from "./components/NonSearchingHeader";
import Sidebar from "./components/sidebar";
import "./components/Guide.css";
import AboutUsComponent from "./components/About";
import SideBarNoWs from "./components/SideBarNoWs";

export default function AboutUsPage() {
  return (
    <>
      <div className="d-flex" style={{ height: "100vh" }}>
        <div
          className="main-sidebar"
          style={{
            width: "24%",
            borderRight: "1px solid #d1d1d1",
            animation: "2s emergeAnimation ease-in-out",
            backgroundColor: "rgb(80, 70, 229)",
          }}
        >
          <SideBarNoWs />
        </div>
        <div style={{ width: "88%", padding: "0 50px 0 30px" }}>
          <div className="row">
            <NonSearchingHeader />
          </div>
          <div className="about-us">
            <AboutUsComponent />
          </div>
        </div>
      </div>
    </>
  );
}
