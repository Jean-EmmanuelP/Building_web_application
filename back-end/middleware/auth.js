const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const isToken = jwt.verify(token, process.env.TOKEN_KEY);
      if (!isToken) {
        res.status(400).json(`Invalid token or no token at all`);
        return;
      }
      next();
    } catch (error) {
      console.error(error);
      res.clearCookie("token");
      return res.status(400).json(`Log in to go on`);
    }
  };