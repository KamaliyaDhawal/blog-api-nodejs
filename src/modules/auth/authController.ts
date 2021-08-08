import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { existsSync } from "fs"
import { Constants } from "../../config/constants";
import { Jwt } from "../../helpers/jwt";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { SendEmail } from "../../helpers/sendEmail";
import { AuthUtils } from "./authUtils";

dotenv.config();

export class AuthController {
  private authUtils: AuthUtils = new AuthUtils();
  private SendEmail: SendEmail = new SendEmail();

  public signup = async (req: any, res: Response) => {
    const { firstname, lastname, email, password } = req.body;
    const user: Json = {
      firstname,
      lastname,
      email,
      password: Jwt.getEncryptedPassword(password)
    };
    const result = await this.authUtils.createUser(user);
    this.SendEmail.sendEmail(`signup`, req.t("MAIL_SUB_SIGNUP"), [email], { "{USERNAME}": `${firstname} ${lastname}` });
    delete user.password;
    user.token = Jwt.getAuthToken(user);
    const rb = ResponseBuilder.data({ id: result.insertedId, ...user }, req.t("SUCCESS_SIGNUP"));
    res.status(Constants.SUCCESS_CODE).json({ msg: rb.msg, code: rb.code, user: rb.result });
  }

  public signin = async (req: Request, res: Response) => {
    const { id, firstname, lastname, email } = req._locals.user;
    const user: Json = { id, firstname, lastname, email };
    const token = Jwt.getAuthToken(user);
    user.token = token;
    const rb = ResponseBuilder.data(user, req.t("SUCCESS_SIGNIN", { name: `${firstname} ${lastname}` }));
    res.status(Constants.SUCCESS_CODE).json({ msg: rb.msg, code: rb.code, user: rb.result });
  }

  public getImages = async (req: any, res: Response) => {
    const { path } = req.params;
    const destination = `${process.cwd()}/${Constants.IMAIGE_ROOT_FOLDER}/${path}`;
    if (existsSync(destination)) {
      res.sendFile(destination);
    } else {
      const rb: ResponseBuilder = ResponseBuilder.badRequest(req.t("ERR_FILE_NOT_FOUND"));
      return res.status(rb.code).json(rb);
    }
  }

}
