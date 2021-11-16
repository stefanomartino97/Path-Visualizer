const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

//Set the views
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//Middlewares
app.use(express.static(path.resolve(__dirname, "images")));
app.use(express.static(path.resolve(__dirname, "scripts")));
app.use(express.static(path.resolve(__dirname, "styles", "css")));
app.use(express.static(path.resolve(__dirname, "views")));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
