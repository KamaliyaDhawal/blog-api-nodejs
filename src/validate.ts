import { Model } from "./model";

export class Validator {
  public validate(arg: Model) {
    // tslint:disable-next-line:only-arrow-functions space-before-function-paren
    return function (req, res, next) {
      Model.getModel(arg, req.body, req.query).then((m2) => {
        req.model = m2;
        next();
      }).catch((err) => {
        // Refactor validation messages
        const error = err.length > 0 && err[0].constraints ?
          err[0].constraints[`${Object.keys(err[0].constraints)[0]}`] : err;
        const errMessage = req.t(error).length > 0 ? req.t(error) : error;
        return res.status(400).json({ error: errMessage, code: 400 });
      });
    };
  }
}