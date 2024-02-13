import http from "node:http";
import fs from "node:fs";
import url from "node:url";
import path from "node:path";

const server = http
  .createServer((req, res) => {
    const filePath = getFilePath(req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);

function getFilePath(url) {
  let basePath = ".";
  switch (url) {
    case "/":
      return path.join(basePath, "index.html");
    case "/about":
      return path.join(basePath, "about.html");
    case "/contact-me":
      return path.join(basePath, "contact-me.html");
    default:
      return path.join(basePath, "404.html");
  }
}
