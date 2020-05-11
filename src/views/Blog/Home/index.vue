<template>
<div class="home">
    <div class="home-head">
        <video class="video" loop="loop" autoplay="autoplay" src="https://cn-south-227-storage-freejishu-21499426.oss.dogecdn.com/2020-03-20%2016-29-09_3.mp4"></video>
        <h1 class="home-head-title">Code · Thinking · WZJ</h1>
    </div>
    <div class="home-body">
        <div class="home-body-main">
            <blog-item v-for="item in blogList" :key="item.id" :itemInfo="item"></blog-item>
            <div class="page">
                <el-pagination background layout="prev, pager, next" @current-change="changePage" :page-size="page.pagesize" :total="total"></el-pagination>
            </div>
        </div>
    </div>
    <transition name="scrolltop">
        <div v-if="isNeedScrollTop" class="home-scrolltop">
            <img @click="handleGoTop" src="@/assets/image/blog/scroll.png" alt />
        </div>
    </transition>
</div>
</template>

<script>
import Bus from '@/utils/bus'
import BlogItem from "@/components/ListItem/BlogItem";
import {
    getBlogListAPI,
    getBlogTagAPI
} from "@/api/blog";
export default {
    components: {
        BlogItem
    },
    data() {
        return {
            showScrolltop: false,
            scrollTop: 0,
            blogList: [],
            page: {
                pagesize: 5,
                pagenum: 1
            },
            total: 15
        };
    },
    computed: {
        isNeedScrollTop() {
            return this.scrollTop > 700 ? true : false;
        }
    },
    methods: {
        changePage(val) {
            this.page.pagenum = val;
            this.getBlogList();
        },
        handleScroll() {
            this.scrollTop =
                document.body.scrollTop || document.documentElement.scrollTop;
        },
        // 禁止滚动
        stopScroll() {
            console.log(123)
        },
        handleGoTop() {
            document.documentElement.scrollTop = 0;
        },
        // 滚动到顶部
        scrollToTop() {
            let timer = setInterval(() => {
                let top = document.body.scrollTop || document.documentElement.scrollTop;
                if (top <= 0) {
                    clearInterval(timer);
                } else {
                    document.documentElement.scrollTop = top - 10;
                }
            }, 1);
        },
        async getBlogList() {
            try {
                let response = await getBlogListAPI({
                    // tagid: this.tagid,
                    ...this.page
                });
                if (response.code == 35000) {
                    this.blogList = response.data.rows;
                    this.total = response.data.count;
                    this.scrollToTop();
                } else {
                    this.$message.error(response.message);
                }
            } catch (err) {
                this.$message.error(err);
            }
        },
        async initData() {
            this.getBlogList();
        }
    },
    mounted() {
        this.initData();
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>

<style lang="scss">
.scrolltop-enter-active {
    animation: scrolltopIn 0.4s;

    @keyframes scrolltopIn {
        0% {
            top: -900px;
        }

        100% {
            top: 0;
        }
    }
}

.scrolltop-leave-active {
    animation: scrolltopLeave 0.4s;

    @keyframes scrolltopLeave {
        0% {
            top: 0;
        }

        100% {
            top: -900px;
        }
    }
}

.home {
    width: 100%;
    min-height: 100vh;

    &-head {
        width: 100%;
        height: 80%;
        position: absolute;
        top: 0;
        left: 0;

        .video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
            background-color: #3f51b5 !important;
        }

        &-title {
            width: 100%;
            height: 40px;
            position: absolute;
            top: calc(50% - 20px);
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            text-shadow: 0px 0px 20px #000;
            font-weight: 400;
            font-size: 2em;
            color: #ffffff;
            // height: 100%;
            // background-color: #000000;
            // top: 0;
            // mix-blend-mode: multiply;
        }
    }

    &-body {
        width: 100%;
        background: url('./../../../assets/image/blog/head.png');
        background-repeat:no-repeat;
        background-size: cover;
        background-position: center top;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 80%;
        left: 0;
        padding: 30px 0;
        // background: #f4f5f7 !important;

        &-main {
            width: 100%;
            max-width: 800px;
            padding: 0 8px;
            min-height: 50px;
            position: relative;

            .page {
                width: 100%;
                margin-top: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

    &-scrolltop {
        position: fixed;
        top: 0;
        right: 3%;
        z-index: 1;
        cursor: pointer;

        img {
            max-height: 100vh;
        }
    }
}
</style>
