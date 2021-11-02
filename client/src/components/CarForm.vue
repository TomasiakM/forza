<template>
    <div v-if="error" class="alert alert-danger py-2">
        Something went wrong, try again...
    </div>
    <div v-else-if="success" class="alert alert-success py-2">
        {{ successMessage }}
    </div>
    <form @submit.prevent="submitForm">
        <div class="row">
            <div class="col-12 col-md-4 mb-3">
                <div class="card h-100">
                    <div class="card-header">
                        <h4>Statistics</h4>
                    </div>
                    <div class="card-body">
                        <div class="d-grid gap-2">
                            <div>
                                <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    v-model="formData.speed"
                                    placeholder="Speed"
                                    step="0.1"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.speed"
                                >
                                    <small>{{ validationError.speed }}</small>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    v-model="formData.handling"
                                    placeholder="Handling"
                                    step="0.1"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.handling"
                                >
                                    <small>{{
                                        validationError.handling
                                    }}</small>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    v-model="formData.acceleration"
                                    placeholder="Acceleration"
                                    step="0.1"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.acceleration"
                                >
                                    <small>{{
                                        validationError.acceleration
                                    }}</small>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    v-model="formData.launch"
                                    placeholder="Launch"
                                    step="0.1"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.launch"
                                >
                                    <small>{{ validationError.launch }}</small>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    v-model="formData.breaking"
                                    placeholder="Breaking"
                                    step="0.1"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.breaking"
                                >
                                    <small>{{
                                        validationError.breaking
                                    }}</small>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    v-model="formData.carClass"
                                    placeholder="Class"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.carClass"
                                >
                                    <small>{{
                                        validationError.carClass
                                    }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4 mb-3">
                <div class="card h-100">
                    <div class="card-header">
                        <h4>Specification</h4>
                    </div>
                    <div class="card-body">
                        <div class="d-grid gap-2">
                            <div>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    v-model="formData.engine"
                                    placeholder="Engine"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.engine"
                                >
                                    <small>{{ validationError.engine }}</small>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    v-model="formData.enginePosition"
                                    placeholder="Engine position"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.enginePosition"
                                >
                                    <small>{{
                                        validationError.enginePosition
                                    }}</small>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    v-model="formData.power"
                                    placeholder="Power"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.power"
                                >
                                    <small>{{ validationError.power }}</small>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    v-model="formData.drive"
                                    placeholder="Drive"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.drive"
                                >
                                    <small>{{ validationError.drive }}</small>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    v-model="formData.transmission"
                                    placeholder="Transmission"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.transmission"
                                >
                                    <small>{{
                                        validationError.transmission
                                    }}</small>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    v-model="formData.weight"
                                    placeholder="Weight"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.weight"
                                >
                                    <small>{{ validationError.weight }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4 mb-3">
                <div class="card h-100">
                    <div class="card-header">
                        <h4>Other info</h4>
                    </div>
                    <div class="card-body">
                        <div class="d-grid gap-2">
                            <div>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    v-model="formData.make"
                                    placeholder="Make"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.make"
                                >
                                    <small>{{ validationError.make }}</small>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    v-model="formData.model"
                                    placeholder="Model"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.model"
                                >
                                    <small>{{ validationError.model }}</small>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    v-model="formData.productionYear"
                                    placeholder="Production year"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.productionYear"
                                >
                                    <small>{{
                                        validationError.productionYear
                                    }}</small>
                                </div>
                            </div>
                            <div>
                                <div class="input-group input-group-sm">
                                    <input
                                        type="number"
                                        class="form-control"
                                        v-model="formData.price"
                                        placeholder="Price"
                                    />
                                    <span class="input-group-text">CR</span>
                                </div>
                                <div
                                    class="text-danger"
                                    v-if="validationError.price"
                                >
                                    <small>{{ validationError.price }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-lg-4 mb-3">
                <div class="card h-100">
                    <div class="card-header">
                        <h4>Images</h4>
                    </div>
                    <div class="card-body">
                        <div class="d-grid gap-2">
                            <div>
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    v-model="formData.thumbnail"
                                    placeholder="Thumbnail url"
                                />
                                <div
                                    class="text-danger"
                                    v-if="validationError.thumbnail"
                                >
                                    <small>{{
                                        validationError.thumbnail
                                    }}</small>
                                </div>
                            </div>

                            <h6 class="mb-0">Carousel</h6>
                            <draggable
                                v-model="formData.images"
                                item-key="id"
                                handle=".handle"
                                tag="transition-group"
                            >
                                <template #item="{ element }">
                                    <div
                                        class="input-group input-group-sm item"
                                    >
                                        <div
                                            class="
                                                border border-end-0
                                                rounded-start
                                                d-flex
                                                align-items-center
                                                cursor-pointer
                                                handle
                                            "
                                        >
                                            <i
                                                class="
                                                    bi bi-three-dots-vertical
                                                "
                                            ></i>
                                        </div>
                                        <input
                                            type="text"
                                            class="form-control"
                                            :value="element.url"
                                            :disabled="true"
                                        />
                                        <button
                                            class="btn btn-danger"
                                            type="button"
                                            @click="deleteImage(element.id)"
                                        >
                                            <i class="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                </template>
                            </draggable>

                            <div>
                                <div class="input-group input-group-sm">
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        v-model="imageInput"
                                        placeholder="Image url"
                                    />
                                    <button
                                        class="btn btn-success"
                                        type="button"
                                        @click="addImage()"
                                    >
                                        <i class="bi bi-plus-lg"></i>
                                    </button>
                                </div>
                                <div
                                    class="text-danger"
                                    v-if="validationError.images"
                                >
                                    <small>{{ validationError.images }}</small>
                                </div>
                            </div>

                            <h6 class="d-flex justify-content-between">
                                Drive image
                                <img
                                    v-if="formData.driveImage"
                                    :src="formData.driveImage"
                                    alt="Selected drive image"
                                    style="max-height: 30px"
                                />
                            </h6>
                            <div>
                                <div class="row px-2">
                                    <div
                                        class="col-auto p-0"
                                        v-for="(img, i) in driveImages"
                                        :key="i"
                                    >
                                        <img
                                            :src="img"
                                            class="m-1 p-0"
                                            alt="Drive image"
                                            style="
                                                max-height: 32px;
                                                cursor: pointer;
                                            "
                                            @click="formData.driveImage = img"
                                        />
                                    </div>
                                </div>
                                <div
                                    class="text-danger"
                                    v-if="validationError.driveImage"
                                >
                                    <small>{{
                                        validationError.driveImage
                                    }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-8 mb-3">
                <div class="card h-100">
                    <div class="card-header">
                        <h4>Description</h4>
                    </div>
                    <div
                        class="card-body d-flex flex-column"
                        style="min-height: 400px"
                    >
                        <textarea
                            class="form-control h-100"
                            v-model="formData.description"
                            placeholder="Description"
                        ></textarea>
                        <div
                            class="text-danger"
                            v-if="validationError.description"
                        >
                            <small>{{ validationError.description }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="preview = !preview"
        >
            Previev images
        </button>
        <div v-if="preview">
            <h5 class="mt-3">Thumbnail</h5>
            <div v-if="formData.thumbnail">
                <img
                    class="col-4 col-md-2"
                    :src="formData.thumbnail"
                    alt="Thumbnail"
                />
            </div>
            <h5 class="mt-3">Carousel</h5>
            <div class="row px-2">
                <img
                    v-for="img in formData.images"
                    :key="img.id"
                    :src="img.url"
                    alt="Carousel image"
                    class="col-4 col-md-2 p-1"
                />
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button
                type="reset"
                @click.prevent="resetForm"
                class="btn btn-secondary me-2 px-4"
            >
                Reset
            </button>
            <button
                type="submit"
                class="btn btn-primary px-4"
                :disabled="isLoading"
            >
                <span
                    v-if="isLoading"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                ></span>
                {{ submitBtn }}
            </button>
        </div>
    </form>
</template>

<script lang="ts">
import { Car } from "@/types/Car";
import { defineComponent, PropType } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
    name: "CarForm",
    emits: ["submitAction", "resetForm"],
    components: {
        draggable,
    },
    data() {
        return {
            formData: {
                speed: undefined as undefined | number,
                handling: undefined as undefined | number,
                acceleration: undefined as undefined | number,
                launch: undefined as undefined | number,
                breaking: undefined as undefined | number,
                carClass: undefined as undefined | number,
                engine: "",
                power: "",
                enginePosition: "",
                drive: "",
                transmission: "",
                weight: "",
                price: undefined as undefined | number,
                images: [] as { url: string; id: number }[],
                thumbnail: "",
                driveImage: "",
                make: "",
                model: "",
                description: "",
                productionYear: undefined as undefined | number,
            },
            imageInput: "",
            driveImages: [
                "https://i.imgur.com/kVbFMob.png",
                "https://i.imgur.com/rhZJCCi.png",
                "https://i.imgur.com/fSn27fL.png",
                "https://i.imgur.com/vGmZSRJ.png",
                "https://i.imgur.com/0mPnYhq.png",
                "https://i.imgur.com/7WlFUfW.png",
            ],
            preview: false,
        };
    },
    props: {
        data: {
            type: Object as PropType<Car>,
        },
        validationError: {
            type: Object,
            required: true,
        },
        submitBtn: {
            type: String,
            required: true,
        },
        success: {
            type: Boolean,
            required: true,
        },
        successMessage: {
            type: String,
            required: true,
        },
        error: {
            type: Boolean,
            required: true,
        },
        isLoading: {
            type: Boolean,
            required: true,
        },
    },
    mounted() {
        if (this.data) {
            this.formData = { ...this.formData, ...this.data };
        }
    },
    methods: {
        deleteImage(id: number) {
            this.formData.images = this.formData.images.filter(
                (e) => e.id !== id
            );
        },
        addImage() {
            const index = this.formData.images.length;
            this.formData.images.push({ url: this.imageInput, id: index });
            this.imageInput = "";
        },
        submitForm() {
            this.$emit("submitAction", this.formData);
        },
        resetForm() {
            this.formData.speed = undefined;
            this.formData.handling = undefined;
            this.formData.acceleration = undefined;
            this.formData.launch = undefined;
            this.formData.breaking = undefined;
            this.formData.carClass = undefined;
            this.formData.engine = "";
            this.formData.power = "";
            this.formData.enginePosition = "";
            this.formData.drive = "";
            this.formData.transmission = "";
            this.formData.weight = "";
            this.formData.price = undefined;
            this.formData.images = [];
            this.formData.thumbnail = "";
            this.formData.driveImage = "";
            this.formData.make = "";
            this.formData.model = "";
            this.formData.description = "";
            this.formData.productionYear = undefined;

            this.$emit("resetForm");
        },
    },
});
</script>

<style lang="scss" scoped>
.drive-image {
    height: 30px;
}
</style>