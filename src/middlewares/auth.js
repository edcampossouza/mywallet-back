import db from "../config/database.js";

export async function protectRoute(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  let session, userExists;
  if (token) session = await db.collection("sessions").findOne({ token });
  if (session)
    userExists = await db.collection("users").findOne({ _id: session.userId });

  if (!token || !session || !userExists) {
    return res.status(401).send("Token inválido");
  }

  req.user = userExists;

  next();
}
