import { IsNotEmpty, MinLength } from "class-validator";
import * as l10n from "jm-ez-l10n";
import { Constants } from "../../config/constants";
import { COMMENT_TABLE } from "../../config/tables";
import { Model } from "../../model";

l10n.setTranslationsFile("en", "src/language/translation.en.json");

export class CommentModel extends Model {
    @MinLength(
        Constants.COMMENT_MODEL.COMMENT_MINI_LENGTH,
        { message: l10n.t("ERR_MINI_LENGTH", { field: COMMENT_TABLE.COMMENT, min: Constants.COMMENT_MODEL.COMMENT_MINI_LENGTH }) }
    )
    @IsNotEmpty()
    public comment: string;

    constructor(body: any, params: any) {
        super();
        const {
            comment,
        } = body;

        this.comment = comment;
    }
}

