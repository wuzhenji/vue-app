<template>
<div class="blogmanage">
    <div class="blogmanage-head">
        <p class="selected">写博客</p>
    </div>
    <div class="blogmanage-title">
        <el-input maxlength="20" class="blogmanage-title-input" :class="{'disabled': submitTip}" v-model="form.title" placeholder="请输入标题"></el-input>
        <el-select class="blogmanage-title-input" v-model="form.tagid" placeholder="请选择标签">
            <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
        </el-select>
    </div>
    <mavon-editor v-model="form.content" :codeStyle="'tomorrow-night'" ref="md" @change="change" style="min-height: 600px; z-index: 1" />
    <div class="blogmanage-submitbtn">
        <el-button class="submitbtn-btn" @click="submit" plain>提交</el-button>
    </div>
</div>
</template>

<script>
import {
    addBlogAPI,
    getBlogTagAPI
} from "@/api/blog";
import {
    mavonEditor
} from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
    components: {
        mavonEditor
    },
    data() {
        return {
            submitTip: false,
            tagList: [],
            form: {
                title: "",
                tagid: "",
                content: "", // 输入的markdown
                html: "" // 及时转的html
            }
        };
    },
    methods: {
        clearForm() {
            for (const key in this.form) {
                this.form[key] = "";
            }
        },
        // 所有操作都会被解析重新渲染
        change(value, render) {
            // render 为 markdown 解析后的结果[html]
            this.form.html = render;
            console.log(this.form)
        },
        // 提交
        submit() {
            if (this.form.title.trim() == "") {
                this.submitTip = true;
                return;
            }
            this.addBlog();
        },
        async addBlog() {
            try {
                let response = await addBlogAPI({
                    ...this.form
                });
                if (response.code == 35000) {
                    this.clearForm();
                    this.$router.push({
                        name: "BlogHome"
                    });
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
        }
    },
    mounted() {
        this.initData()
    },
};
</script>

<style lang="scss" scoped>
.blogmanage {
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
            margin-left: 20px;
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
    }

    &-title {

        &-input {
            width: 100%;
            margin-bottom: 8px;
        }

        .disabled /deep/.el-input__inner {
            border: 1px solid red !important;
        }
    }

    &-submitbtn {
        margin: 20px 0;
        display: flex;
        justify-content: center;

        .submitbtn-btn {
            width: 200px;
            // float: right;
        }
    }
}
</style>
