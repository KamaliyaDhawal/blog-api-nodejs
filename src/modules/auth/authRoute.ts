// Import only what we need from express
import { Router } from "express";
import { Constants } from "../../config/constants";
import { Validator } from "../../validate";
import { AuthController } from "./authController";
import { AuthMiddleware } from "./authMiddleware";
import {
    SignupModel,
    SigninModel
} from "./authModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const authController: AuthController = new AuthController();
const authMiddleware: AuthMiddleware = new AuthMiddleware();

router.post("/signup",
    v.validate(SignupModel),
    authController.signup
);

router.post("/signin",
    v.validate(SigninModel),
    authMiddleware.signin,
    authController.signin
);

router.get(`/getImages${process.cwd()}/${Constants.IMAIGE_ROOT_FOLDER}/:path`,
    authController.getImages
);

// Export the express.Router() instance to be used by server.ts
export const AuthRoute: Router = router;
