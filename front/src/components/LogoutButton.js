import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// const {isAuthenticated} = useAuth0();

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
  
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  };

/*
if(isAuthenticated) {
var result = LogoutButton;
}

else{
    result = LoginButton;
}

*/
export default LogoutButton;