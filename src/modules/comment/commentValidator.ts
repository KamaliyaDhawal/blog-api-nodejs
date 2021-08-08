import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Utils } from "../../helpers/utils";
import { CommentUtils } from "./commentUtils";

const commentUtils: CommentUtils = new CommentUtils();

@ValidatorConstraint({ async: false })
export class IsValidPassword implements ValidatorConstraintInterface {
  public validate(password: string, { object }: any) {
    return Utils.isValidPassword(password);
  }
}
