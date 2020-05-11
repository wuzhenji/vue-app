<template>
<div class="home">
    <div class="home-head">
        <p @click="handleSearchAll" class="selected">文章</p>
        <!-- <p>文章</p>
      <p>说说</p>-->
        <span>{{getTag}}</span>
    </div>
    <div class="home-main">
        <blog-item :tagList="tagList" v-for="item in blogList" :key="item.id" :itemInfo="item"></blog-item>
        <div @click="handleShowMore" class="home-main-li showmore">(｡・`ω´･){{showmore.title}}</div>
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex'
import BlogItem from '@/components/ListItem/BlogItem'
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
            blogList: [],
            tagList: [],
            page: {
                pagesize: 5,
                pagenum: 1
            },
            showmore: {
                isBottom: false,
                title: "点我查看更多！"
            }
        };
    },
    computed: {
        ...mapState('blog', {
            tagid: state => state.tagid
        }),
        getTag() {
            if (this.tagid) {
                let name = ''
                this.tagList.forEach(v => {
                    if (v.id == this.tagid) name = `#${v.name}#`
                })
                return name
            } else {
                return ''
            }
        }
    },
    watch: {
        tagid: {
            handler() {
                this.searchFromTag()
            }
        }
    },
    methods: {
        ...mapActions('blog', {
            setTagId: "setTagId"
        }),
        // 搜索所有
        handleSearchAll() {
            if(!this.tagid) return
            this.page.pagenum = 1
            this.blogList = []
            this.setTagId()
        },
        //根据标签搜索
        searchFromTag() {
            this.page.pagenum = 1
            this.blogList = []
            this.getBlogList()
        },
        // 查看更多
        handleShowMore() {
            if (this.showmore.isBottom) return;
            this.page.pagenum++;
            this.getBlogList();
        },
        async getBlogList(id) {
            try {
                let response = await getBlogListAPI({
                    tagid: this.tagid,
                    ...this.page
                });
                if (response.code == 35000) {
                    this.blogList.push(...response.data);
                    if (response.data.length < this.page.pagesize) {
                        this.showmore.isBottom = true;
                        this.showmore.title = "到底了！";
                    } else {
                        this.showmore.isBottom = false;
                        this.showmore.title = "点我查看更多！";
                    }
                } else {
                    this.$message.error(response.message);
                }
            } catch (err) {
                this.$message.error(err);
            }
        },
        async getBlogTag() {
            try {
                let response = await getBlogTagAPI();
                if (response.code == 35000) {
                    this.tagList = response.data;
                } else {
                    this.$message.error(response.message);
                }
            } catch (err) {
                this.$message.error(err);
            }
        },
        async initData() {
            this.getBlogTag()
            this.getBlogList();
        }
    },
    mounted() {
        this.initData()
    }
};
</script>

<style lang="scss" scoped>
.home {
    &-head {
        width: 100%;
        height: 48px;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

        p {
            height: 100%;
            margin-left: 10px;
            padding: 0 15px;
            line-height: 48px;
            color: #99a2aa;
            font-size: 14px;
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;

            &:hover {
                color: #00a1d6;
            }
        }

        .selected {
            border-bottom: 2px solid #00a1d6;
            color: #00a1d6;
        }

        span{
            font-size: 14px;
            margin-left: 20px;
            color: #eb7350;
        }
    }

    &-main {
        min-height: 50px;
        position: relative;

        &-li {
            width: 100%;
            position: relative;
            background: #fff;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 8px;
            padding: 12px 20px;
            box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
        }

        .showmore {
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &:hover {
                color: pink;
            }
        }
    }
}
</style>
