import { Request, Response } from "express";
import { Constants } from "../../config/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { Utils } from "../../helpers/utils";
import { TopicUtils } from "./topicUtils";

export class TopicController {
  private topicUtils: TopicUtils = new TopicUtils();

  public addTopic = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const topic: Json = { name, description, userId: req._locals.user.id };
    await this.topicUtils.addTopic(topic)
    const rb = ResponseBuilder.data({ name, description }, req.t("SUCCESS_ADDED", { name: Constants.ADDED_FIELDS.TOPIC }));
    res.status(Constants.SUCCESS_CODE).json({ msg: rb.msg, code: rb.code, topic: rb.result });
  }

  public getTopics = async (req: Request, res: Response) => {
    const { page = Constants.DEFAULT_PAGE, limit = Constants.DEFAULT_LIMITS } = req.query;
    const limits = Utils.getLimits(+page, +limit);
    const topics = await this.topicUtils.getTopics(limits);
    const rb = ResponseBuilder.paginateData(topics.result, topics.count, req.t("SUCCESS_GET", { name: Constants.ADDED_FIELDS.TOPIC }));
    res.status(Constants.SUCCESS_CODE).json(rb);
  }
}
