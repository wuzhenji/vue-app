<template>
<div class="layout">
    <top-bar></top-bar>
    <left-bar v-if="showLeftBar"></left-bar>
    <router-view class="layout-content" />
</div>
</template>

<script>
import {
    mapState,
} from 'vuex'
import TopBar from '../components/TopBar'
import LeftBar from '../components/LeftBar'
export default {
    components: {
        TopBar,
        LeftBar
    },
    data() {
        return {}
    },
    computed: {
        ...mapState('blog', {
            showLeftBar: state => state.showLeftBar
        }),
    },
}
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
    background: #f4f5f7 !important;

    &-content {
        margin-top: 64px;
    }
}
</style>
