import bcryptjs = require("bcryptjs");
import * as jwt from "jsonwebtoken";
import { Constants } from "../config/constants";

export class Jwt {

  public static compareHashPassword(password: string, existedPassword: string) {
    return bcryptjs.compareSync(password, existedPassword);
  }

  public static getEncryptedPassword = (password: string) => {
    return bcryptjs.hashSync(password, Constants.HASH_MAX_LIMIT);
  }

  public static getAuthToken(data: any) {
    return jwt.sign(data, process.env.JWT_SECRET);
  }

  public static decodeAuthToken(token: string) {
    if (token) {
      try {
        return jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return false;
      }
    }
    return false;
  }

}
