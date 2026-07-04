import jwt from "jsonwebtoken";

export const generateToken = async (user, res) => {
  try {
    const payload = { id: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("CravingToken", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return token;
  } catch (error) {
    throw error;
  }
};
