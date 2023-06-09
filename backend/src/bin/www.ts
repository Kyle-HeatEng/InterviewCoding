import * as AppFactory from "../app";
import http from "http";

const app = AppFactory.Create();

const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);

const server = http.createServer(app);
server.listen(port);

function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
