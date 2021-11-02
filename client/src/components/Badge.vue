<template>
    <div
        class="d-flex flex-column text-center border rounded"
        :style="{ width: '60px' }"
    >
        <h6 class="text-light p-1 m-0" :style="{ background: badge.color }">
            {{ badge.name }}
        </h6>
        <h6 class="text-dark p-1 m-0">
            <AnimateNumber
                :startNumber="0"
                :endNumber="badge.class"
                :duration="0.5"
                :delay="delay"
                :formater="(e) => e.toFixed(0)"
            />
        </h6>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import AnimateNumber from "./AnimateNumber.vue";

export default defineComponent({
    name: "Badge",
    props: {
        carClass: {
            type: Number as PropType<number>,
            required: true,
        },
        delay: {
            type: Number as PropType<number>,
            required: true,
        },
    },
    components: {
        AnimateNumber,
    },
    computed: {
        badge(): object {
            const { carClass } = this;
            if (carClass >= 999)
                return {
                    color: "#69b648",
                    class: 999,
                    name: "X",
                };

            if (carClass >= 901)
                return {
                    color: "#4b58e5",
                    class: carClass,
                    name: "S2",
                };

            if (carClass >= 801)
                return {
                    color: "#8036f3",
                    class: carClass,
                    name: "S1",
                };

            if (carClass >= 701)
                return {
                    color: "#bb3b22",
                    class: carClass,
                    name: "A",
                };

            if (carClass >= 601)
                return {
                    color: "#d35a25",
                    class: carClass,
                    name: "B",
                };

            if (carClass >= 501)
                return {
                    color: "#eaca31",
                    class: carClass,
                    name: "C",
                };

            return {
                color: "#6bb9ec",
                class: carClass,
                name: "D",
            };
        },
    },
});
</script>
