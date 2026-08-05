import jwt from "jsonwebtoken";

export const generateToken = async (user, res) => {
  try {
    const payload = { id: user._id };

    // Oreo cookie is the access token (short/medium lifespan)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // kitkat cookie is the refresh token (longer lifespan)
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("Oreo", token, {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: false, // development
      sameSite: "lax",
    });

    res.cookie("kitkat", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: false, // development
      sameSite: "lax",
    });

    return token;
  } catch (error) {
    throw error;
  }
};



