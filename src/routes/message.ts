import { Router, Request, Response } from "express";
import Message from "../models/Message";

import messageValidation from "../validation/message";
import validateToken from "../middleware/validateToken";

const router = Router();

router.get("/", validateToken, async (req: Request, res: Response) => {
	const messages = await Message.find({}).sort({ createdAt: -1 });
	res.send({ success: true, data: messages });
});

router.post("/", async (req: Request, res: Response) => {
	const { error, value } = messageValidation(req.body);
	if (error) return res.send({ validationError: error });

	try {
		const message = new Message(value);
		await message.save();
		res.send({ success: true });
	} catch (err) {
		res.send({ error });
	}
});

router.delete("/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await Message.findByIdAndDelete(id);

		res.send({ success: true });
	} catch (err) {
		res.send({ error: err });
	}
});

export default router;
