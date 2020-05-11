<template>
<div class="linkmanage">
    <h1>友情链接管理</h1>
    <div class="linkmanage-submit">
        <el-upload class="upload" action :show-file-list="false" :before-upload="beforeUpload">
            <el-button plain>{{submitInfo.bg ? '重新上传' : '上传图片'}}</el-button>
        </el-upload>
        <img v-if="submitInfo.bg" class="bg" :src="submitInfo.bg | galleryImgFilter" alt="">
        <el-input class="ipt" v-model="submitInfo.name" placeholder="请输入标题"></el-input>
        <el-input class="ipt" v-model="submitInfo.desc" placeholder="描述"></el-input>
        <el-input class="ipt" v-model="submitInfo.url" placeholder="请输入链接地址"></el-input>
        <el-select class="ipt" v-model="submitInfo.tagid" placeholder="请选择标签">
            <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
        </el-select>
        <el-button @click="handleSubmit" class="btn" type="primary" plain>提交</el-button>
    </div>
    <image-cropper v-if="showImageCropper" :cropperImg="cropperImg" @closeCropper="closeCropper" @cropperSuccess="cropperSuccess" />
</div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import {
    uploadAPI
} from "@/api/common";
import {
    addLinkAPI,
    getLinkTagAPI
} from "@/api/link";
import {
    galleryImgFilter
} from "@/filters";
export default {
    components: {
        ImageCropper
    },
    filters: {
        galleryImgFilter
    },
    data() {
        return {
            submitInfo: {
                name: '',
                desc: '',
                bg: '',
                url: '',
                tagid: ''
            },
            tagList: [],
            showImageCropper: false,
            cropperImg: '',
        };
    },
    methods: {
        clearSubmit() {
            for (let key in this.submitInfo) {
                this.submitInfo[key] = ''
            }
        },
        // 提交
        handleSubmit() {
            for (let key in this.submitInfo) {
                if (!this.submitInfo[key]) {
                    return
                }
            }
            this.addLink()
        },
        // 裁剪成功
        cropperSuccess(file) {
            let formData = new FormData();
            formData.append('file', file)
            this.showImageCropper = false
            this.upload(formData)
        },
        // 取消裁剪
        closeCropper() {
            this.showImageCropper = false
        },
        beforeUpload(file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            let _this = this
            reader.onload = function () {
                _this.cropperImg = reader.result //获取到base64格式图片
                _this.showImageCropper = true
            }
            return false
        },
        // 上传图片
        async upload(file) {
            try {
                let response = await uploadAPI(file);
                if (response.code == 35000) {
                    this.submitInfo.bg = response.data.url
                } else {
                    this.$message.error(response.message);
                }
            } catch (err) {
                this.$message.error(err);
            }
        },
        // 添加链接
        async addLink(file) {
            try {
                let response = await addLinkAPI({
                    ...this.submitInfo
                });
                if (response.code == 35000) {
                    this.$message.success('添加成功')
                    this.clearSubmit()
                } else {
                    this.$message.error(response.message);
                }
            } catch (err) {
                this.$message.error(err);
            }
        },
        // 获得链接标签列表
        async getLinkTag(file) {
            try {
                let response = await getLinkTagAPI();
                if (response.code == 35000) {
                    this.tagList = response.data
                } else {
                    this.$message.error(response.message);
                }
            } catch (err) {
                this.$message.error(err);
            }
        }
    },
    mounted() {
        this.getLinkTag()
    },
};
</script>

<style lang="scss" scoped>
.linkmanage {
    width: 100%;
    max-width: 800px;
    min-height: 100vh;
    padding: 84px 20px 20px;
    margin: 0 auto;

    &-submit {
        max-width: 100%;

        .ipt {
            width: 100%;
            margin-top: 20px;
        }

        .upload {
            margin-top: 20px;
        }

        .btn {
            margin-top: 20px;
            width: 100%;
        }

        .bg {
            width: 50%;
            margin-top: 20px;
        }
    }
}
</style>
