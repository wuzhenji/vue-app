<template>
<div class="imgcropper">
    <div class="imgcropper-content">
        <vueCropper class="cropper" ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox"></vueCropper>
        <div class="imgcropper-content-btns">
            <el-button @click="$emit('closeCropper')" class="btn" plain>取消</el-button>
            <el-button @click="handleSuccess" class="btn" type="primary" plain>确定</el-button>
        </div>
    </div>
</div>
</template>

<script>
import {
    VueCropper
} from "vue-cropper";
export default {
    props: {
        cropperImg: {
            type: String,
            default: () => {
                return "";
            }
        },
        scale: {
            type: String,
            default: () => {
                return "1";
            }
        }
    },
    components: {
        VueCropper
    },
    data() {
        return {
            option: {
                img: "", // 裁剪图片的地址
                info: true, // 裁剪框的大小信息
                outputSize: 0.8, // 裁剪生成图片的质量
                outputType: "jpeg", // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                // autoCropWidth: 300, // 默认生成截图框宽度
                // autoCropHeight: 200, // 默认生成截图框高度
                fixedBox: true, // 固定截图框大小 不允许改变
                fixed: true, // 是否开启截图框宽高固定比例
                fixedNumber: [2, 1], // 截图框的宽高比例
                full: true, // 是否输出原图比例的截图
                canMoveBox: false, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: false, // 截图框是否被限制在图片里面
                infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            }
        };
    },
    methods: {
        handleSuccess() {
            this.$refs.cropper.getCropBlob(data => {
                let file = this.blobToFile(data, "123");
                this.$emit("cropperSuccess", file);
            });
        },
        blobToFile(theBlob, fileName) {
            theBlob.lastModifiedDate = new Date();
            theBlob.name = fileName;
            return theBlob;
        }
    },
    created() {
        this.option.img = this.cropperImg;
        // console.log(111, this.option.img);
    }
};
</script>

<style lang="scss" scoped>
.imgcropper {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: 1;

    &-content {
        width: 80%;
        margin: 100px auto 0;
        max-width: 300px;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;

        &-btns {
            width: 100%;
            margin-top: 30px;
            display: flex;
            align-content: center;
            justify-content: center;
        }
    }
}

.cropper {
    width: 260px!important;
    height: 260px!important;
    margin: 0 auto;

    &-btns {}
}
</style>
