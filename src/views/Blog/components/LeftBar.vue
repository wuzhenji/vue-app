<template>
<div @click="handleClick" class="leftbar" :style="{'background': show ? 'rgba(0, 0, 0, 0.4)' : ''}">
    <transition name="leftbar">
        <div v-if="show" ref="leftbar_body" class="leftbar-body">
            <div class="leftbar-body-bg"></div>
            <div class="leftbar-body-avatar">
                <img src="@/assets/image/blog/avatargif.gif" alt />
            </div>
            <div class="leftbar-body-name">吴振吉</div>
            <div class="leftbar-body-menu">
                <li @click="handleGo('BlogHome')" tag="li">
                    <i class="el-icon-s-home"></i>
                    首页
                </li>
                <li @click="handleGo('AddBlog')" tag="li">
                    <i class="el-icon-s-help"></i>
                    写博客
                </li>
                <li @click="handleGo('Link')" tag="li">
                    <i class="el-icon-link"></i>
                    友情链接
                </li>
                <li @click="handleGo('AddLink')" tag="li">
                    <i class="el-icon-star-on"></i>
                    友情链接管理
                </li>
                <li>
                    <i class="el-icon-lollipop"></i>
                    关于我
                </li>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
export default {
    components: {},
    data() {
        return {
            show: false
        };
    },
    computed: {
        ...mapState("blog", {
            showLeftBar: state => state.showLeftBar
        })
    },
    methods: {
        ...mapActions("blog", {
            setLeftBarStatus: "setLeftBarStatus"
        }),
        handleShowLeftBar() {
            this.setLeftBarStatus(true);
        },
        handleGo(name) {
            this.setLeftBarStatus(false)
            this.$router.push({
                name: name
            })
        },
        handleClick(e) {
            if(!this.showLeftBar){
                return
            }
            let dom = e.target;
            let leftbarbody = this.$refs.leftbar_body;
            if (!leftbarbody.contains(dom)) {
                this.show = false
                setTimeout(() => {
                    this.setLeftBarStatus(false);
                }, 300);
            }
        }
    },
    mounted() {
        this.show = true
    },
};
</script>

<style lang="scss" scoped>
.leftbar-enter-active {
    animation: leftbarIn 0.4s;

    @keyframes leftbarIn {
        0% {
            margin-left: -250px;
        }

        100% {
            margin-left: 0;
        }
    }
}

.leftbar-leave-active {
    animation: leftbarLeave 0.4s;

    @keyframes leftbarLeave {
        0% {
            margin-left: 0;
        }

        100% {
            margin-left: -250px;
        }
    }
}

.leftbar {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    z-index: 2;
    transform: background .4s;

    &-body {
        width: 250px;
        height: 100%;
        position: relative;
        padding: 22px 0;
        background-color: #3f51b5 !important;
        background: url("./../../../assets/image/blog/mobile_bg.jpg");
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
                height: 49px;
                display: flex;
                align-items: center;
                color: #ffffff;
                font-size: 16px;
                cursor: pointer;
                padding: 0 40px;
                transition: height .3s;

                i {
                    margin-right: 10px;
                }

                &:hover {
                    // height: 49px;
                    background: rgba(128, 128, 128, .5);
                }
            }
        }
    }
}
</style>
