import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import cookieParser from "cookie-parser";
import csrf from "csurf";
const csrfProtection = csrf({ cookie: true });

const morgan = require("morgan");
require("dotenv").config();

import { readdirSync } from "fs";

//create express server
const app = express();

//db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("<== DB Connected ==>"))
  .catch((err) => console.log("DB Connection Err => ", err));

//apply middle-wares
app.use(cors());

app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));
app.use(cookieParser());

//route
readdirSync("./routes").map((r) => {
  app.use("/api", require(`./routes/${r}`));
});

app.use(csrfProtection);
app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
//port
const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`server is running on port => ${port}`));
