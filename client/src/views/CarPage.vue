<template>
    <div>
        <div class="container" v-if="!isStoreLoading && carData">
            <div class="custom-grid">
                <div>
                    <Carousel :images="carData.images" />
                    <div class="mt-3">
                        <h3 class="car-name">
                            {{ carData.make }} {{ carData.model }}
                            <div class="text-muted fs-6">
                                ({{ carData.productionYear }})
                            </div>
                        </h3>
                        <p>{{ carData.description }}</p>
                    </div>
                </div>
                <CarStatistics
                    class="car-statistics"
                    :data="{
                        speed: carData.speed,
                        handling: carData.handling,
                        acceleration: carData.acceleration,
                        launch: carData.launch,
                        breaking: carData.breaking,
                        carClass: carData.carClass,
                        price: carData.price,
                        driveImage: carData.driveImage,
                        isSold: carData.isSold,
                    }"
                />
                <table class="table table-striped mb-4">
                    <thead>
                        <tr>
                            <th colspan="2" scope="col">Specifications</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Engine</td>
                            <td>{{ carData.engine }}</td>
                        </tr>
                        <tr>
                            <td>Engine position</td>
                            <td>{{ carData.enginePosition }}</td>
                        </tr>
                        <tr>
                            <td>Power</td>
                            <td>{{ carData.power }}</td>
                        </tr>
                        <tr>
                            <td>Drive</td>
                            <td>{{ carData.drive }}</td>
                        </tr>
                        <tr>
                            <td>Transmission</td>
                            <td>{{ carData.transmission }}</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{{ carData.weight }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Carousel from "@/components/Carousel.vue";
import AnimateNumber from "@/components/AnimateNumber.vue";
import CarStatistics from "@/components/CarStatistics.vue";
import { Car } from "../types/Car";
import { mapGetters } from "vuex";

export default defineComponent({
    name: "CarPage",
    data() {
        return {
            carData: null as Car | null,
        };
    },
    components: {
        Carousel,
        AnimateNumber,
        CarStatistics,
    },
    watch: {
        isStoreLoading() {
            this.getCarData();
        },
    },
    mounted() {
        this.getCarData();
    },
    methods: {
        getCarData() {
            const { id } = this.$route.params;
            const car: Car = this.allCars.find((e: Car) => e._id === id);

            if (!car && !this.isStoreLoading) this.$router.replace("/404");
            this.carData = car;
        },
    },
    computed: {
        ...mapGetters(["allCars", "isStoreLoading"]),
    },
});
</script>


<style lang="scss" scoped>
.car-name {
    color: $primary;
}

.custom-grid {
    display: grid;
    gap: 10px 20px;

    @media screen and (min-width: 992px) {
        grid-template-columns: 2fr 1fr;
        grid-template-rows: auto auto;

        .car-statistics {
            grid-area: 1 / 4 / 3 / 2;
        }
    }
}
</style>