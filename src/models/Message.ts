import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
	{
		title: { type: String, required: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		message: { type: String, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model("Message", messageSchema);
