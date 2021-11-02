<template>
    <div class="loader">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<style lang="scss" scoped>
body {
    overflow: hidden;
}

.loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #dcdde1;
    z-index: 1111;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: block;
        margin: 0 2px;
        background: $primary;
        animation: loaderAnimation 1s infinite ease-in-out;

        &:nth-child(2) {
            animation-delay: 0.1s;
        }
        &:nth-child(3) {
            animation-delay: 0.2s;
        }
    }
}

@keyframes loaderAnimation {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0);
    }
}
</style>