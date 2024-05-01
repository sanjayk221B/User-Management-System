// authMiddleware.js

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
      next();
    } else {
      res.redirect("/login");
    }
  };
  
  const isAuthAdmin = (req, res, next) => {
    if (req.session.isAuth) {
      res.redirect("/");
    } else {
      next();
    }
  };
  
  const isLoggedIn = (req, res, next) => {
    if (req.session.isLogged) {
      next();
    } else {
      res.redirect("/login");
    }
  };
  
  const isLoggedOut = (req, res, next) => {
    if (req.session.isLogged) {
      res.redirect("/home");
    } else {
      next();
    }
  };
  
  module.exports = { isAuth, isAuthAdmin, isLoggedIn, isLoggedOut };
  