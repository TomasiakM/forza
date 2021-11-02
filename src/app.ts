import { Request, Response } from "express";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import routes from "./routes/index";

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect(process.env.DB_CONNECTON!, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log("DB conected!");
});

app.use("/api", routes);
app.use("/api/*", (req: Request, res: Response) => {
	res.status(404).send({ error: true, message: "Api route not found" });
});

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.resolve("public", "index.html"));
});

app.listen(process.env.PORT, () => {
	console.log(`Server up and running on port ${process.env.PORT}`);
});
