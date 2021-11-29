import React from "react";
import er404 from "../../images/404.png";
function NotFound() {
  return (
    <div style={{ width: "100vw", height: "100vh" ,background:'#EEEEEE'}}>
      <img
        src={er404}
        alt=""
        style={{
          width: "60%",
          height: "80%",
          objectFit: "cover",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          display: "block",
        }}
      />
    </div>
  );
}

export default NotFound;
