import React, { useEffect } from "react";
import { getFacebookLoginStatus } from "./utils/FacebookSDK";

const Redirect = () => {
  useEffect(() => {
    console.log("Started use effect");
    getFacebookLoginStatus().then((response) => {
      console.log("response from getFacebookLoginStatus", response);
      if (response.status != "connected") {
        console.log("No login status for the person");
      } else {
        console.log(response);
      }
    });
  }, []);
  return <div>Redirect</div>;
};

export default Redirect;
