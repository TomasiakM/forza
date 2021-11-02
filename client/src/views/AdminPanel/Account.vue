<template>
    <div>
        <div class="d-flex justify-content-center">
            <form
                @submit.prevent="submit"
                class="card card-body gap-2"
                style="max-width: 450px"
            >
                <h5>Change password</h5>
                <div v-if="error" class="alert alert-danger py-1 mb-0">
                    {{ error }}
                </div>
                <div v-else-if="success" class="alert alert-success">
                    Password sucesfully changed
                </div>
                <input
                    type="password"
                    class="form-control form-control-sm"
                    placeholder="Current password"
                    v-model="currentPassword"
                />
                <input
                    type="password"
                    class="form-control form-control-sm"
                    placeholder="Password"
                    v-model="password"
                />
                <input
                    type="password"
                    class="form-control form-control-sm"
                    placeholder="Confirm password"
                    v-model="confirmPassword"
                />
                <div class="ms-auto mt-4">
                    <button
                        class="btn btn-primary btn-sm"
                        type="submit"
                        :disabled="isLoading"
                    >
                        <span
                            v-if="isLoading"
                            class="spinner-border spinner-border-sm"
                        ></span>
                        Change password
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
    name: "Users",
    data() {
        return {
            currentPassword: "",
            password: "",
            confirmPassword: "",
            isLoading: false,
            error: null as null | string,
            success: false,
        };
    },
    watch: {
        success(to) {
            if (to) {
                setTimeout(() => (this.success = false), 5000);
            }
        },
    },
    methods: {
        ...mapActions("adminPanel", ["logout"]),
        submit() {
            const { currentPassword, password, confirmPassword } = this;
            this.error = null;
            this.isLoading = true;

            fetch("/api/auth/changePassword", {
                method: "POST",
                body: JSON.stringify({
                    currentPassword,
                    password,
                    confirmPassword,
                }),
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${this.token}`,
                },
            })
                .then((e) => e.json())
                .then((e) => {
                    if (e.auth === false) {
                        this.logout();
                        return;
                    }
                    if (e.error) {
                        this.error = e.message;
                    }
                    if (e.success) {
                        this.currentPassword = "";
                        this.password = "";
                        this.confirmPassword = "";
                        this.success = true;
                    }
                })
                .catch((err) => {
                    this.error = "Something went wrong...";
                })
                .finally(() => (this.isLoading = false));
        },
    },
    computed: {
        ...mapGetters("adminPanel", ["token"]),
    },
});
</script>
