import * as My from "jm-ez-mysql";
import * as _ from "lodash";
import { Tables } from "../../config/tables";

export class AuthUtils {

    public async createUser(user: Json) {
        return My.insert(Tables.USER, user)
    }

    public async userByField(field: string, value: any) {
        const selectParams = ["*"]
        const where = ` ${field} = ? `;
        const data = [value];
        return My.first(Tables.USER, selectParams, where, data);
    }

}
