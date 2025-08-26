const fs = require("fs");
const path = require("path");
const authService = require("./services/authService");
const s3Service = require("./services/s3Service");

exports.handler = async (event) => {
  const { httpMethod, path: route, body } = event;

  switch (route) {
    case "/login":
      if (httpMethod === "GET") return servePage("login.html");
      if (httpMethod === "POST") return authService.login(JSON.parse(body));

    case "/logout":
      return servePage("logout.html");

    case "/library":
      return servePage("library.html");

    case "/upload":
      return s3Service.uploadFile(JSON.parse(body));

    case "/delete":
      return s3Service.deleteFile(JSON.parse(body));

    default:
      return { statusCode: 404, body: "Page not found" };
  }
};

const servePage = (fileName) => {
  const filePath = path.join(__dirname, "pages", fileName);
  const html = fs.readFileSync(filePath, "utf-8");
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: html,
  };
};
