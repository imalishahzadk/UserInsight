import { AppConfig } from "@/core/config";
import cookieService from "./cookie-service";
import { IAuthSession, IAuthUserData } from "@/core/types";

class JWTService {
  getToken() {
    const session = cookieService.get(AppConfig.authSession);

    if (session) {
      const authSession = JSON.parse(session) as IAuthSession;

      return authSession.token;
    }

    return;
  }

  setAuthSession(session: IAuthSession) {
    cookieService.set(AppConfig.authSession, JSON.stringify(session), {
      expires: 1,
    });
  }

  updateUserData(userData: IAuthUserData) {
    const authSession = cookieService.get(AppConfig.authSession);

    if (authSession && userData) {
      const parsedSession = JSON.parse(authSession) as IAuthSession;
      // console.log("Parsed session:", parsedSession);

      const newSession = { ...parsedSession, user: { ...userData } };
      // console.log("New session to be set:", newSession);

      cookieService.set(AppConfig.authSession, JSON.stringify(newSession), {
        expires: 1,
      });
    }
  }

  getAuthSession() {
    const authSession = cookieService.get(AppConfig.authSession);

    if (authSession) {
      return JSON.parse(authSession) as IAuthSession;
    }

    return;
  }

  clearSession() {
    cookieService.remove(AppConfig.authSession);
  }
}

const jwtService = new JWTService();

export default jwtService;
