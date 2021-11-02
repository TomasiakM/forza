import mongoose, { Schema } from "mongoose";

const carSchema = new Schema(
	{
		speed: { type: Number, required: true },
		handling: { type: Number, required: true },
		acceleration: { type: Number, required: true },
		launch: { type: Number, required: true },
		breaking: { type: Number, required: true },
		carClass: { type: Number, required: true },
		engine: { type: String, required: true },
		power: { type: String, required: true },
		enginePosition: { type: String, required: true },
		drive: { type: String, required: true },
		transmission: { type: String, required: true },
		weight: { type: String, required: true },
		price: { type: Number, required: true },
		images: [{ url: String, id: Number }],
		thumbnail: { type: String, required: true },
		driveImage: { type: String, required: true },
		make: { type: String, required: true },
		model: { type: String, required: true },
		description: { type: String, required: true },
		productionYear: { type: Number, required: true },
		isSold: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export default mongoose.model("Car", carSchema);
