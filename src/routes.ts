import * as express from "express";
import * as l10n from "jm-ez-l10n";
import { Middleware } from "./middleware";
import { AuthRoute } from "./modules/auth/authRoute";
import { CommentRoute } from "./modules/comment/commentRoute";
import { PostRoute } from "./modules/post/postRoute";
import { TopicRoute } from "./modules/topic/topicRoute";

export class Routes {
  public path() {
    const router = express.Router();
    const middleware = new Middleware();

    router.use("/auth", AuthRoute);
    router.use("/topic", middleware.authorizeUser, TopicRoute);
    router.use("/post", middleware.authorizeUser, PostRoute);
    router.use("/comment", middleware.authorizeUser, CommentRoute);

    router.all("/*", (req, res) => {
      return res.status(404).json({
        error: l10n.t("ERR_URL_NOT_FOUND"),
      });
    });
    return router;
  }
}
