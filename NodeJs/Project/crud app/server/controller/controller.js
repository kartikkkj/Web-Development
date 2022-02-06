const UserDB = require("../model/model");

//create and save new user
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be null" });
  }
  const user = new UserDB({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  user
    .save(user)
    .then((data) => {
      // console.log(data)
      // res.send(data);
      res.redirect('/')
    })
    .catch((err) => {
      res.redirect('/')
    });
};

//retriev and return all user/ retriev and return single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    UserDB.findById(id)
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: "not found" });
          return;
        }
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "Something went wrong" });
      });
  }
  UserDB.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Something went wrong" });
    });
};

// update a new identified user by user id
exports.update = (req, res) => {
  console.log("update");
  if (!req.body) {
    return res.status(400).send({ message: "Something went wrong" });
  }
  const id = req.params.id;
  UserDB.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Something went wrong" });
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Something went wrong" });
    });
};

//delete user with identified user by user id
exports.delete = (req, res) => {
  const id = req.params.id;
  UserDB.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "Something went wrong" });
      } else {
        res.redirect('/')
      }
    }) 
    .catch((err) => {
      res.status(500).send({ message: err.message || "Something went wrong" });
    });
};
