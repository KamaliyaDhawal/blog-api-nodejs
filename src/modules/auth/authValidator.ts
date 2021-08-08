import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { USER_TABLE } from "../../config/tables";
import { Utils } from "../../helpers/utils";
import { AuthUtils } from "./authUtils";

const authUtils: AuthUtils = new AuthUtils();

@ValidatorConstraint({ async: false })
export class IsValidPassword implements ValidatorConstraintInterface {
  public validate(password: string, { object }: any) {
    return Utils.isValidPassword(password);
  }
}

@ValidatorConstraint({ async: false })
export class ConfirmPassword implements ValidatorConstraintInterface {
  public validate(cpassword: string, { object }: any) {
    return cpassword === object.password;
  }
}

@ValidatorConstraint({ async: false })
export class IsUniqueUser implements ValidatorConstraintInterface {
  public async validate(email: string, { object }: any) {
    const user = await authUtils.userByField(USER_TABLE.EMAIL, email);
    return !user ? true : false;
  }
}
