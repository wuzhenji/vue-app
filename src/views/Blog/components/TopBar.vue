<template>
<div class="topbar" :style="{'background': scrollTop || $route.name != 'BlogHome' ? '#3f51b5' : ''}">
    <div @click="handleShowLeftBar" class="topbar-icon">
        <i class="el-icon-s-unfold"></i>
    </div>
    <div class="topbar-name">吴振吉</div>
    <i @click="handleShowSearch" class="el-icon-search searchicon"></i>
    <div @click="handleClickSearchBody" v-if="showSearch" class="topbar-search">
        <div ref="searchTitle" class="topbar-search-title">
            <div class="search-input">
                <i class="input-icon el-icon-search"></i>
                <input v-model="searchKey" placeholder="搜索什么..." type="text" />
            </div>
            <i @click="showSearch = false" class="el-icon-close searchicon"></i>
        </div>
        <div ref="searchResult" v-if="blogList.length" class="topbar-search-content need_scroll">
            <blog-item v-for="item in blogList" :key="item.id" :itemInfo="item"></blog-item>
        </div>
    </div>
</div>
</template>

<script>
import BlogItem from "@/components/ListItem/BlogItem";
import {
    mapState,
    mapActions
} from "vuex";
import {
    getBlogListAPI
} from "@/api/blog";
export default {
    components: {
        BlogItem
    },
    data() {
        return {
            scrollTop: 0,
            showSearch: false,
            searchKey: "",
            blogList: [],
            page: {
                pagesize: 99,
                pagenum: 1
            }
        }
    },
    watch: {
        searchKey: {
            handler(val) {
                if (val) {
                    this.getBlogList();
                } else {
                    this.blogList = [];
                }
            }
        }
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
        // 显示搜索
        handleShowSearch() {
            this.showSearch = true;
        },
        handleShowLeftBar() {
            this.setLeftBarStatus(true);
        },
        handleClickSearchBody(e) {
            if(!this.showSearch) return
            let dom = e.target;
            let searchTitle = this.$refs.searchTitle;
            let searchResult = this.$refs.searchResult;
            if (!searchTitle.contains(dom)) {
                if(searchResult){
                    !searchResult.contains(dom) && (this.showSearch = false);
                } else {
                    this.showSearch = false
                }
            }
        },
        handleScroll() {
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            this.scrollTop = scrollTop;
        },
        async getBlogList() {
            try {
                let response = await getBlogListAPI({
                    title: this.searchKey,
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
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>

<style lang="scss" scoped>
/deep/.el-input__inner {
    background-color: #000000 !important;
}

.topbar {
    width: 100%;
    height: 64px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    z-index: 2;

    &-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25px;
        position: absolute;
        left: 10px;
        color: #ffffff;
        cursor: pointer;
        border-radius: 50%;
        transform: background 1s;

        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }

    &-name {
        font-size: 22px;
        color: #ffffff;
        margin: 0 70px;
        cursor: pointer;
    }

    .searchicon {
        width: 48px;
        height: 48px;
        position: absolute;
        right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
        font-size: 22px;
        color: #ffffff;

        &:hover {
            background: rgba($color: #000000, $alpha: 0.1);
        }

        /deep/.el-input {
            .el-input__inner {
                height: 30px;
                line-height: 30px;
                background-color: rgba($color: #ffffff, $alpha: 0.2) !important;
            }

            .el-input__icon {
                line-height: 30px;
            }
        }
    }

    &-search {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba($color: #000000, $alpha: 0.6);
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 10007;

        &-title {
            width: 100%;
            height: 64px;
            background: #3f51b5;
            position: relative;
            display: flex;
            align-items: center;

            .search-input {
                width: 75%;
                height: 80%;
                margin: 0 20px;
                border-radius: 10px;
                background-color: hsla(0, 0%, 100%, 0.3);
                display: flex;
                align-items: center;
                animation: searchinput 0.7s;

                @keyframes searchinput {
                    0% {
                        width: 30%;
                    }

                    100% {
                        width: 75%;
                    }
                }

                .input-icon {
                    width: 48px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                    color: #ffffff;
                }

                input {
                    width: calc(100% - 48px);
                    height: 30px;
                    background: rgba($color: #000000, $alpha: 0);
                    border: 0;
                    outline: none;
                    color: #ffffff;
                    font-size: 18px;
                    padding: 0 10px 0 0;

                    &::placeholder {
                        font-size: 18px;
                        color: #ffffff;
                    }
                }
            }
        }

        &-content {
            width: 100%;
            max-width: 800px;
            height: calc(100% - 64px);
            // overflow-y: auto;
            margin: 20px 0;
            padding: 0 8px;
            border-radius: 8px;
        }
    }
}
</style>
