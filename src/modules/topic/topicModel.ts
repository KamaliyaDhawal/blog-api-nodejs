import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import * as l10n from "jm-ez-l10n";
import { Constants } from "../../config/constants";
import { TOPIC_TABLE } from "../../config/tables";
import { Model } from "../../model";

l10n.setTranslationsFile("en", "src/language/translation.en.json");

export class TopicModel extends Model {
    @MinLength(
        Constants.TOPIC_MODEL.NAME_MINI_LENGTH,
        { message: l10n.t("ERR_MINI_LENGTH", { field: TOPIC_TABLE.NAME, min: Constants.TOPIC_MODEL.NAME_MINI_LENGTH }) }
    )
    @MaxLength(
        Constants.TOPIC_MODEL.NAME_MAX_LENGTH,
        { message: l10n.t("ERR_MAX_LENGTH", { field: TOPIC_TABLE.NAME, max: Constants.TOPIC_MODEL.NAME_MAX_LENGTH }) }
    )
    @IsNotEmpty()
    public name: string;

    @MinLength(
        Constants.SIGNUP_MODEL.NAME_MAX_LENGTH,
        { message: l10n.t("ERR_MAX_LENGTH", { field: TOPIC_TABLE.DESCRIPTION, max: Constants.TOPIC_MODEL.DESCRIPTION_MINI_LENGTH }) }
    )
    @IsNotEmpty()
    public description: string;

    constructor(body: any) {
        super();
        const {
            name,
            description,
        } = body;
        this.name = name;
        this.description = description;
    }
}

