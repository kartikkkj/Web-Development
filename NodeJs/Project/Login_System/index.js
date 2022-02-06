const express = require("express");
const app = express();
const path = require("path");
const body_parser = require("body-parser");
const session = require("express-session");
const { v4: uuid } = require("uuid");
const router = require("./router");

app.set("view engine", "ejs");

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));


app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(
  session({
    secret: uuid(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/route", router);

app.get("/", (req, res) => {
  res.render("base", { title: "Login System" });
});

app.listen(5000);
  