import { Request, Response } from "express";
import { USER_TABLE } from "../../config/tables";
import { Jwt } from "../../helpers/jwt";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { AuthUtils } from "./authUtils";

export class AuthMiddleware {
    private authUtils: AuthUtils = new AuthUtils();

    public signin = async (req: Request, res: Response, next: () => void) => {
        const { email, password } = req.body;
        const user = await this.authUtils.userByField(USER_TABLE.EMAIL, email);
        if (user) {
            const valid = Jwt.compareHashPassword(password, user.password);
            if (!valid) {
                const rb = ResponseBuilder.unAuthorize(req.t("ERR_INVALID_CREDENTIALS"));
                return res.status(rb.code).json({ msg: rb.error, code: rb.code });
            }
            if (req._locals) {
                req._locals.user = user;
            } else {
                req._locals = { user };
            }
            next();

        } else {
            const rb = ResponseBuilder.unAuthorize(req.t("ERR_EMAIL_NOT_FOUND"));
            return res.status(rb.code).json(rb);
        }
    }
}