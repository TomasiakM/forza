<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark">
        <div class="container">
            <router-link to="/" class="navbar-brand">
                <img src="@/assets/logo.png" alt="ACC logo" />
            </router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbar"
                aria-controls="navbar"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar">
                <div class="w-100 d-flex justify-content-lg-end">
                    <div
                        class="
                            d-flex
                            align-items-center
                            justify-content-center
                            mt-2 mt-lg-0
                            custom-width
                        "
                    >
                        <router-link
                            to="/adminPanel/addCar"
                            class="btn btn-primary btn-sm"
                        >
                            Admin panel
                        </router-link>
                        <button
                            v-if="isAuthenticated"
                            class="btn btn-danger btn-sm ms-auto ms-lg-2"
                            @click="logout()"
                        >
                            <i class="bi bi-box-arrow-right"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
    name: "NavBar",
    methods: {
        ...mapActions("adminPanel", ["logout"]),
    },
    computed: {
        ...mapGetters("adminPanel", ["isAuthenticated"]),
    },
});
</script>


<style lang="scss" scoped>
.navbar {
    background: $dark;
}

.navbar-brand img {
    height: 31px;
}

.nav-link {
    background: $primary;
}

.custom-width {
    width: 100%;

    @media (min-width: 992px) {
        width: auto;
    }
}
</style>