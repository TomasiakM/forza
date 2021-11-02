<template>
    <div class="carousel">
        <Splide ref="main" :options="mainOptions" class="w-100">
            <SplideSlide v-for="(img, i) in images" :key="img.id">
                <img :src="img.url" :alt="`Slide ${i + 1}`" />
            </SplideSlide>
        </Splide>
        <Splide ref="thumbs" :options="thumbsOptions" class="w-100 mt-2">
            <SplideSlide v-for="(img, i) in images" :key="img.id">
                <img :src="img.url" :alt="`Slide ${i + 1}`" />
            </SplideSlide>
        </Splide>
    </div>
</template>

<script lang="ts">
import { Options } from "@splidejs/splide";
import { defineComponent, onMounted, ref } from "vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";

export default defineComponent({
    name: "Carousel",
    props: {
        images: Array,
    },
    components: {
        Splide,
        SplideSlide,
    },
    setup() {
        const main = ref<InstanceType<typeof Splide>>();
        const thumbs = ref<InstanceType<typeof Splide>>();
        const mainOptions: Options = {
            type: "fade",
            pagination: false,
            cover: true,
            heightRatio: 9 / 16,
        };
        const thumbsOptions: Options = {
            rewind: true,
            isNavigation: true,
            perPage: 6,
            gap: 10,
            arrows: false,
            focus: "center",
            heightRatio: 0.1,
            pagination: false,
            cover: true,
            width: "100%",
            breakpoints: {
                768: {
                    perPage: 5,
                },
            },
        };
        onMounted(() => {
            const thumbsSplide = thumbs.value?.splide;
            if (thumbsSplide) {
                main.value?.sync(thumbsSplide);
            }
            const mainSplide = main.value?.splide;
            if (mainSplide) {
                thumbs.value?.sync(mainSplide);
            }
        });
        return {
            main,
            thumbs,
            mainOptions,
            thumbsOptions,
        };
    },
});
</script>



<style lang="scss" scoped>
.carousel {
    max-width: 100%;
}

.splide--nav
    > .splide__slider
    > .splide__track
    > .splide__list
    > .splide__slide.is-active,
.splide--nav > .splide__track > .splide__list > .splide__slide {
    border: none;
    border-bottom: 2px solid transparent;

    &.is-active {
        border: none;
        border-bottom: 2px solid $primary;
    }
}
</style>