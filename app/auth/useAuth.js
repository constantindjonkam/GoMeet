import { useContext } from "react";
import authStorage from "./storage";
import AuthContext from "./context";
import jwtDecode from "jwt-decode";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    // const user = jwtDecode(authToken);
    setUser(true);
    // authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    // authStorage.removeToken();
  };

  return { user, setUser, logOut, logIn };
};
