<template>
<div class="head">
    <div class="head-bg"></div>
    <div class="head-avatar">
        <img src="@/assets/image/blog/theweeknd1.jpeg" alt />
    </div>
    <div class="head-name">吴振吉</div>
    <div class="head-menu">
        <li @click="handleGo('BlogHome')" tag="li">
            <i class="el-icon-s-home"></i>
            首页
        </li>
        <li @click="handleGo('BlogCreate')" tag="li">
            <i class="el-icon-s-help"></i>
            归档
        </li>
        <li>
            <i class="el-icon-link"></i>
            友情链接
        </li>
        <li>
            <i class="el-icon-star-on"></i>
            主题
        </li>
        <li>
            <i class="el-icon-lollipop"></i>
            关于我
        </li>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex'
export default {
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {
        ...mapActions('blog', {
            setLeftBarStatus: "setLeftBarStatus"
        }),
        handleGo(name) {
            this.setLeftBarStatus(false)
            this.$router.push({
                name: name
            })
        }
    },
    mounted() {}
};
</script>

<style lang="scss" scoped>
.head {
    width: 250px;
    height: 100%;
    padding: 22px 0;
    position: fixed;
    top: 0;
    left: 0;
    background: url("./../../../../assets/image/blog/theweeknd4.jpg");
    background-position: center top;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, .2) 0 0 5px 0;

    &-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: -1;
        filter: alpha(opacity=60);
        -moz-opacity: .6;
        -khtml-opacity: .6;
        opacity: .6;
        background-color: #000;
    }

    &-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 3px solid #fff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }

    &-name {
        margin-top: 10px;
        font-size: 17px;
        font-weight: bold;
        color: #ffffff;
        cursor: default;
    }

    &-menu {
        width: 100%;
        margin-top: 30px;
        display: flex;
        flex-direction: column;

        li {
            width: 100%;
            height: 39px;
            display: flex;
            align-items: center;
            color: #ffffff;
            font-size: 14px;
            cursor: pointer;
            padding: 0 40px;
            transition: height .3s;

            i {
                margin-right: 10px;
            }

            &:hover {
                height: 49px;
                background: rgba(128, 128, 128, .5);
            }
        }
    }
}
</style>
