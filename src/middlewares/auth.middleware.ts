import { serverKey } from "..";

const jwt = require("jsonwebtoken");

//MiddleWare Function that verifies in protected routes if user has token to access the route

const requireAuth = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;
  const actualToken = token.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(actualToken, serverKey, (err: any, decoded: any) => {
    if (err) {
      console.log(serverKey);
      return res.status(401).json({ message: "Token invalid" });
    }

    req.user = decoded; // Attach the user information to the request object
    next();
  });
};

export { requireAuth };
