<template>
    <div>
        <div v-if="!selectedCar">
            <div
                v-for="car in allCars"
                :key="car._id"
                class="d-flex justify-content-between car-item p-2"
            >
                <div class="d-flex align-items-center">
                    <router-link
                        :to="`/car/${car._id}`"
                        class="
                            d-flex
                            align-items-center
                            text-decoration-none text-dark
                        "
                    >
                        <img :src="car.thumbnail" :alt="car.model" />
                        <div class="d-none d-sm-block">{{ car.model }}</div>
                    </router-link>
                    <div
                        v-if="car.isSold"
                        class="rounded-3 ms-1 bg-danger text-light px-2"
                    >
                        Sold
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <div class="dropdown dropstart">
                        <button
                            role="button"
                            type="button"
                            class="btn btn-primary btn-sm"
                            :id="`dropdown-${car._id}`"
                            data-bs-toggle="dropdown"
                        >
                            <i class="bi bi-gear-fill"></i>
                        </button>

                        <ul
                            class="
                                dropdown-menu dropdown-menu-start
                                bg-dark
                                px-2
                            "
                            :aria-labelledby="`dropdown-${car._id}`"
                        >
                            <li class="d-grid">
                                <button
                                    type="button"
                                    class="btn btn-secondary btn-sm btn-fluid"
                                    @click="sellCar(car._id)"
                                >
                                    {{ car.isSold ? "Un sell" : "Sell" }}
                                </button>
                            </li>
                            <li class="d-grid my-1">
                                <button
                                    type="button"
                                    class="btn btn-primary btn-sm"
                                    @click="selectedCar = car"
                                >
                                    Edit
                                </button>
                            </li>
                            <li class="d-grid">
                                <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    @click="selectedCarToDelete = car"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteModal"
                                >
                                    Delete
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="mb-3 d-flex justify-content-between">
                <button
                    class="btn btn-primary btn-sm"
                    @click="selectedCar = null"
                >
                    <i class="bi bi-arrow-left"></i> Back
                </button>
            </div>
            <CarForm
                @submitAction="submit"
                @resetForm="reset"
                submitBtn="Save"
                :data="selectedCar"
                :validationError="validationError"
                :success="success"
                successMessage="Changes have been saved"
                :error="error"
                :isLoading="isLoading"
            />
        </div>

        <!-- Delete modal -->
        <div
            class="modal fade"
            id="deleteModal"
            tabindex="-1"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body" v-if="selectedCarToDelete">
                        <img
                            :src="selectedCarToDelete.thumbnail"
                            :alt="selectedCarToDelete.model"
                            class="img-fluid"
                        />
                        <h5>
                            Are you sure, you want delete
                            {{ selectedCarToDelete.make }}
                            {{ selectedCarToDelete.model }}?
                        </h5>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary btn-sm"
                            data-bs-dismiss="modal"
                            ref="modalCloseBtn"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary btn-sm"
                            @click="deleteCar"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CarForm from "@/components/CarForm.vue";
import CarItem from "@/components/Car.vue";
import { Car } from "@/types/Car";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
    name: "EditCar",
    data() {
        return {
            selectedCar: null as null | Car,
            selectedCarToDelete: null as null | Car,
            validationError: {},
            error: false,
            success: false,
            isLoading: false,
        };
    },
    watch: {
        selectedCar() {
            this.error = false;
            this.validationError = {};
            this.success = false;
        },
        success(to: boolean) {
            if (to) setTimeout(() => (this.success = false), 5000);
        },
    },
    components: {
        CarItem,
        CarForm,
    },
    methods: {
        ...mapActions(["updateCar", "deleteCarFromList"]),
        ...mapActions("adminPanel", ["logout"]),
        setCar(car: Car) {
            this.selectedCar = Object.assign({}, car);
            this.selectedCar.images = [...this.selectedCar.images];
        },
        submit(data: Car) {
            this.isLoading = true;
            this.error = false;
            this.validationError = {};
            const id = data._id;
            fetch(`/api/car/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${this.token}`,
                },
            })
                .then((e) => e.json())
                .then((e) => {
                    if (e.auth === false) {
                        this.logout();
                        return;
                    }
                    if (e.validationError)
                        this.validationError = e.validationError;
                    if (e.success) {
                        this.updateCar(e.data);
                        this.success = true;
                    }
                })
                .catch((err) => {
                    this.error = true;
                })
                .finally(() => (this.isLoading = false));
        },
        sellCar(id: string) {
            fetch(`/api/car/${id}/sell`, {
                method: "PUT",
                headers: { authorization: `Bearer ${this.token}` },
            })
                .then((e) => e.json())
                .then((e) => {
                    if (e.success) {
                        this.updateCar(e.data);
                    }
                    if (e.auth === false) {
                        this.logout();
                    }
                });
        },
        deleteCar() {
            if (!this.selectedCarToDelete) return;

            const id = this.selectedCarToDelete._id;

            fetch(`/api/car/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${this.token}`,
                },
            })
                .then((e) => e.json())
                .then((e) => {
                    if (e.success) {
                        (this.$refs as any).modalCloseBtn.click();
                        this.deleteCarFromList(id);
                    }
                    if (e.auth === false) {
                        this.logout();
                    }
                });
        },
        reset() {
            this.error = false;
            this.validationError = {};
        },
    },
    computed: {
        ...mapGetters(["allCars"]),
        ...mapGetters("adminPanel", ["token"]),
    },
});
</script>

<style lang="scss" scoped>
.img-thumbnail {
    border: none;
}

.delete-btn {
    width: 24px;
    height: 24px;
    font-size: 18px;
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.car-item {
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);

    img {
        max-height: 26px;

        @media (min-width: 524px) {
            max-height: 40px;
        }
    }
}
</style>