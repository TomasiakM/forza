<template>
    <div>
        <div class="d-flex">
            <button
                class="btn btn-primary btn-sm ms-auto px-2"
                @click="fetchData"
                :disabled="isLoading"
            >
                Refresh
            </button>
        </div>
        <div v-if="isLoading" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else class="mt-2">
            <div v-if="!messages.length" class="alert alert-dark text-center">
                Currently you don't have any messages
            </div>
            <div v-else>
                <div class="accordion accordion-flush border">
                    <div
                        v-for="message in messages"
                        :key="message._id"
                        class="accordion-item"
                    >
                        <h2 class="accordion-header">
                            <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                :data-bs-target="'#accordion' + message._id"
                            >
                                <div
                                    class="
                                        d-flex
                                        justify-content-between
                                        align-items-center
                                        w-100
                                    "
                                >
                                    <div class="text-break">
                                        {{ message.title }}
                                    </div>
                                    <div class="mx-2 d-none d-sm-block">
                                        {{ getDate(message.createdAt) }}
                                    </div>
                                </div>
                            </button>
                        </h2>
                        <div
                            :id="'accordion' + message._id"
                            class="accordion-collapse collapse"
                        >
                            <div class="accordion-body">
                                <div class="d-block d-sm-none">
                                    {{ getDate(message.createdAt) }}
                                </div>
                                <h5
                                    class="d-flex text-break"
                                    style="max-width: 100%"
                                >
                                    Name: {{ message.name }}
                                </h5>
                                <h5
                                    class="d-flex text-break"
                                    style="max-width: 100%"
                                >
                                    E-mail: {{ message.email }}
                                </h5>
                                <div
                                    class="d-flex text-break"
                                    style="max-width: 100%"
                                >
                                    {{ message.message }}
                                </div>
                                <div class="d-flex">
                                    <button
                                        @click="deleteMessage(message._id)"
                                        class="
                                            btn btn-danger btn-sm
                                            ms-auto
                                            mt-2
                                            px-2
                                        "
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
    name: "Messages",
    data() {
        return {
            isLoading: true,
            error: null as null | string,
            messages: [],
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        ...mapActions("adminPanel", ["logout"]),
        getDate(date: number) {
            const d = new Date(date);
            const year = d.getFullYear();
            let day: number | string = d.getDate();
            if (day < 10) day = "0" + day;
            let month: number | string = d.getMonth() + 1;
            if (month < 10) month = "0" + month;

            return `${day}.${month}.${year}`;
        },
        fetchData() {
            this.isLoading = true;
            this.error = null;

            fetch("/api/message", {
                method: "GET",
                headers: {
                    authorization: `Bearer ${this.token}`,
                },
            })
                .then((e) => e.json())
                .then((e) => {
                    if (e.auth === false) {
                        this.logout();
                    }
                    if (e.success) {
                        this.messages = e.data;
                    }
                })
                .catch((err) => {
                    this.error = "Something went wrong";
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        deleteMessage(id: string) {
            fetch(`/api/message/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearel ${this.token}`,
                },
            })
                .then((e) => e.json())
                .then((e) => {
                    if (e.auth === false) {
                        this.logout();
                        return;
                    }
                    if (e.success) {
                        const filter = this.messages.filter(
                            (e: any) => e._id !== id
                        );

                        this.messages = filter;
                    }
                });
        },
    },
    computed: {
        ...mapGetters("adminPanel", ["token"]),
    },
});
</script>
