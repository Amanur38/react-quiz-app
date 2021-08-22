import Constants from "./Constants";
const localStorage = window.localStorage;

export default class AuthService {
  static isLoggedIn() {
    const userRole = localStorage.getItem(Constants.USER_ROLE);
    if (userRole === null) {
      return false;
    }
    return !!(userRole && userRole !== "");
  }

  static doLogout() {
    localStorage.removeItem(Constants.USER_ROLE);
    window.location.reload(true);
  }
}
