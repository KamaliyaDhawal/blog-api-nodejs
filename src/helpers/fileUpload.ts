import bcryptjs = require("bcryptjs");
import * as path from "path";
import { Constants } from "../config/constants";
import { Log } from "./logger";

export class FileUpload {
  private logger = Log.getLogger();

  public imageValidation = async (images: any) => {
    let otherFile: boolean = false;
    let fileName: string = "";
    for (let i = 0; i < images.length; i++) {
      const extension = (path.extname(images[i].name)).toLowerCase();
      if (Constants.IMAGES_EXTENTIONS.indexOf(extension) === -1) {
        otherFile = true;
        fileName = images[i].name;
      }
    }
    return { otherFile, fileName }
  }

  public updalodImages = async (images: any) => {
    const attachments = [];
    for await (let image of images) {
      const imagePath = `${process.cwd()}/${Constants.IMAIGE_ROOT_FOLDER}/${image.name}`;
      await image.mv(imagePath, async (err) => {
        if (err) {
          this.logger.error("ERROR : ", err);
          return false;
        }
      });
      attachments.push({ imagePath });
    }
    return attachments;
  }

}
