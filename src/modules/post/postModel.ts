import { IsNotEmpty, MinLength } from "class-validator";
import * as l10n from "jm-ez-l10n";
import { Constants } from "../../config/constants";
import { POST_TABLE } from "../../config/tables";
import { Model } from "../../model";

l10n.setTranslationsFile("en", "src/language/translation.en.json");

export class PostModel extends Model {
    @MinLength(
        Constants.POST_MODEL.DETAILS_MINI_LENGTH,
        { message: l10n.t("ERR_MINI_LENGTH", { field: POST_TABLE.DETAILS, min: Constants.POST_MODEL.DETAILS_MINI_LENGTH }) }
    )
    @IsNotEmpty()
    public details: string;

    constructor(body: any, params: any) {
        super();
        const {
            details,
        } = body;

        this.details = details;
    }
}

