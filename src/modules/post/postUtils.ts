import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { ATTECHMENT_TABLE, COMMENT_TABLE, POST_TABLE, Tables, TOPIC_TABLE, USER_TABLE } from "../../config/tables";

export class PostUtils {

    public async addPost(topic: Json) {
        return My.insert(Tables.POST, topic);
    }

    public async getPosts(limits, topicId) {
        const selectParams = [`post.${POST_TABLE.ID}`, `post.${POST_TABLE.DETAILS}`,
        `CONCAT('[',
                IF(attchment.id != 'NULL',GROUP_CONCAT(DISTINCT JSON_OBJECT('imagePath',attchment.${ATTECHMENT_TABLE.IMAGEPATH})),''),
           ']'
           ) AS images`,
        `CONCAT('[',
                IF(comment.id != 'NULL',GROUP_CONCAT(DISTINCT JSON_OBJECT('comment',comment.${COMMENT_TABLE.COMMENT}, 'id', comment.${COMMENT_TABLE.ID})),''),
           ']'
           ) AS comments`,
            `topic.id as topicId`,
            `topic.name as topicName`,
        `concat(user.${USER_TABLE.FIRSTNAME}, ' ', user.${USER_TABLE.LASTNAME}) as postOwner`
        ];
        const tables = `${Tables.POST} post
        LEFT JOIN ${Tables.ATTECHMENT} attchment ON JSON_CONTAINS(post.images, CAST(attchment.id as JSON), '$')
        LEFT JOIN ${Tables.COMMENTS} comment ON comment.postId = post.id
        INNER JOIN ${Tables.TOPIC} topic ON post.topicId = topic.id
        INNER JOIN ${Tables.USER} user ON post.userId = user.id`;

        // If topicId is available then only this topics posts are return otherwise all posts are return
        const where = topicId ? `post.${POST_TABLE.TOPICID} = ? ` : "";


        const addWhere = `GROUP BY post.${POST_TABLE.ID} ORDER BY post.${POST_TABLE.ID} DESC LIMIT ? OFFSET ?`;
        const uniqueBy = [`DISTINCT post.${POST_TABLE.ID}`];
        const data = topicId ? [topicId, ...limits] : limits;
        let result = await My.findAllWithCount(tables, uniqueBy, selectParams, where, addWhere, data);
        const posts = _.map(result.result, (item) => {
            item.images = item.images ? JSON.parse(item.images).map(i => `${process.env.MEDIA_PATH}${i.imagePath}`) : [];
            item.comments = item.comments ? JSON.parse(item.comments) : [];
            return item;
        });
        return { count: result.count, posts };
    }

}
