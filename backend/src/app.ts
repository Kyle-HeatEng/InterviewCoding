import MongooseFactory from "./factories/mongooseFactory";
import dotenv from "dotenv";
import ExpressFactory from "./factories/expressFactory";
import * as RouteFactory from "./factories/routes";

export function Create() {
  const app = ExpressFactory.Create();

  dotenv.config({
    path: `${__dirname}/../private.env`,
  });

  MongooseFactory.Connection("dev");

  RouteFactory.Create(app);

  return app;
}
