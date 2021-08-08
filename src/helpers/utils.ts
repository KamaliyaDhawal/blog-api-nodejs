import { Constants } from "../config/constants";
import { Log } from "../helpers/logger";
import { Regex } from "../config/regex";

export class Utils {

  public static isValidPassword(data: string) {
    const regex = Regex.PASSWORD;
    return regex.test(data);
  }

  public static getLimits(page: number, limit: number) {
    const pages = page ? +page : Constants.DEFAULT_PAGE;
    return [limit, pages > 1 ? (pages - 1) * limit : 0];
  }

  public static getCurrentlyAddedDataId = (firstId: number, totalEntries: number) => {
    const attchments = [firstId]
    for (let i = 1; i < totalEntries; i++) {
      firstId = firstId + 1;
      attchments.push(firstId);
    }
    return attchments;
  }

  private static logger: any = Log.getLogger();

}
