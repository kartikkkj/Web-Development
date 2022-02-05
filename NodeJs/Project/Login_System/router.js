const express = require("express");
const router = express.Router();
const credintial = {
  email: "aky8507049610@gmail.com",
  password: "1234567890",
  name: "Abhi Arya",
};
router.post("/login", (req, res) => {
  if (
    req.body.email == credintial.email &&
    req.body.password == credintial.password
  ) {
    req.session.user = req.body.email;
    req.session.name = credintial.name;
    res.redirect("/route/dashboard");
  } else {
    res.redirect("/route/invalid");
  }
});
router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", {
      user: req.session.user,
      name: req.session.name,
      title: "logged",
    });
  }
});
router.get("/invalid", (req, res) => {
  res.render("Invalid", {
    title: "Invalid user",
  });
});
router.get("/login", (req, res) => {
  res.render("base", {
    title: "Login System",
  });
});


router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.render("base", {
        title: "Login Again",
        logout: "logout successfully...!  Log in again",
      });
    }
  });
});

module.exports = router;
