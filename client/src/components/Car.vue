<template>
    <div class="rounded custom-hover h-100">
        <a
            class="
                text-dark text-decoration-none
                p-3
                d-flex
                h-100
                flex-column
                justify-content-end
            "
            @click="clickCar()"
        >
            <img
                class="img-thumbnail mb-2"
                :src="data.thumbnail"
                :alt="data.name"
            />

            <div>
                <h6 class="mb-3">{{ data.make }} {{ data.model }}</h6>
                <div class="d-flex justify-content-between align-items-end">
                    <Badge :carClass="data.carClass" :delay="0.05 * i" />
                    <div class="d-flex flex-column align-items-end">
                        <small
                            v-if="data.isSold"
                            class="bg-danger text-light px-2 rounded"
                        >
                            Sold
                        </small>
                        <h6 class="mb-0">
                            <AnimateNumber
                                :delay="0.05 * i"
                                :duration="0.5"
                                :endNumber="data.price"
                                :startNumber="0"
                                :formater="
                                    (e) =>
                                        e
                                            .toFixed(0)
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ' '
                                            ) + ' CR'
                                "
                            />
                        </h6>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Car } from "../types/Car";

import AnimateNumber from "../components/AnimateNumber.vue";
import Badge from "../components/Badge.vue";

export default defineComponent({
    name: "Car",
    props: {
        data: Object as PropType<Car>,
        i: Number as PropType<number>,
    },
    components: {
        AnimateNumber,
        Badge,
    },
    methods: {
        clickCar() {
            if (this.$route.name === "EditCar") {
                return this.$emit("editCar");
            }
            this.$router.push(`/car/${this.data!._id}`);
        },
    },
});
</script>

<style lang="scss" scoped>
.img-thumbnail {
    border: none;
}

.custom-hover {
    border: 1px solid transparent;
    transition: all 0.2s ease-in-out;

    a {
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }

    &:hover {
        // box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 4px 0px,
        //   rgba(0, 0, 0, 0.08) 0px 0px 2px 1px;

        border: 1px solid rgba(0, 0, 0, 0.08);

        a {
            border-bottom: 1px solid transparent;
        }
    }
}
</style>