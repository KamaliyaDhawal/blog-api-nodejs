import { Request, Response } from "express";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { TopicUtils } from "./topicUtils";

export class TopicMiddleware {
    private topicUtils: TopicUtils = new TopicUtils();

    public checkDuplication = async (req: Request, res: Response, next: () => void) => {
        const { name } = req.body;
        const { user } = req._locals;
        const topic = await this.topicUtils.checkDuplicate(name, user.id);
        if (topic) {
            const rb = ResponseBuilder.badRequest(req.t("ERR_TOPIC_DUPLICATE", { name }));
            return res.status(rb.code).json(rb);
        }
        next();
    }
}