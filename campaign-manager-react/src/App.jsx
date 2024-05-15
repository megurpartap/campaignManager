import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  fbLogin,
  getFacebookLoginStatus,
  // initFacebookSdk,
} from "./utils/FacebookSDK.js";
import axios from "axios";
import conf from "./conf/conf.js";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("Started use effect");
    // getFacebookLoginStatus().then((response) => {
    //   console.log("response from getFacebookLoginStatus", response);
    //   if (response.status != "connected") {
    //     console.log("No login status for the person");
    //   } else {
    //     console.log(response);
    //   }
    // });
    axios.get(`${conf.apiUrl}/api/users/checkRefreshToken`).then((response) => {
      console.log(response.data);
    });
  }, []);
  function login() {
    console.log("reached log in button");
    fbLogin().then((response) => {
      console.log(response);
      if (response.status === "connected") {
        console.log("Person is connected");
        axios
          .post(
            `${conf.apiUrl}/api/users/login`,
            {
              accessToken: response.authResponse.accessToken,
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // something
        console.log("Person is not connected");
      }
    });
  }
  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
