import React, { useState } from "react";
import GuideComponent from "./components/Guide";
// import Header from "./components/header";
import NonSearchingHeader from "./components/NonSearchingHeader";
import Sidebar from "./components/sidebar";
import "./components/Guide.css";
import SideBarNoWs from "./components/SideBarNoWs";

export default function GuidePage() {
  const [guides, setGuides] = useState([
    {
      question: "Why cannot I sign in ?",
      answer:
        "Restarting your computer should be the first thing you do. If you can access the login page, select 'Restart' from the menu after clicking the restart button in the top-left corner of the page. Your website will restart as a result, which will enable you to check if the problem is still present. Also, make sure Caps Lock is disabled. Be sure to provide the correct data, such as a password in the Password area or an email address in the Email field.",
      open: false,
      background: "#1A1A40",
    },
    {
      question: "Will i get free supports and updates ",
      answer:
        "The website will receive free updates. However, for downloads via metered connections, ISP fees can be necessary due to the magnitude of the download.",
      open: false,
      background: "#270082",
    },
    {
      question: "How do I get support ?",
      answer:
        "You can get the support by contact the hotline 09090930 or send the email to str4in@gmail.com.One of our team member will reach to you ASAP",
      open: false,
      background: "#7A0BC0",
    },
    {
      question:
        "When signing up for an account on a website your information is entered into?",
      answer:
        "Your email address and password are required when you click the sign-up button, and then the server* is contacted to see if your account already exists. If so, you are instructed to log in rather than sign up if that is the case.",
      open: false,
      background: "#FA58B6",
    },
    {
      question: "In Str4in, how can I construct a workspace",
      answer:
        "By clicking the 'Create' button on your Workspace header, you can create a new workspace. The website will then send you a Create Workpage Form. Fill it out, then click 'Create Workspace.'' Workspaces can be made without cost.",
      open: false,
      background: "#03C4A1",
    },
    {
      question: "Is there a dashboard for Str4in?",
      answer:
        "You can get the support by contact the hotline 09090930 or send the email to str4in@gmail.com.One of our team member will reach to you ASAP",
      open: false,
      background: "#D65A31",
    },
  ]);

  const toggleAnswerQuestion = (index) => {
    setGuides(
      guides.map((guide, i) => {
        if (i === index) {
          guide.open = !guide.open;
        } else {
          guide.open = false;
        }

        return guide;
      })
    );
  };

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
            zIndex: 1,
          }}
        >
          <SideBarNoWs />
        </div>
        <div style={{ width: "88%", padding: "0 50px 0 30px" }}>
          <div className="row">
            <NonSearchingHeader />
          </div>
          <div className="guides">
            {guides.map((guide, i) => (
              <GuideComponent
                key={i}
                guide={guide}
                index={i}
                toggleAnswerQuestion={toggleAnswerQuestion}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
