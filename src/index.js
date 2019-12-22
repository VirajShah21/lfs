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

  switch (service) {
    case "newLib":
      let file;
      try {
        file = fs.readFileSync(
          path.join(__dirname, "data/libraries.json"),
          "utf-8"
        );
        if (file) file = JSON.parse(file);
      } catch (e) {
        file = [];
      } finally {
        file.push(data);
        file = JSON.stringify(file);
        fs.writeFileSync(path.join(__dirname, "data/libraries.json"), file);
      }
      break;
  }
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
