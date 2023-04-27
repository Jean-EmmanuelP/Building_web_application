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

  // understand the middleware then check each routes !
  // must be over for 14:00

  /*
  This JWT-based authentication middleware can be subject to various attacks and security vulnerabilities, such as:

Cross-Site Scripting (XSS) attacks: If the JWT token is stored in a JavaScript-accessible area (e.g., localStorage or sessionStorage), it is vulnerable to XSS attacks. To prevent this, you can store the JWT in an HttpOnly cookie that is not accessible via JavaScript.

Cross-Site Request Forgery (CSRF) attacks: If you store the JWT in cookies, it is vulnerable to CSRF attacks. To mitigate this risk, you can use techniques such as double cookie submission or the use of anti-CSRF tokens.

Token theft: If an attacker manages to steal a JWT token, they can use it to access protected resources. To minimize this risk, you can implement security measures such as using HTTPS to encrypt communications between the client and server, as well as expiring JWT tokens after a certain time period.

Brute Force or guessing attacks on the secret key: If an attacker manages to guess or crack the secret key used to sign JWT tokens, they can create valid tokens and access protected resources. To prevent this, use a strong and complex secret key and consider implementing key rotation mechanisms.
  */