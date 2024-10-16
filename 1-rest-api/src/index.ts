import { randomUUID } from "crypto";
import express from "express";
import { store } from "./store";

const app = express();
const port = 3000; // TODO: make it env variable

app.use(express.json());

const router = express.Router();

router.use((req, res, next) => {
  const accessToken = req.headers["authorization"]?.replace("Bearer ", "");
  if (!accessToken || !store.has(accessToken)) {
    res.status(401).end();
  } else {
    res.locals = accessToken as any;
    next();
  }
});

app.post("/users", (req, res) => {
  const sessionId = randomUUID();
  store.set(sessionId, req.body);
  res.status(200).json({ accessToken: sessionId }).end();
});

router.get("/users/current", (req, res) => {
  const user = store.get(res.locals as any);
  res.status(200).json(user).end();
});

router.patch("/users/current", (req, res) => {
  const user = store.get(res.locals as any);
  const { password, ...rest } = req.body;
  const updatedUser = { ...user, ...rest };
  store.set(res.locals as any, updatedUser);
  res.status(200).end();
});

router.patch("/users/current/password", (req, res) => {
  const user = store.get(res.locals as any);
  const { password, newPassword } = req.body;
  if (password !== user?.password) {
    res.status(400).end();
  } else {
    const updatedUser = { ...user, password: newPassword };
    store.set(res.locals as any, updatedUser as any);
    res.status(200).end();
  }
});

router.delete("/users/current", (req, res) => {
  store.delete(res.locals as any);
  res.status(200).end();
});

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
