import { randomUUID } from "crypto";
import express from "express";
import { UserHandlerImpl } from "./handler/impl";
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
    res.locals = { accessToken, user: store.get(accessToken) };
    next();
  }
});

const userHandler = new UserHandlerImpl(store);

app.post("/users", (req, res) => {
  const sessionId = randomUUID();
  store.set(sessionId, req.body);
  res.status(200).json({ accessToken: sessionId }).end();
});

router.get("/users/current", userHandler.getCurrentUserInfo.bind(userHandler));

router.patch(
  "/users/current",
  userHandler.updateCurrentUserInfo.bind(userHandler)
);

router.patch(
  "/users/current/password",
  userHandler.updatePassword.bind(userHandler)
);

router.delete("/users/current", userHandler.deleteUser.bind(userHandler));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
