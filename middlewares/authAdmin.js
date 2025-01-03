import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { aToken } = req.headers;
    if (!aToken)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Authentication" });
    const token_decode = jwt.verify(aToken, process.env.JWT_SECRET);
    if (
      !token_decode !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Authentication" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.json({ message: "Something went wrong", message: error.message });
  }
};

export default authAdmin;
