import { createStore } from "vuex";
import adminPanelStore from "./adminPanelStore";
import { Car } from "../types/Car";

export interface RootState {
	carList: Car[];
	isLoading: boolean;
	error: boolean;
}

export const store = createStore<RootState>({
	state: {
		carList: [],
		isLoading: true,
		error: false,
	},
	mutations: {
		ADD_CAR(state, car: Car) {
			state.carList = [...state.carList, car];
		},
		DELETE_CAR(state, id: string) {
			state.carList = state.carList.filter((e) => e._id !== id);
		},
		UPDATE_CAR(state, car: Car) {
			const { _id } = car;
			const index = state.carList.findIndex((e) => e._id === _id);

			if (index >= 0) state.carList[index] = car;
		},
		SET_CARS(state, cars: Car[]) {
			state.carList = cars;
			state.error = false;
			state.isLoading = false;
		},
		SET_ERROR(state) {
			state.error = true;
			state.isLoading = false;
		},
	},
	actions: {
		fetchCarList({ commit }) {
			fetch("/api/car", { method: "GET" })
				.then((e) => e.json())
				.then((e) => {
					if (e.success) {
						return commit("SET_CARS", e.data);
					}
					commit("SET_ERROR");
				})
				.catch((err) => {
					commit("SET_ERROR");
				});
		},
		addCarToList({ commit }, car: Car) {
			commit("ADD_CAR", car);
		},
		deleteCarFromList({ commit }, id) {
			commit("DELETE_CAR", id);
		},
		updateCar({ commit }, car) {
			commit("UPDATE_CAR", car);
		},
	},
	getters: {
		carList: ({ carList }) => carList.filter((e) => !e.isSold),
		allCars: ({ carList }) => carList,
		isStoreLoading: ({ isLoading }) => isLoading,
		storeError: ({ error }) => error,
	},
	modules: {
		adminPanel: adminPanelStore,
	},
});
