<template>
    <div>
        <CarForm
            @submitAction="submit"
            @resetForm="reset"
            submitBtn="Add"
            :validationError="validationError"
            :success="success"
            successMessage="Succesfully added car"
            :error="error"
            :isLoading="isLoading"
        />
    </div>
</template>

<script lang="ts">
import { Car } from "@/types/Car";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

import CarForm from "@/components/CarForm.vue";

export default defineComponent({
    name: "AdminPanel",
    data() {
        return {
            validationError: {} as object,
            error: false,
            success: false,
            isLoading: false,
        };
    },
    components: {
        CarForm,
    },
    watch: {
        success(to: Boolean) {
            if (to) setTimeout(() => (this.success = false), 5000);
        },
    },
    methods: {
        ...mapActions(["addCarToList"]),
        ...mapActions("adminPanel", ["logout"]),
        submit(data: Car) {
            this.error = false;
            this.validationError = {};
            this.success = false;
            this.isLoading = true;
            fetch("/api/car", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${this.token}`,
                },
                body: JSON.stringify(data),
            })
                .then((e) => e.json())
                .then((e) => {
                    if (e.auth === false) {
                        this.logout();
                        return;
                    }
                    if (e.success) {
                        this.addCarToList(e.data);
                        this.success = true;
                    }
                    if (e.validationError)
                        this.validationError = {
                            ...e.validationError,
                        };
                })
                .catch((err) => {
                    this.error = true;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        reset() {
            this.error = false;
            this.validationError = {};
        },
    },
    computed: {
        ...mapGetters("adminPanel", ["token"]),
    },
});
</script>