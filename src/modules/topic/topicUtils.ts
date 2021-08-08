import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables, TOPIC_TABLE } from "../../config/tables";

export class TopicUtils {
    public async addTopic(topic: Json) {
        return My.insert(Tables.TOPIC, topic)
    }

    public async checkDuplicate(name: string, userId: number) {
        const selectParams = ["*"]
        const where = ` ${TOPIC_TABLE.NAME} = ? and ${TOPIC_TABLE.USERID} = ? `;
        const data = [name, userId];
        return My.first(Tables.TOPIC, selectParams, where, data);
    }

    public getTopics = async (limits) => {
        const selectParams = ["*"];
        const where = "";
        const addWhere = ` GROUP BY ${TOPIC_TABLE.ID} ORDER BY ${TOPIC_TABLE.CREATED_AT} LIMIT ? OFFSET ? `;
        const countBy = [`DISTINCT ${TOPIC_TABLE.ID}`];
        return My.findAllWithCount(Tables.TOPIC, countBy, selectParams, where, addWhere, limits);
    }

    public topicByField = async (field: string, value: any) => {
        const selectParams = ["*"];
        const where = `${field} = ?`;
        const data = [value]
        return My.first(Tables.TOPIC, selectParams, where, data);
    }
}
