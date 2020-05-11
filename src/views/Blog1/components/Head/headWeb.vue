<template>
<div class="leftbar">
    <div class="leftbar-body">
        <div class="leftbar-body-name">吴振吉</div>
        <div class="leftbar-body-menu">
            <router-link to="/blog" tag="li">
                <i class="el-icon-s-home"></i>
                首页
            </router-link>
            <router-link to="/blog/create" tag="li">
                <i class="el-icon-s-help"></i>
                归档
            </router-link>
            <router-link to="/link" tag="li">
                <i class="el-icon-link"></i>
                友情链接
            </router-link>
            <router-link to="/blog/statistics" tag="li">
                <i class="el-icon-s-help"></i>
                统计
            </router-link>
            <li>
                <i class="el-icon-lollipop"></i>
                关于我
            </li>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {}
};
</script>

<style lang="scss" scoped>
.leftbar {
    width: 100%;
    height: 42px;
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
    position: fixed;
    z-index: 1;

    &-body {
        width: 1280px;
        height: 100%;
        max-width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;

        &-name {
            font-size: 22px;
            color: #222222;
            font-weight: bold;
            margin: 0 20px;
            cursor: pointer;
        }

        &-menu {
            display: flex;

            li {
                padding: 0 11px;
                cursor: pointer;
                font-size: 14px;
            }
        }
    }
}
</style>
