import { Request, Response } from "express";
import _ = require("lodash");
import { Constants } from "../../config/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { CommentUtils } from "./commentUtils";

export class CommentController {
  private commentUtils: CommentUtils = new CommentUtils();

  public addComment = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { comment } = req.body;
    const userId = req._locals.user.id;
    const commentDeails = { postId, comment, userId }
    await this.commentUtils.addComment(commentDeails);
    const rb = ResponseBuilder.data({ comment }, req.t("SUCCESS_ADDED", { name: Constants.ADDED_FIELDS.COMMENT }));
    res.status(Constants.SUCCESS_CODE).json({ msg: rb.msg, code: rb.code, comment: rb.result });
  }

}
