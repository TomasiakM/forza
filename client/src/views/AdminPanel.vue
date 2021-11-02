<template>
    <div class="container d-flex mb-3">
        <div
            v-if="!isAuthenticated || isLoading"
            class="d-flex justify-content-center align-items-center"
            style="flex: 1; margin-top: -10px"
        >
            <form
                class="card card-body gap-2 w-100 mt-4"
                @submit.prevent="submit"
                style="max-width: 400px"
            >
                <h4 class="mb-4">Admin panel</h4>
                <div v-if="error" class="alert alert-danger py-1 mb-0">
                    {{ error }}
                </div>
                <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Username"
                    v-model="username"
                />
                <input
                    type="password"
                    class="form-control form-control-sm"
                    placeholder="Password"
                    v-model="password"
                />
                <button
                    class="btn btn-primary btn-sm ms-auto px-3 mt-4"
                    :disabled="isLoading"
                >
                    <span
                        v-if="isLoading"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    <i v-if="!isLoading" class="bi bi-box-arrow-in-right"></i>
                    Login
                </button>
            </form>
        </div>
        <div v-else style="flex: 1">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <router-link
                        to="/adminPanel/addCar"
                        :class="[
                            'nav-link px-2 px-md-3',
                            $route.name === 'AddCar' && 'active',
                        ]"
                        aria-current="page"
                    >
                        Add car
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        to="/adminPanel/editCar"
                        :class="[
                            'nav-link px-2 px-md-3',
                            $route.name === 'EditCar' && 'active',
                        ]"
                        aria-current="page"
                    >
                        Edit car
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        to="/adminPanel/messages"
                        :class="[
                            'nav-link px-2 px-md-3',
                            $route.name === 'Messages' && 'active',
                        ]"
                        aria-current="page"
                    >
                        Messages
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        to="/adminPanel/account"
                        :class="[
                            'nav-link px-2 px-md-3',
                            $route.name === 'Account' && 'active',
                        ]"
                        aria-current="page"
                    >
                        Account
                    </router-link>
                </li>
            </ul>
            <router-view class="card card-body border-top-0 custom-border" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
    name: "AdminPanel",
    data() {
        return {
            username: "admin",
            password: "Admin123",
        };
    },
    watch: {
        isAuthenticated() {
            this.username = "";
            this.password = "";
        },
    },
    methods: {
        ...mapActions("adminPanel", ["login"]),
        submit() {
            const { username, password } = this;

            this.login({ username, password });
        },
    },
    computed: {
        ...mapGetters("adminPanel", ["isAuthenticated", "isLoading", "error"]),
    },
});
</script>


<style lang="scss" scoped>
.custom-border {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>