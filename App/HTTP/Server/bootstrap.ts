import express from "express";
import cors from "cors";

import helmet from "helmet";

const app = express();

app.use(cors());
// app.use(overloadMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use("*", function (req, res, next) {
  next();
});

export default app;
