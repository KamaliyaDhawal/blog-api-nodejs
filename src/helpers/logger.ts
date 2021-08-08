import * as moment from "moment-timezone";
import { createLogger, format, transports } from "winston";

const {
  combine, timestamp, prettyPrint, colorize,
} = format;

export class Log {
  private static timestampFormat: any = moment(new Date()).utc().format("YYYY-MM-DD hh:mm:ss");

  public static getLogger() {
    return createLogger({
      format: combine(
        timestamp({ format: this.timestampFormat }),
        prettyPrint(),
        colorize(),
      ),
      level: "debug",
      transports: [
        new transports.Console()
      ],
    });
  }
}
