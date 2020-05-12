<template>
<div class="blogitem-li">
    <div class="blogitem-li-avatar">
        <img src="@/assets/image/blog/theweeknd3.jpg" alt />
    </div>
    <div class="blogitem-li-auth">吴振吉</div>
    <div class="blogitem-li-meta">{{itemInfo.createdAt | getTimeDiff}}</div>
    <div class="blogitem-li-title">
        <span @click="handleSearchTag(itemInfo.tagid)">{{getTag(itemInfo.tagid)}}</span>
        {{itemInfo.title}}
    </div>
    <div v-html="itemInfo.html" class="blogitem-li-content"></div>
    <div class="blogitem-li-about">
        <span>
            <i class="el-icon-view"></i>
            2.3w
        </span>
        <span @click="handleShowComment">
            <i class="el-icon-chat-dot-round"></i>
            {{showComment ? '收起评论' : itemInfo.comment.length}}
        </span>
        <span>
            <i class="el-icon-star-off">1.2k</i>
        </span>
    </div>
    <transition name="fadeIn">
        <comment :commentId="itemInfo.id" :commentNum="itemInfo.comment.length" @addCommentNum="addCommentNum" v-if="showComment"></comment>
    </transition>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import Comment from "@/components/ListItem/Comment";
import Prism from "prismjs";

import {
    getTimeDiff
} from "@/filters";
export default {
    components: {
        Comment
    },
    props: {
        itemInfo: {
            type: Object,
            default: {}
        },
        tagList: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    filters: {
        getTimeDiff
    },
    computed: {},
    data() {
        return {
            showComment: false
        };
    },
    methods: {
        ...mapActions("blog", {
            setTagId: "setTagId"
        }),
        // vuex存储tagid
        handleSearchTag(id) {
            this.setTagId(id);
        },
        getTag(id) {
            let name = "";
            this.tagList.forEach(v => {
                if (v.id == id) name = `#${v.name}#`;
            });
            return name;
        },
        addCommentNum() {
            this.itemInfo.commentNum++;
        },
        handleShowComment() {
            this.showComment = !this.showComment;
        }
    },
    mounted() {
        Prism.highlightAll();
    }
};
</script>

<style lang="scss" scoped>
/deep/ pre {
    background: rgba($color: #000000, $alpha: 0.8) !important;
}

.blogitem-li {
    width: 100%;
    position: relative;
    background: rgba($color: #ffffff, $alpha: 0.8);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
    padding: 12px 20px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

    &-avatar {
        width: 48px;
        height: 48px;
        position: absolute;
        left: 17px;
        top: 25px;
        border-radius: 50%;
        border: 3px solid #ffffff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }

    &-auth {
        margin: 17px 0 0 56px;
        font-size: 16px;

        &:hover {
            color: #00b5e5;
        }
    }

    &-meta {
        margin: 5px 0 10px 56px;
        font-size: 12px;
        color: #99a2aa;

        &:hover {
            color: #ff85ad;
        }
    }

    &-title {
        font-size: 18px;
        font-weight: bold;

        span {
            font-weight: normal;
            color: #eb7350;
            margin-right: 15px;
            cursor: pointer;
        }
    }

    &-content {
        margin-top: 10px;

        /deep/ img {
            max-width: 100%;
        }
    }

    &-about {
        margin-top: 5px;
        display: flex;

        span {
            margin: 10px 40px 5px 0;
            font-size: 13px;
            color: #99a2aa;
            cursor: pointer;

            &:hover {
                color: #fb7299;
            }
        }
    }
}
</style>
