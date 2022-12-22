import { Alert, Button, Snackbar, Typography } from "@mui/material";
import GoogleLogin from "react-google-login";
import Navbar from "../../components/navbar";
import { gapi } from "gapi-script";
import { useState } from "react";
import Cookies from "universal-cookie";
import { Router, useHistory } from "react-router-dom";

export default function LoginPage() {
  const [alert, setAlert] = useState({ open: false, msg: "", type: "" });
  const cookies = new Cookies();
  const history = useHistory();
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: process.env.REACT_APP_SECRET,
      plugin_name: "chat",
    });
  });

  const SuccesLoginGoogle = (e) => {
    setAlert({ open: true, msg: "Berhasil Login", type: "info" });
    if (e.tokenId) {
      cookies.set("tokenAccess", e.tokenId, {
        path: "/",
        maxAge: 21600,
      });
      return window.location.href=("/jobs");
    }
  };

  const eResp = (err) => {
    setAlert({ open: true, msg: `Berhasil Login ${err}`, type: "error" });
  };

  //return
  return (
    <>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.type}
          sx={{ width: "100%", bgcolor: "black", color: "white" }}
        >
          {alert.msg}
        </Alert>
      </Snackbar>
      <div className="login">
        <Navbar />
        <div className="login-main">
          <div className="login-main-card">
            <Typography
              sx={{ fontSize: "32px", marginBottom: "32px", color: "white" }}
            >
              Login dengan Google
            </Typography>
            <GoogleLogin
              clientId={process.env.REACT_APP_SECRET}
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="login-main-button"
                >
                  Google
                </Button>
              )}
              onSuccess={SuccesLoginGoogle}
              onFailure={eResp}
            />
          </div>
        </div>
      </div>
    </>
  );
}
