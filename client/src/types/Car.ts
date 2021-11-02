export interface Car {
	acceleration: number;
	breaking: number;
	carClass: number;
	createdAt: string;
	description: string;
	drive: string;
	engine: string;
	enginePosition: string;
	handling: number;
	images: { url: string; id: number }[];
	launch: number;
	make: string;
	model: string;
	power: string;
	price: number;
	slug: string;
	speed: number;
	thumbnail: string;
	transmission: string;
	updatedAt: string;
	weight: string;
	_id: string;
	isSold: boolean;
}
