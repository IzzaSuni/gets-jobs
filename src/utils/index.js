import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

export const IsLogin = () => {
  const cookies = new Cookies();
  const bearer = cookies.get("tokenAccess");
  const signed = bearer ? true : false;
  const user = bearer
    ? {
        user: jwtDecode(bearer).given_name,
        email: jwtDecode(bearer).email,
        userId: jwtDecode(bearer).user_id,
        picture: jwtDecode(bearer).picture,
      }
    : {};

  return { signed, user };
};

export default IsLogin;
