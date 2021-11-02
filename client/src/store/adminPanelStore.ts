import { Module } from "vuex";
import { RootState } from "./";

interface AdminPanel {
	isLoading: boolean;
	error: null | string;
	token: null | string;
}

const state: AdminPanel = {
	isLoading: !!localStorage["token"],
	error: null,
	token: localStorage["token"] || "",
};

const module: Module<AdminPanel, RootState> = {
	state,
	mutations: {
		RESET(state) {
			state.error = null;
		},
		SET_LOADING(state, isLoading) {
			state.isLoading = isLoading;
		},
		SET_TOKEN(state, { token }) {
			window.localStorage["token"] = token;
			state.token = token;
		},
		SET_ERROR(state, error = "Something went wrong...") {
			window.localStorage["token"] = "";
			state.token = null;
			state.error = error;
		},
		LOGOUT(state) {
			window.localStorage["token"] = "";
			state.token = null;
		},
	},
	actions: {
		login({ commit }, { username, password }) {
			commit("RESET");
			commit("SET_LOADING", true);
			fetch("/api/auth/login", {
				method: "POST",
				body: JSON.stringify({ username, password }),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((e) => e.json())
				.then((e) => {
					if (e.success) {
						return commit("SET_TOKEN", { token: e.token });
					}
					if (e.error) {
						commit("SET_ERROR", e.message);
					}
				})
				.catch((err) => {
					commit("SET_ERROR");
				})
				.finally(() => {
					commit("SET_LOADING", false);
				});
		},
		verifyToken({ commit, getters }) {
			fetch("/api/auth/verify", {
				method: "POST",
				headers: {
					authorization: `Bearer ${getters.token}`,
				},
			})
				.then((e) => e.json())
				.then((e) => {
					if (e.error || e.auth === false) {
						commit("LOGOUT");
					}
				})
				.catch((err) => {
					commit("LOGOUT");
				})
				.finally(() => {
					commit("SET_LOADING", false);
				});
		},
		logout({ commit }) {
			commit("LOGOUT");
		},
	},
	getters: {
		isAuthenticated: ({ token }) => !!token,
		token: ({ token }) => token,
		isLoading: ({ isLoading }) => isLoading,
		error: ({ error }) => error,
	},
	namespaced: true,
};

export default module;
