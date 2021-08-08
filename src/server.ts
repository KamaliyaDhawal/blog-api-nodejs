import * as bodyParser from "body-parser"; // pull information from HTML POST (express4)
import * as dotenv from "dotenv";
import * as busboy from "connect-busboy";
import * as express from "express";
import * as fs from "fs";
import * as fileUpload from "express-fileupload";
// tslint:disable-next-line: no-var-requires
import * as helmet from "helmet"; // Security
import * as l10n from "jm-ez-l10n";
import { DB } from "./database";
import { Log } from "./helpers/logger";
import { Routes } from "./routes";
import { Constants } from "./config/constants";

dotenv.config();
// initialize database
DB.init();

export class App {
  protected app: express.Application;
  private logger = Log.getLogger();

  constructor() {
    const NODE_ENV = process.env.NODE_ENV;
    const PORT = process.env.PORT as string;
    this.app = express();
    this.app.use(helmet());
    this.app.all("/*", (req, res, next) => {
      // res.setHeader("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Request-Headers", "*");
      // tslint:disable-next-line: max-line-length
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization, token, x-device-type, x-app-version, x-build-number, uuid,x-auth-token,X-L10N-Locale,x-auth-organization");
      res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
      } else {
        next();
      }
    });
    l10n.setTranslationsFile("en", `src/language/translation.en.json`);
    this.app.use(l10n.enableL10NExpress);
    this.app.use(busboy({ immediate: true }));
    this.app.use(fileUpload({
      parseNested: true,
    }));
    this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.json(), (error, req, res, next) => {
      if (error) {
        return res.status(400).json({ error: req.t("ERR_GENRIC_SYNTAX") });
      }
      next();
    });
    const routes = new Routes();

    if (!fs.existsSync(`${process.cwd()}/${Constants.IMAIGE_ROOT_FOLDER}/`)) {
      fs.mkdirSync(`${process.cwd()}/${Constants.IMAIGE_ROOT_FOLDER}/`);
    }

    this.app.use("/api", routes.path());
    const Server = this.app.listen(PORT, () => {
      this.logger.info(`The server is running in port localhost: ${process.env.PORT}`);
      this.app.use((err: any, req: any, res: any, next: () => void) => {
        if (err) {
          this.logger.error(`ERROR : ${err}`);
          res.status(500).json({ error: req.t("ERR_INTERNAL_SERVER") });
          return;
        }
        next();
      });

    });
  }
}
