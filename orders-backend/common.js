'use strict';
// dependencies setup

// express validator error formatter
module.exports.errorFormatter = (arg) => {
  return `${arg.msg}`;
}

// formatter
module.exports.resultFormatter = (res) => {
  let r =  Object.assign({}, res);
  r= r._doc;
  r.code = `0000`;
  r.message = ``;
  return r;
}

// validate route permission
module.exports.validate = (...allowed) => {
  const isAllowed = role => allowed.includes(role);

  // return a middleware
  return (req, res, next) => {
    if (req.user && isAllowed(req.user.role))
      next(); // role is allowed, so continue on the next middleware
    else {
      res.status(403).send("Forbidden");
    }
  }
}