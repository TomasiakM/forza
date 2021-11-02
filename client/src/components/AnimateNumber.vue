<template>
    <span>{{ format }}</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import gsap from "gsap";

export default defineComponent({
    name: "AnimateNumber",
    props: {
        startNumber: {
            type: Number as PropType<number>,
            default: 0,
        },
        endNumber: Number as PropType<number>,
        duration: Number as PropType<number>,
        delay: {
            type: Number as PropType<number>,
            default: 0,
        },
        formater: {
            type: Function,
            default: null,
        },
    },
    data() {
        return {
            value: 0,
        };
    },
    mounted() {
        gsap.to(this, {
            value: this.endNumber,
            duration: this.duration,
            delay: this.delay,
            ease: "circ.out",
        });
    },
    computed: {
        format() {
            const { value } = this;

            if (this.formater) {
                return this.formater(value);
            }

            return value.toFixed(0);
        },
    },
});
</script>
