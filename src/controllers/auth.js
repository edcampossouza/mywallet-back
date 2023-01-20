import db from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { userInputSchema } from "../models/userSchema.js";
import { errorToMessage } from "./util.js";

export async function signUp(req, res) {
  const userInput = req.body;

  const { error } = userInputSchema.validate(userInput, { abortEarly: false });
  if (error) {
    return res.status(422).send(errorToMessage(error));
  }

  const userExists = await db
    .collection("users")
    .findOne({ email: userInput.email });

  if (userExists) {
    return res.status(409).send("Usuário já existe");
  }

  const passwordHash = bcrypt.hashSync(userInput.password, 10);

  const user = {
    email: userInput.email,
    name: userInput.name,
    passwordHash,
  };

  try {
    await db.collection("users").insertOne(user);
    return res.status(201).send("Usuário criado com sucesso");
  } catch (error) {
    console.log("signUp", error);
    return res.status(500).send("Erro no servidor");
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).send("Informar email e senha");
  try {
    let passwordCorrect = false;
    const userExists = await db.collection("users").findOne({ email });
    if (userExists) {
      passwordCorrect = bcrypt.compareSync(password, userExists.passwordHash);
    }
    if (userExists && passwordCorrect) {
      const token = uuidV4();
      await db
        .collection("sessions")
        .insertOne({ userId: userExists._id, token });
      return res.status(200).send(token);
    } else {
      return res.status(401).send("Usuário ou senha incorretos");
    }
  } catch (error) {
    console.log("signIn", error);
    return res.status(500).send("Erro no servidor");
  }
}

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
