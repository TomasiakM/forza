<template>
    <Loader v-if="isLoading || isStoreLoading" />

    <div v-else>
        <NavBar />
        <div class="min-vh-100" style="display: flex; flex-direction: column">
            <div style="padding-top: 70px">
                <router-view />
            </div>
            <footer class="py-4 mt-auto text-light text-center">
                American Classic Cars
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "./components/NavBar.vue";
import Loader from "./components/Loader.vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
    name: "App",
    components: {
        NavBar,
        Loader,
    },
    data() {
        return {
            isLoading: true,
        };
    },
    watch: {
        isStoreLoading() {
            if (!this.isLoading && !this.isStoreLoading) {
                document.body.className = "";
            }
        },
        isLoading() {
            if (!this.isLoading && !this.isStoreLoading) {
                document.body.className = "";
            }
        },
    },
    mounted() {
        document.body.className = "overflow";
        if (window.localStorage["token"]) {
            this.verifyToken();
        }
        this.fetchCarList();
        document.onreadystatechange = () => {
            if (document.readyState == "complete") {
                this.isLoading = false;
            }
        };
    },
    methods: {
        ...mapActions(["fetchCarList"]),
        ...mapActions("adminPanel", ["verifyToken"]),
    },
    computed: {
        ...mapGetters(["isStoreLoading"]),
    },
});
</script>


<style lang="scss">
footer {
    background: $dark;
}
.overflow {
    overflow: hidden;
}
</style>
