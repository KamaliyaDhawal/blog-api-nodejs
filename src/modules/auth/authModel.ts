import { IsNotEmpty, MaxLength, MinLength, IsEmail, Validate } from "class-validator";
import * as l10n from "jm-ez-l10n";
import { Constants } from "../../config/constants";
import { USER_TABLE } from "../../config/tables";
import { Model } from "../../model";
import {
    ConfirmPassword,
    IsUniqueUser,
    IsValidPassword,
} from "./authValidator";

l10n.setTranslationsFile("en", "src/language/translation.en.json");

export class SignupModel extends Model {
    @MinLength(
        Constants.SIGNUP_MODEL.NAME_MINI_LENGTH,
        { message: l10n.t("ERR_MINI_LENGTH", { field: USER_TABLE.FIRSTNAME, min: Constants.SIGNUP_MODEL.NAME_MINI_LENGTH }) }
    )
    @MaxLength(
        Constants.SIGNUP_MODEL.NAME_MAX_LENGTH,
        { message: l10n.t("ERR_MAX_LENGTH", { field: USER_TABLE.FIRSTNAME, max: Constants.SIGNUP_MODEL.NAME_MAX_LENGTH }) }
    )
    @IsNotEmpty()
    public firstname: string;

    @MinLength(
        Constants.SIGNUP_MODEL.NAME_MINI_LENGTH,
        { message: l10n.t("ERR_MINI_LENGTH", { field: USER_TABLE.LASTNAME, min: Constants.SIGNUP_MODEL.NAME_MINI_LENGTH }) }
    )
    @MaxLength(
        Constants.SIGNUP_MODEL.NAME_MAX_LENGTH,
        { message: l10n.t("ERR_MAX_LENGTH", { field: USER_TABLE.LASTNAME, max: Constants.SIGNUP_MODEL.NAME_MAX_LENGTH }) }
    )
    @IsNotEmpty()
    public lastname: string;

    @MinLength(
        Constants.SIGNUP_MODEL.EMAIL_MINI_LENGTH,
        { message: l10n.t("ERR_MINI_LENGTH", { field: USER_TABLE.EMAIL, min: Constants.SIGNUP_MODEL.EMAIL_MINI_LENGTH }) }
    )
    @MaxLength(
        Constants.SIGNUP_MODEL.EMAIL_MAX_LENGTH,
        { message: l10n.t("ERR_MAX_LENGTH", { field: USER_TABLE.EMAIL, max: Constants.SIGNUP_MODEL.EMAIL_MAX_LENGTH }) }
    )
    @Validate(IsUniqueUser, {
        message: l10n.t("ERR_DUPLICATE_EMAIL"),
    })
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @Validate(IsValidPassword, {
        message: l10n.t("ERR_PASSWORD_VALIDATION"),
    })
    @IsNotEmpty()
    public password: string;

    @Validate(ConfirmPassword, {
        message: l10n.t("ERR_CPASSWORD_NOT_MATCH"),
    })
    @IsNotEmpty()
    public cpassword: string;

    constructor(body: any) {
        super();
        const {
            firstname,
            lastname,
            email,
            password,
            cpassword
        } = body;

        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.cpassword = cpassword;
    }
}

export class SigninModel extends Model {
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    public password: string;

    constructor(body: any) {
        super();
        const {
            email,
            password,
        } = body;

        this.email = email;
        this.password = password;
    }
}

