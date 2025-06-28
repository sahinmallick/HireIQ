import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token not provided" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      // req.body.userId = tokenDecode.id;
      req.userId = tokenDecode.id;
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized. Try Again!" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default userAuth;
