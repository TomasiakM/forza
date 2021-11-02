import { Router, Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validateToken from "../middleware/validateToken";
import { User as UserType } from "../types/User";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		if (!user)
			return res.send({ message: "Invalid login data", error: true });

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword)
			return res.send({ message: "Invalid login data", error: true });

		const token = generateToken(user);

		res.send({ success: true, token });
	} catch (err) {
		res.send({ message: "Something went wrong...", error: err });
	}
});

router.post("/verify", validateToken, (req: Request, res: Response) => {
	res.send({ success: true });
});

router.post(
	"/changePassword",
	validateToken,
	async (req: Request, res: Response) => {
		const { currentPassword, password, confirmPassword } = req.body;

		try {
			const user = await User.findById(req.user!.id);

			const validPassword = await bcrypt.compare(
				currentPassword,
				user.password
			);

			if (!validPassword)
				return res.send({
					message: "Password is inncorect",
					error: true,
				});

			if (currentPassword === password)
				return res.send({
					message:
						"Password cannot be the same as your current password",
					error: true,
				});

			if (password.length < 7)
				return res.send({
					message: "Password must be at least 7 characters long",
					error: true,
				});

			if (password !== confirmPassword)
				return res.send({
					message: "Passwords do not math",
					error: true,
				});
			const pass = await bcrypt.hash(password, 10);

			user.password = pass;
			await user.save();

			res.send({ seccess: true });
		} catch (err) {
			res.send({ message: "Something went wrong...", error: err });
		}
	}
);

export default router;

const generateToken = (user: UserType) => {
	return jwt.sign({ id: user._id }, process.env.TOKEN_SECRET || "secret", {
		expiresIn: "2h",
	});
};
