const Userdb = require("../model/model");

//create and save new User
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => {
      req.session.emailIsValid = true;
      res.redirect("/register");
    });
};

exports.isUser = (req, res) => {
  if (!req.body) {
    res.status(400).redirect("/login");
    return;
  }
  const { email: inputEmail, password: inputPassword } = req.body;

  Userdb.find({ email: inputEmail, password: inputPassword })
    .then((data) => {
      const [dataObj] = data;
      if (dataObj) {
        req.session.isLogged = true;
        req.session.userName = dataObj.name;
        res.redirect("/home");
      } else {
        req.session.isValidate = true;
        res.status(400).redirect("/login");
      }
    })
    .catch((err) => {
      req.session.isValidate = true;
      res.status(500).send({ message: "Error retriving" });
    });
};


exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retriving user with id" + id });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retriving user information",
        });
      });
  }
};

//update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!req.body.email.match(emailRegex)) {
    return res.status(400).send({ message: "Invalid email address" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}.Maybe user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

//Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
