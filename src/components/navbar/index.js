import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import IsLogin from "../../utils";

export default function Navbar() {
  const { user, signed } = IsLogin();
  return (
    <div className="navbar">
      <p
        className="navbar-brand"
        onClick={() => (window.location.href = "/jobs")}
      >
        <b>GitHub</b> Jobs
      </p>

      {user && (
        <div
          style={{ display: "flex", flexDirection: "row" }}
          onClick={() => (window.location.href = "/")}
        >
          <p className="navbar-user">halo {user.user}</p>
          <div
            style={{
              height: "42px",
              width: "42px",
              backgroundImage: `url(${user.picture})`,
              margin: "auto",
              backgroundPosition: "center",
              marginLeft: "8px",
              borderRadius: "100%",
            }}
            onClick={() => (window.location.href = "/")}
          />
        </div>
      )}
    </div>
  );
}
