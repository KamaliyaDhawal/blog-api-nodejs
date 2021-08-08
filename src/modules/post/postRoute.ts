import { Router } from "express";
import { Validator } from "../../validate";
import { PostController } from "./postController";
import { PostMiddleware } from "./postMiddleware";
import {
    PostModel
} from "./postModel";

const router: Router = Router();
const v: Validator = new Validator();
const postController: PostController = new PostController();
const postMiddleware: PostMiddleware = new PostMiddleware();

router.post("/:topicId",
    v.validate(PostModel),
    postMiddleware.topicValidation,
    postMiddleware.imageValidation,
    postMiddleware.updalodImages,
    postController.addPost
);

router.get("/",
    postController.getPosts
);

export const PostRoute: Router = router;
