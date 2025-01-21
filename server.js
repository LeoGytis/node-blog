const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //   console.log("Request received", req);

  //set header content type
  res.setHeader("Content-Type", "text/html");

  fs.readFile("./views/index.html", (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.write("<h1>Hello brother from node server</h1>");
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000");
});
