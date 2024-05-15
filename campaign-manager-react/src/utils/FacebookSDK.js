// export const initFacebookSdk = () => {
//   return new Promise((resolve, reject) => {
//     // Load the Facebook SDK asynchronously
//     window.fbAsyncInit = () => {
//       window.FB.init({
//         appId: "966459428425465",
//         cookie: true,
//         xfbml: true,
//         version: "v19.0",
//       });
//       // Resolve the promise when the SDK is loaded
//       resolve();
//     };
//   });
// };

export const getFacebookLoginStatus = () => {
  return new Promise((resolve, reject) => {
    window.FB.getLoginStatus((response) => {
      resolve(response);
    });
  });
};

export const fbLogin = () => {
  return new Promise((resolve, reject) => {
    window.FB.login(
      (response) => {
        resolve(response);
      },
      { config_id: "703228478688597" }
    );
  });
};

export const fbLogout = () => {
  return new Promise((resolve, reject) => {
    window.FB.logout((response) => {
      resolve(response);
    });
  });
};
