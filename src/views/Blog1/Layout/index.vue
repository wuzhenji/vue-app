<template>
<div class="layout">
    <head-web v-if="!isMobile"></head-web>
    <head-mobile v-if="isMobile"></head-mobile>
    <transition name="fadeIn">
        <left-bar-mobile v-if="isMobile && showLeftBar"></left-bar-mobile>
    </transition>
    <div class="layout-body-main" :class="{'mobilemain-margin': showLeftBar, 'mobilemain': isMobile}">
        <left-bar-web v-if="!isMobile" class="layout-body-main-left"></left-bar-web>
        <router-view class="layout-body-main-middle" :class="{'mobile-middle': isMobile}" />
        <right-bar-web v-if="!isMobile" class="layout-body-main-right"></right-bar-web>
    </div>
    <foot v-if="!isMobile"></foot>
</div>
</template>

<script>
import Foot from "./../components/Foot";
import HeadWeb from "./../components/Head/headWeb";
import HeadMobile from "./../components/Head/headMobile";
import leftBarWeb from "./../components/leftBar/leftBarWeb";
import RightBarWeb from "./../components/rightBar/rightBarWeb";
import LeftBarMobile from "./../components/leftBar/leftBarMobile";
import {
    mapState
} from "vuex";
export default {
    components: {
        Foot,
        HeadWeb,
        HeadMobile,
        leftBarWeb,
        RightBarWeb,
        LeftBarMobile
    },
    data() {
        return {};
    },
    watch: {},
    computed: {
        ...mapState("app", {
            bodyWidth: state => state.bodyWidth
        }),
        ...mapState("blog", {
            showLeftBar: state => state.showLeftBar
        }),
        isMobile() {
            return this.bodyWidth < 900;
        }
    },
    methods: {},
    mounted() {}
};
</script>

<style lang="scss" scoped>
.fadeIn-enter-active {
    animation: fadeIn 0.5s;

    @keyframes fadeIn {
        0% {
            margin-left: -250px;
        }

        100% {
            margin-left: 0;
        }
    }
}

.fadeIn-leave-active {
    animation: fadeLeave 0.5s;

    @keyframes fadeLeave {
        0% {
            margin-left: 0;
        }

        100% {
            margin-left: -250px;
        }
    }
}

.layout {
    width: 100%;
    height: 100%;
    background: #f4f5f7;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #cccccc;
        border-radius: 8px;
    }

    &-body-main {
        width: 1280px;
        max-width: 100%;
        margin: 42px auto 0;
        padding: 16px 0 16px;
        display: flex;
        justify-content: center;
        transition: all 0.5s;

        &-left {
            float: left;
            width: 20%;
            padding-left: 5px;
        }

        &-right {
            float: left;
            width: 20%;
            padding-right: 5px;
        }

        &-middle {
            width: 60%;
            padding: 0 8px;
        }

        .mobile-middle {
            width: 100%;
            padding: 0 8px;
        }
    }

    .mobilemain {
        position: absolute;
        left: 0;
    }

    .mobilemain-margin {
        left: 250px;
    }

    // }
}
</style>
