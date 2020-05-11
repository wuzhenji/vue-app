<template>
<div class="comment">
    <div class="comment-write">
        <el-input class="write-name" :class="{'commenterr': commentInfoCheck.name}" maxlength="10" v-model="commentInfo.name" placeholder="请输入昵称"></el-input>
        <el-input class="write-email" :class="{'commenterr': commentInfoCheck.number}" maxlength="5" v-model="checkNumber.val" :placeholder="`${checkNumber.a} + ${checkNumber.b} = ？`"></el-input>
        <el-input class="write-content" :class="{'commenterr': commentInfoCheck.content}" maxlength="200" :rows="3" type="textarea" v-model="commentInfo.content" placeholder="请输入内容"></el-input>
        <el-button class="write-btn" @click="handleSubmitComment" type="primary">
            发表
            <br />评论
        </el-button>
    </div>
    <div class="comment-top">{{commentNum}} 条评论</div>
    <div class="comment-body">
        <div v-for="item in commentList" :key="item.id" class="comment-li">
            <div class="comment-li-name">
                <img src="@/assets/image/blog/user-avatar.jpg" alt />
                <span class="name">{{item.name}}</span>
                <span class="timediff">{{item.createdAt | getTimeDiff}}</span>
            </div>
            <div class="comment-li-content">{{item.content}}</div>
        </div>
    </div>
</div>
</template>

<script>
import {
    addBlogCommentAPI,
    getBlogCommentAPI
} from "@/api/blog";
import {
    getTimeDiff
} from "@/filters";
export default {
    props: {
        commentNum: {
            type: [Number],
            default: 0
        },
        commentId: {
            type: [String, Number],
            default: ""
        }
    },
    filters: {
        getTimeDiff
    },
    data() {
        return {
            commentList: [],
            commentInfo: {
                name: "",
                content: ""
            },
            checkNumber: {
                a: "",
                b: "",
                result: "",
                val: ""
            },
            commentInfoCheck: {
                name: false,
                number: false,
                content: false
            }
        };
    },
    methods: {
        getCheckNumber() {
            let a = Math.floor(Math.random() * 10) + 1;
            let b = Math.floor(Math.random() * 10) + 1;
            let result = a + b;
            this.checkNumber = {
                a,
                b,
                result
            };
        },
        clearCommentInfo() {
            for (let key in this.commentInfo) {
                this.commentInfo[key] = "";
            }
        },
        handleSubmitComment() {
            for (let key in this.commentInfo) {
                if (this.commentInfo[key].trim() == "") {
                    this.commentInfoCheck[key] = true;
                } else {
                    this.commentInfoCheck[key] = false;
                }
            }
            if (this.checkNumber.result == this.checkNumber.val) {
                this.commentInfoCheck.number = false;
            } else {
                this.commentInfoCheck.number = true;
            }
            for (let key in this.commentInfoCheck) {
                if (this.commentInfoCheck[key]) {
                    return;
                }
            }
            this.addBlogComment();
        },
        async addBlogComment() {
            try {
                let response = await addBlogCommentAPI({
                    id: this.commentId,
                    ...this.commentInfo
                });
                if (response.code == 35000) {
                    this.$message.success("评论成功！");
                    this.$emit('addCommentNum')
                    this.clearCommentInfo();
                    this.initData();
                } else {
                    this.$message.error(response.message);
                }
            } catch (err) {
                this.$message.error(err);
            }
        },
        async getBlogComment() {
            try {
                let response = await getBlogCommentAPI({
                    id: this.commentId
                });
                if (response.code == 35000) {
                    this.commentList = response.data;
                } else {
                    this.$message.error(response.message);
                }
            } catch (err) {
                this.$message.error(err);
            }
        },
        async initData() {
            this.commentId && this.getBlogComment();
            this.getCheckNumber();
        }
    },
    mounted() {
        this.initData();
    }
};
</script>

<style lang="scss" scoped>
.comment {
    margin-top: 20px;
    border-radius: 3px;
    border: 1px solid #ebebeb;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

    &-write {
        padding: 10px 20px;
        border-bottom: 1px solid #f6f6f6;
        position: relative;

        .write-name {
            width: calc(50% - 5px);
            float: left;
            margin-bottom: 10px;
        }

        .write-email {
            width: calc(50% - 5px);
            float: right;
            margin-bottom: 10px;
        }

        .write-content {
            width: calc(100% - 75px - 10px);
        }

        .write-btn {
            width: 75px;
            height: 75px;
            position: absolute;
            right: 20px;
            bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .commenterr /deep/.el-input__inner {
            border: 1px solid red !important;
        }

        .commenterr /deep/.el-textarea__inner {
            border: 1px solid red !important;
        }
    }

    &-top {
        height: 50px;
        padding: 0 20px;
        background: #fff;
        border-bottom: 1px solid #f6f6f6;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 15px;
        font-weight: bold;
    }

    &-body {
        padding: 0 20px 10px;

        .comment-li {
            padding: 12px 0 10px;
            font-size: 15px;
            border-top: 1px solid #f6f6f6;

            &:first-child {
                border-top: 0;
            }

            &-name {
                display: flex;
                align-items: center;
                position: relative;

                img {
                    width: 24px;
                    height: 24px;
                    margin-right: 10px;
                }

                .name {
                    width: 200px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                .timediff {
                    position: absolute;
                    right: 0;
                    font-size: 12px;
                    color: #99a2aa;
                }
            }

            &-content {
                margin: 10px 0 0 34px;
            }
        }
    }
}
</style>
