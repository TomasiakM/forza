<template>
    <form @submit.prevent="submit">
        <h4 class="mb-3">Contact form</h4>
        <div v-if="success" class="alert alert-success py-2 mb-0">
            Message sent successfully
        </div>
        <input
            name="title"
            type="text"
            class="form-control form-control-sm mt-2"
            placeholder="Title"
            v-model="title.value"
            @input="onChange('title')"
        />
        <div v-if="title.error" class="text-danger">{{ title.error }}</div>
        <input
            name="name"
            type="text"
            class="form-control form-control-sm mt-2"
            placeholder="Name"
            v-model="name.value"
            @input="onChange('name')"
        />
        <div v-if="name.error" class="text-danger">{{ name.error }}</div>
        <input
            name="email"
            type="text"
            class="form-control form-control-sm mt-2"
            placeholder="E-mail"
            v-model="email.value"
            @input="onChange('email')"
        />
        <div v-if="email.error" class="text-danger">{{ email.error }}</div>
        <textarea
            class="form-control form-control-sm mt-2"
            placeholder="Message"
            style="min-height: 140px"
            v-model="message.value"
            @input="onChange('message')"
        ></textarea>
        <div v-if="message.error" class="text-danger">{{ message.error }}</div>
        <div class="mt-2">
            <div v-if="error" class="text-danger">{{ error }}</div>
            <div class="d-flex">
                <button
                    type="submit"
                    class="btn btn-primary btn-sm px-4 ms-auto"
                    :disabled="isLoading"
                >
                    <span
                        v-if="isLoading"
                        class="spinner-border spinner-border-sm"
                    ></span>

                    <i v-else class="bi bi-cursor-fill"></i>
                    Send
                </button>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ContactForm",
    data() {
        return {
            title: {
                value: "",
                error: "",
                min: 3,
                max: 35,
            },
            name: {
                value: "",
                error: "",
                min: 3,
                max: 25,
            },
            email: {
                value: "",
                error: "",
            },
            message: {
                value: "",
                error: "",
                min: 8,
                max: 2000,
            },
            success: false,
            isLoading: false,
            error: null as null | string,
        };
    },
    watch: {
        success(to: boolean) {
            if (to) setTimeout(() => (this.success = false), 5000);
        },
    },
    methods: {
        submit() {
            const errors = this.validateForm();
            if (errors) return;
            this.isLoading = true;
            this.error = null;
            this.success = false;

            fetch("/api/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: this.title.value,
                    name: this.name.value,
                    email: this.email.value,
                    message: this.message.value,
                }),
            })
                .then((e) => e.json())
                .then((e) => {
                    if (e.validationError) {
                        const { email, message, name, title } =
                            e.validationError;

                        if (title) this.title.error = title;
                        if (name) this.name.error = name;
                        if (email) this.email.error = email;
                        if (message) this.message.error = message;
                        return;
                    }
                    if (e.success) {
                        this.success = true;
                        this.title.value = "";
                        this.name.value = "";
                        this.email.value = "";
                        this.message.value = "";
                    }
                    if (e.error) {
                        this.error = "Something went wrong";
                    }
                })
                .catch((err) => {
                    this.error = "Something went wrong";
                })
                .finally(() => {
                    this.isLoading = false;
                });

            return;
        },
        onChange(name: "title" | "name" | "email" | "message") {
            console.log("Change: " + name);
            this[name].error = "";
        },
        validateMail() {
            if (!this.email.value.length) {
                this.email.error = "This field is required";
                return false;
            }
            const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (reg.test(this.email.value)) {
                this.email.error = "";
                return true;
            }
            this.email.error = "Email is not valid";
            return false;
        },
        validateForm() {
            let errorCount = 0;
            const { title, name, message } = this;
            const mail = this.validateMail();
            !mail && errorCount++;

            [title, name, message].forEach((e) => {
                if (!e.value.length) {
                    e.error = "This field is required";
                    errorCount++;
                } else if (e.value.length > e.max) {
                    e.error = `Maximum ${e.max} characters`;
                    errorCount++;
                } else if (e.value.length < e.min) {
                    e.error = `Minimum ${e.min} characters`;
                    errorCount++;
                }
            });
            return errorCount;
        },
    },
});
</script>

<style lang="scss" scoped>
.text-danger {
    font-size: 14px;
}
</style>