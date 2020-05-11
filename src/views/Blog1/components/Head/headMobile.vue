<template>
<div class="head" :class="showLeftBar && 'marginhead'">
    <div class="head-body">
        <i v-if="!showLeftBar" @click="handleShowLeftBar" class="head-body-menuicon el-icon-s-unfold"></i>
        <i v-if="showLeftBar" @click="handleShowLeftBar" class="head-body-menuicon el-icon-s-fold"></i>
        <div class="head-body-name">吴振吉</div>
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data() {
        return {};
    },
    watch: {},
    computed: {
        ...mapState('blog', {
            showLeftBar: state => state.showLeftBar
        }),
    },
    methods: {
        ...mapActions('blog', {
            setLeftBarStatus: "setLeftBarStatus"
        }),
        handleShowLeftBar() {
            this.setLeftBarStatus(!this.showLeftBar)
        }
    },
    mounted() {}
};
</script>

<style lang="scss" scoped>
.head {
    width: 100%;
    height: 42px;
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    transition: all .5s;
    position: fixed;
    z-index: 1;

    &-body {
        width: 100%;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;

        &-menuicon {
            font-size: 25px;
            position: absolute;
            left: 20px;
            cursor: pointer;
        }

        &-name {
            font-size: 22px;
            color: #222222;
            font-weight: bold;
            margin: 0 20px;
            cursor: pointer;
        }
    }
}

.marginhead {
    margin-left: 250px;
}
</style>
