<template>
<div class="link">
    <div class="link-bg" :style="{'background-image': `url('${getCurBg}')`}"></div>
    <div v-for="item in linkList" :key="item.id" class="link-group">
        <div class="link-group-title">
            <h1>{{item.name}}</h1>
        </div>
        <div @click="handleGoLink(list.url)" v-for="list in item.links" :key="list.id" @mouseenter="curBg = list.bg" class="link-item">
            <div class="item-logo">
                <img :src="list.bg | galleryImgFilter" alt="">
            </div>
            <div class="item-right">
                <h2 :title="list.name" class="item-title">{{list.name}}</h2>
                <span :title="list.desc" class="item-desc">{{list.desc}}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    getLinkListAPI
} from "@/api/link";
import {
    galleryImgFilter
} from "@/filters";
export default {
    filters: {
        galleryImgFilter
    },
    data() {
        return {
            linkList: [],
            curBg: ""
        };
    },
    computed: {
        getCurBg() {
            let url = `http://123.57.211.30:3000/file/${this.curBg}`
            return url
        }
    },
    methods: {
        handleGoLink(url) {
            window.open(url, "_blank");    
        },
        async getLinkList() {
            try {
                let response = await getLinkListAPI();
                if (response.code == 35000) {
                    this.linkList = response.data;
                } else {
                    this.$message.error(response.message);
                }
            } catch (err) {
                this.$message.error(err);
            }
        }
    },
    mounted() {
        this.getLinkList();
    }
};
</script>

<style lang="scss" scoped>
.link {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;

    &-bg {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: -1;
        background: hotpink;
        background-size: cover;
        background-position: center;
        opacity: 0.5;
        transition: background 0.25s;
        filter: blur(100px);
    }

    &-group {
        width: 100%;

        &-title{
            margin: 20px;
        }

        .link-item {
            width: 280px;
            height: 84px;
            margin: 10px;
            padding: 10px;
            float: left;
            border-radius: 15px;
            transition: background .5s;
            cursor: pointer;
            display: flex;

            &:hover {
                background-color: skyblue;
            }

            &:hover .item-logo {
                border-radius: 15px;
            }

            .item-logo {
                width: 64px;
                height: 64px;
                border-radius: 50%;
                overflow: hidden;
                transition: border-radius .5s;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .item-right {
                width: calc(100% - 64px - 20px);
                margin: 0 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .item-title {
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    font-size: 22px;
                    font-weight: normal;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .item-desc {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>
