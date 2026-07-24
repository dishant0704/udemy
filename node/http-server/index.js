const http = require("http");
const PORT = 3000;

const server = http.createServer();
const friends = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
server.on("request", (req, res) => {  
  const urlItems = req.url.split("/");
  if (urlItems[1] === "hello") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World\n");
  } else if (req.method === 'POST' && urlItems[1] === "friends") {
    req.on("data", (data) => {
      const newFriend = data.toString();
      console.log("New friend data received:", newFriend);
      friends.push(JSON.parse(newFriend));
    });
  } else if (req.method === "GET" && urlItems[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (req.method === "GET" && urlItems.length === 3) {
      const friendId = Number(urlItems[2]);
      res.end(JSON.stringify(friends[friendId]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 Not Found\n");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
