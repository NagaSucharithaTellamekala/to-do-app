const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;

  res.writeHead(200, { "Content-Type": "text/plain" });

  if (url === "/") {
    res.end("Welcome to the Home Page!");
  } else if (url === "/about") {
    res.end("This is the About Page.");
  } else if (url === "/contact") { 
    res.end("Contact: support@123gmail.com");
  } else {
    res.end("404 Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});
