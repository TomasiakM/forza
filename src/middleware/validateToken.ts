import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
	const authHeader: string = req.headers["authorization"] as string;

	if (!authHeader)
		return res
			.status(401)
			.send({ error: true, message: "Token is required" });

	const token = authHeader.split(" ")[1];
	if (!token)
		return res
			.status(401)
			.send({ error: true, message: "Token is required" });

	jwt.verify(
		token,
		process.env.TOKEN_SECRET || "secret",
		(err, data: any) => {
			if (err)
				return res
					.status(403)
					.send({ auth: false, message: "Invalid token" });
			req.user = data;
			next();
		}
	);
};
