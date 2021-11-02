import { Router, Request, Response } from "express";
import Car from "../models/Car";

import CarValidation from "../validation/car";
import validateToken from "../middleware/validateToken";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
	try {
		const carList = await Car.find({});
		res.send({ success: true, data: carList });
	} catch (err) {
		res.send({ message: "Something went wrong...", error: err });
	}
});

router.put("/:id/sell", validateToken, async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const car = await Car.findById(id);
		if (!car) return res.send({ message: "Car not found", error: true });

		car.isSold = !car.isSold;
		await car.save();

		res.send({ success: true, data: car });
	} catch (err) {
		res.send({ message: "Something went wrong...", error: err });
	}
});

router.post("/", validateToken, async (req: Request, res: Response) => {
	try {
		const { error, value } = CarValidation(req.body);

		if (error) return res.send({ validationError: error });
		const car = new Car(value);
		await car.save();

		res.send({ success: true, data: car });
	} catch (err) {
		res.send({ message: "Something went wrong...", error: err });
	}
});

router.delete("/:id", validateToken, async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await Car.findByIdAndDelete({ _id: id });
		res.send({ success: true });
	} catch (err) {
		res.send({ message: "Something went wrong...", error: err });
	}
});

router.put("/:id", validateToken, async (req: Request, res: Response) => {
	const { id } = req.params;

	const { error, value } = CarValidation(req.body);
	if (error) return res.send({ validationError: error });

	try {
		const car = await Car.findByIdAndUpdate(id, value, {
			lean: true,
			new: true,
		});
		res.send({ success: true, data: car });
	} catch (err) {
		res.send({ message: "Something went wrong...", error: err });
	}
});

export default router;
