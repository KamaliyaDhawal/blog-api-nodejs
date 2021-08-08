// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../validate";
import { SignupModel } from "../auth/authModel";
import { CommentController } from "./commentController";
import {
    CommentModel
} from "./commentModel";

// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const commentController: CommentController = new CommentController();

router.post("/:postId",
    v.validate(CommentModel),
    commentController.addComment
);

// Export the express.Router() instance to be used by server.ts
export const CommentRoute: Router = router;
