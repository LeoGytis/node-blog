const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Request received", req);
});

server.listerer(3000, "localhost", () => {
  console.log("Server is running on port 3000");
});
