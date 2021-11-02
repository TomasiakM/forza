<template>
    <div>
        <div class="sticky-lg-top" style="top: 70px">
            <div class="card">
                <div class="card-body">
                    <div class="statistics">
                        <h3>Statistics</h3>
                        <h6 class="mb-1">
                            Speed (<AnimateNumber
                                :startNumber="0"
                                :endNumber="data.speed"
                                :duration="0.6"
                                :delay="0.3"
                                :formater="(e) => e.toFixed(1)"
                            />)
                        </h6>
                        <div class="bar mb-2 rounded border">
                            <div
                                :style="{ width: `${data.speed * 10}%` }"
                            ></div>
                        </div>
                        <h6 class="mb-1">
                            Handling (<AnimateNumber
                                :startNumber="0"
                                :endNumber="data.handling"
                                :duration="0.6"
                                :delay="0.4"
                                :formater="(e) => e.toFixed(1)"
                            />)
                        </h6>
                        <div class="bar mb-2 rounded border">
                            <div
                                :style="{ width: `${data.handling * 10}%` }"
                            ></div>
                        </div>
                        <h6 class="mb-1">
                            Acceleration (<AnimateNumber
                                :startNumber="0"
                                :endNumber="data.acceleration"
                                :duration="0.6"
                                :delay="0.5"
                                :formater="(e) => e.toFixed(1)"
                            />)
                        </h6>
                        <div class="bar mb-2 rounded border">
                            <div
                                :style="{ width: `${data.acceleration * 10}%` }"
                            ></div>
                        </div>
                        <h6 class="mb-1">
                            Launch (<AnimateNumber
                                :startNumber="0"
                                :endNumber="data.launch"
                                :duration="0.6"
                                :delay="0.6"
                                :formater="(e) => e.toFixed(1)"
                            />)
                        </h6>
                        <div class="bar mb-2 rounded border">
                            <div
                                :style="{ width: `${data.launch * 10}%` }"
                            ></div>
                        </div>
                        <h6 class="mb-1">
                            Breaking (<AnimateNumber
                                :startNumber="0"
                                :endNumber="data.breaking"
                                :duration="0.6"
                                :delay="0.7"
                                :formater="(e) => e.toFixed(1)"
                            />)
                        </h6>
                        <div class="bar mb-3 rounded border">
                            <div
                                :style="{ width: `${data.breaking * 10}%` }"
                            ></div>
                        </div>
                        <div
                            class="
                                d-flex
                                align-items-center
                                justify-content-between
                            "
                        >
                            <img
                                :style="{ height: '36px' }"
                                :src="data.driveImage"
                                :alt="data.drive"
                            />
                            <Badge :carClass="data.carClass" :delay="0.3" />
                        </div>
                        <div class="d-flex justify-content-end mt-3">
                            <h5
                                :class="[
                                    'm-0',
                                    data.isSold &&
                                        'text-decoration-line-through',
                                ]"
                            >
                                <AnimateNumber
                                    :startNumber="0"
                                    :endNumber="data.price"
                                    :duration="0.5"
                                    :delay="0.3"
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
                            </h5>
                            <span
                                v-if="data.isSold"
                                class="bg-danger text-light rounded-3 ms-1 px-2"
                            >
                                Sold
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import AnimateNumber from "./AnimateNumber.vue";
import Badge from "./Badge.vue";

export default defineComponent({
    name: "CarStatistics",
    components: {
        AnimateNumber,
        Badge,
    },
    props: {
        data: {
            type: Object as PropType<{ [key: string]: number }>,
            required: true,
        },
    },
});
</script>

<style lang="scss" scoped>
.statistics {
    .bar {
        height: 24px;
        overflow: hidden;
    }

    .bar div {
        position: relative;
        height: 100%;

        &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            right: 0;
            background: $primary;
            transform: translateX(-101%);
            animation: transform 0.5s ease-in-out forwards;
        }
    }

    & > div:nth-child(3) > div::after {
        animation-delay: 0.3s;
    }
    & > div:nth-child(5) > div::after {
        animation-delay: 0.4s;
    }
    & > div:nth-child(7) > div::after {
        animation-delay: 0.5s;
    }
    & > div:nth-child(9) > div::after {
        animation-delay: 0.6s;
    }
    & > div:nth-child(11) > div::after {
        animation-delay: 0.7s;
    }
}

@keyframes transform {
    0% {
        transform: translateX(-101%);
    }
    100% {
        transform: translateX(0);
    }
}
</style>