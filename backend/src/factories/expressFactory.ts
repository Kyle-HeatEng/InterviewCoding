import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

abstract class ExpressFactory {
  private static _SetHeaders(req: Request, res: Response, next: NextFunction) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    //@ts-ignore
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  }

  public static Create() {
    const app = express();
    app.use(cors());
    app.use(ExpressFactory._SetHeaders);
    app.use(bodyParser.json({ limit: "5mb" }));
    app.use(bodyParser.urlencoded({ extended: false, limit: "5mb" }));
    return app;
  }
}
export default ExpressFactory;
