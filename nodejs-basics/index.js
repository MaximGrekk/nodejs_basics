const http = require("http");
const path = require("path");
const fs = require("fs");

const htmlContent = `
  <h1>Form</h1>
  <form method="post" action="/">
    <input name="title" type="text" />
    <button type="submit">Send</button>
  </form>
`;

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    if (req.url === "/") {
      fs.readFile(
        path.join(__dirname, "views", "index.html"),
        "utf-8",
        (err, content) => {
          if (err) throw new Error(err);
          res.end(content);
        }
      );
    } else if (req.url === "/about") {
      fs.readFile(
        path.join(__dirname, "views", "about.html"),
        "utf-8",
        (err, content) => {
          if (err) throw new Error(err);
          res.end(content);
        }
      );
    } else if ((req.url = "/api/users")) {
      res.writeHead(200, { "Content-Type": "text/json" });
      const users = [
        { name: "Marina", age: 20 },
        { name: "Marina", age: 21 },
      ];
      res.end(JSON.stringify(users));
    }
  } else if (req.method === "POST") {
    const body = [];
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    req.on("data", (data) => {
      body.push(Buffer.from(data));
    });

    req.on("end", () => {
      const message = body.toString().split("=")[1];
      res.end(`<h1>Выше сообщение: ${message}</h1>`);
    });
  }
});

server.listen(3003, () => {
  console.log("Server is running...");
});
