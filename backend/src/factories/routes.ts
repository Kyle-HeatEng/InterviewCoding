import { Application } from "express";

export function Create(app: Application) {
  app.all("*", function (req, res) {
    console.log("req.url", req.url);
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  });
}
