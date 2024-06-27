import Elysia from "elysia";
import APINoteController from "./APInoteController";

export const controllers = new Elysia({ prefix: "/api" })
    .use(APINoteController)

