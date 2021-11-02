<template>
    <div
        :style="{
            backgroundImage: `url(${require('@/assets/steering_wheel.jpg')})`,
        }"
        class="banner d-flex align-items-center"
    >
        <div class="container h-100 py-2 px-md-4">
            <div class="p-3 text-light">
                <h3>American Classic Cars</h3>
                <p style="max-width: 500px">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dignissimos accusamus repellat officia ducimus quo dicta,
                    temporibus autem sit cumque, corrupti, obcaecati ratione
                    odit odio veniam soluta! Ut quibusdam repellat ipsam.
                </p>
            </div>
        </div>
    </div>
    <div class="container my-5">
        <h3 class="">Currently for sale</h3>
        <div class="row px-2">
            <div
                class="col-12 col-sm-6 col-md-4 col-lg-3 p-1"
                v-for="(car, i) in carList"
                :key="car._id"
            >
                <Car :data="car" :i="i" />
            </div>
        </div>
    </div>
    <div class="dark-bg text-light">
        <div class="container">
            <div class="row py-5">
                <div class="col-12 col-md-6">
                    <ContactForm />
                </div>
                <div
                    class="
                        col-12 col-md-6
                        d-flex
                        justify-content-center
                        align-items-center
                    "
                >
                    <div
                        class="
                            d-flex
                            flex-column
                            align-items-center align-items-md-start
                            mt-4 mt-md-0
                        "
                    >
                        <div class="contact-item">
                            <i class="bi bi-facebook"></i>
                            <a href="#">fb/AmericanClassicCars</a>
                        </div>
                        <div class="contact-item">
                            <i class="bi bi-instagram"></i>
                            <a href="#">@AmericanClassicCars</a>
                        </div>
                        <div class="contact-item">
                            <i class="bi bi-envelope-fill"></i>
                            <a href="#">example@email.com</a>
                        </div>
                        <div class="contact-item">
                            <i class="bi bi-geo-alt-fill"></i>
                            <span>Rzeszów, ul. Lubelska 123</span>
                        </div>
                        <div class="contact-item">
                            <i class="bi bi-telephone-fill"></i>
                            <span>123 456 789</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import Car from "@/components/Car.vue";
import ContactForm from "@/components/ContactForm.vue";

export default defineComponent({
    name: "Home",
    components: {
        Car,
        ContactForm,
    },
    computed: {
        ...mapGetters(["carList"]),
    },
});
</script>

<style lang="scss" scoped>
.banner {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 400px;
    margin-top: -1rem;
    text-shadow: 0px 0px 4px #000;
}

.contact-item {
    display: flex;
    align-items: center;

    a {
        color: #fff;
        text-decoration: none;
        transition: all 0.15s ease-in-out;

        &:hover {
            color: $dark;
        }
    }
    i {
        font-size: 28px;
        margin-right: 12px;
    }
}
</style>
