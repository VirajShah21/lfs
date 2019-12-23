const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, "www")));

app.get("/", (req, res) => {
  res.redirect("/index.html");
});

app.get("/api", (req, res) => {
  let service = req.query.service;
  let data = req.query.data;
  let returnData = {};

  switch (service) {
    case "newLib": {
      let file;
      try {
        file = fs.readFileSync(
          path.join(__dirname, "data/libraries.json"),
          "utf-8"
        );
        if (file) file = JSON.parse(file);
        returnData = { success: true };
      } catch (e) {
        file = [];
        returnData = {
          success: false,
          error: e,
          fail: "Check is data/libraries.json is corrupt"
        };
      } finally {
        file.push(data);
        file = JSON.stringify(file);
        fs.writeFileSync(path.join(__dirname, "data/libraries.json"), file);
      }
      break;
    }
    case "getLibs": {
      let file;
      try {
        file = fs.readFileSync(
          path.join(__dirname, "data/libraries.json"),
          "utf-8"
        );
        if (file) file = JSON.parse(file);
        returnData = {
          success: true,
          libraries: file
        };
      } catch (e) {
        returnData = {
          success: false,
          fail: "Check if data/libraries.json is corrupt",
          error: e
        };
      }
      break;
    }
    case "getLibContents": {
      // TODO: All this
      let file;
      try {
        file = fs.readFileSync(
          path.join(__dirname, "data/libraries.json"),
          "utf-8"
        );
        if (file) file = JSON.parse(file);
        returnData = {
          success: true,
          libraries: file
        };
      } catch (e) {
        returnData = {
          success: false,
          fail: "Check if data/libraries.json is corrupt",
          error: e
        };
      }
      break;
    }
    default:
      returnData = {
        success: false,
        fail: `No such service: ${service}`
      };
  }

  res.send(returnData);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
