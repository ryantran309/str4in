import { useEffect } from "react";
import axios from "axios";
import { SERVER_URI } from "../utils";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import NotStarted from "./components/notStarted";
import InProgress from "./components/inProgress";
import Complete from "./components/complete";

function Dashboard() {
    useEffect(() => {
        axios.get(`${SERVER_URI}/workspace/last_workspace`).then((res) => {
            localStorage.setItem("ws", res.data.data);
        });
    }, []);
    return (
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
          <Sidebar />
        </div>
        <div style={{ width: "88%", padding: "0 50px 0 30px" }}>
          <div className="row">
            <Header />
            <NotStarted />
            <InProgress />
            <Complete />
          </div>
        </div>
      </div>
    );
}

export default Dashboard;