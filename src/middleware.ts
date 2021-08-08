import { Request, Response } from "express";
import * as _ from "lodash";
import { Constants } from "./config/constants";
import { USER_TABLE } from "./config/tables";
import { Jwt } from "./helpers/jwt";
import { ResponseBuilder } from "./helpers/responseBuilder";
import { AuthUtils } from "./modules/auth/authUtils";

export class Middleware {
    private authUtils: AuthUtils = new AuthUtils();

    public authorizeUser = async (req: Request, res: Response, next: () => void) => {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.replace(Constants.TOKEN_PREFIX, "");
            const decodedUser = Jwt.decodeAuthToken(token);
            if (decodedUser && decodedUser.id) {
                const user = await this.authUtils.userByField(USER_TABLE.ID, decodedUser.id);
                if (user) {
                    if (req._locals) {
                        req._locals.user = user;
                    } else {
                        req._locals = { user };
                    }
                    next();
                } else {
                    const rb = ResponseBuilder.unAuthorize(req.t("ERR_UNAUTH"));
                    return res.status(rb.code).json(rb);
                }
            } else {
                const rb = ResponseBuilder.unAuthorize(req.t("ERR_UNAUTH"));
                return res.status(rb.code).json(rb);
            }
        } else {
            const rb = ResponseBuilder.unAuthorize(req.t("ERR_UNAUTH"));
            return res.status(rb.code).json(rb);
        }
    }

}
