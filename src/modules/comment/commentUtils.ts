import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../config/tables";

export class CommentUtils {
    public async addComment(comment: Json) {
        return My.insert(Tables.COMMENTS, comment)
    }

}
