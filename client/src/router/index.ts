import {
	createRouter,
	createWebHistory,
	RouteRecordRaw,
	RouterScrollBehavior,
} from "vue-router";
import Home from "@/views/Home.vue";
import CarPage from "@/views/CarPage.vue";
import NotFound from "@/views/NotFound.vue";
import AdminPanel from "@/views/AdminPanel.vue";

import AddCar from "@/views/AdminPanel/AddCar.vue";
import EditCar from "@/views/AdminPanel/EditCar.vue";
import Messages from "@/views/AdminPanel/Messages.vue";
import Account from "@/views/AdminPanel/Account.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/car/:id",
		name: "CarPage",
		component: CarPage,
	},
	{
		path: "/adminPanel",
		name: "AdminPanel",
		component: AdminPanel,
		children: [
			{
				name: "AddCar",
				path: "addCar",
				component: AddCar,
			},
			{
				name: "EditCar",
				path: "editCar",
				component: EditCar,
			},
			{
				name: "Messages",
				path: "messages",
				component: Messages,
			},
			{
				name: "Account",
				path: "account",
				component: Account,
			},
		],
	},
	{
		path: "/404",
		name: "NotFound",
		component: NotFound,
	},
];

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
	if (savedPosition) return savedPosition;
	return { top: 0 };
};

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior,
});

export default router;
