import { Request, Response } from "express";
import moment = require("moment");
import { CommentUtils } from "./commentUtils";

export class CommentMiddleware {
    private commentUtils: CommentUtils = new CommentUtils();
}