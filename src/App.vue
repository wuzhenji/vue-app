<template>
<div id="app">
    <router-view />
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    name: "App",
    methods: {
        ...mapActions("app", {
            setBodyWidth: "setBodyWidth"
        }),
        listenWebSize() {
            this.setBodyWidth(document.body.clientWidth);
            window.onresize = () => {
                let width = document.body.clientWidth;
                this.setBodyWidth(width);
            };
        },
    },
    mounted() {
        this.listenWebSize();
    },
    created() {
        window.onresize = null;
    }
};
</script>

<style lang="scss">
@import './assets/style/common/wzj.scss';
#app,
body {
    width: 100%;
    height: 100vh;
    padding: 0;
    margin: 0;
}

p,
span,
h1,
h2,
h3,
h4,
h5 {
    margin: 0;
    padding: 0;
}

pre {
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
    *white-space: normal !important;
}

ul,
li {
    list-style: none;
    outline: none;
}

div,
ul,
li,
p,
span {
    box-sizing: border-box;
}
</style>
