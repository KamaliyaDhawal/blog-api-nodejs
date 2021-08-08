import { Request, Response } from "express";
import * as _ from "lodash";
import * as My from "jm-ez-mysql";
import { Constants } from "../../config/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { TopicUtils } from "../topic/topicUtils";
import { FileUpload } from "../../helpers/fileUpload";
import { Tables, TOPIC_TABLE } from "../../config/tables";
import { Utils } from "../../helpers/utils";
import { Log } from "../../helpers/logger";

export class PostMiddleware {
    private logger = Log.getLogger();
    private topicUtils: TopicUtils = new TopicUtils();
    private fileUpload: FileUpload = new FileUpload();

    public topicValidation = async (req: Request, res: Response, next: () => void) => {
        const { topicId } = req.params;
        const topic = await this.topicUtils.topicByField(TOPIC_TABLE.ID, topicId);

        //(Disable this is you want only topic owner can add post in the topic)
        if (topic) {
            next()
        } else {
            const rb = ResponseBuilder.badRequest(req.t("ERR_UNAVAILABLE"));
            return res.status(rb.code).send(rb);
        }

        //(Enable this is you want only topic owner can add post in the topic)
        // if (topic && topic.userId === req._locals.user.id) {
        //     next();
        // } else {
        //     const message = topic ? req.t("ERR_UN_TOPIC") : req.t("ERR_UNAVAILABLE");
        //     const code = topic ? Constants.UNAUTH_CODE : Constants.ERROR_CODE;
        //     const rb = ResponseBuilder.badRequest(message, code);
        //     return res.status(rb.code).send(rb);
        // }
    }

    public imageValidation = async (req: Request, res: Response, next: () => void) => {
        if (!req.files.images || req.files.images.length === 0) {
            next();
        } else {
            const images = req.files.images[0] != undefined ? req.files.images : [req.files.images];
            const { otherFile, fileName } = await this.fileUpload.imageValidation(images);
            if (otherFile) {
                return res.status(Constants.ERROR_CODE).send({ code: Constants.ERROR_CODE, msg: req.t("NOT_AN_IMAGE", { file: fileName }) });
            }
            next();
        }
    }

    public updalodImages = async (req: Request, res: Response, next: () => void) => {
        if (!req.files.images || req.files.images.length === 0) {
            next();
        } else {
            const images = req.files.images[0] != undefined ? req.files.images : [req.files.images];
            const attachments = await this.fileUpload.updalodImages(images);
            if (images) {
                const data = await My.insertMany(Tables.ATTECHMENT, attachments);
                if (data && data.insertId) {
                    req.body.images = attachments.length > 1 ? await Utils.getCurrentlyAddedDataId(data.insertId, data.affectedRows) : [data.insertId];
                    req.body.attachments = _.map(attachments, ({ imagePath }) => {
                        return `${process.env.MEDIA_PATH}${imagePath}`
                    })
                    next();
                } else {
                    this.logger.error("ERROR : ", data);
                    return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).send({ code: Constants.ERROR_CODE, msg: req.t("ERR_INTERNAL_SERVER") });
                }
            } else {
                return res.status(Constants.INTERNAL_SERVER_ERROR_CODE).send({ code: Constants.ERROR_CODE, msg: req.t("ERR_INTERNAL_SERVER") });
            }
        }
    }
}