require("dotenv").config();
const http = require("http");
const { createApp } = require("./app");

const app = createApp();
const server = http.createServer(app);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

server.listen(8000, () => {
  console.log(`server start : http://localhost:8000`);
});
