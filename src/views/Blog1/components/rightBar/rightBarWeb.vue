<template>
<div class="rightbar">
    <div class="rightbar-poem part">
        <p>楼道角落里阳光每天盛开</p>
        <p>你很久前也在</p>
        <p>很久前的花肥肥地开在窗外</p>
        <p>你很久前也毛茸茸地在窗里开</p>
        <p>它们为什么能长盛不衰</p>
        <p>我们为什么屡战屡败</p>
        <p>——冯唐《记梦》</p>
    </div>
    <div class="rightbar-tag part">
        <div class="rightbar-tag-title"><i class="el-icon-s-flag"></i>标签云</div>
        <span @click="handleChoseTag(item.id)" v-for="item in tagList" :key="item.id">#{{item.name}}#</span>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex'
import {
    getBlogTagAPI
} from '@/api/blog'
export default {
    components: {},
    data() {
        return {
            tagList: [],
            audiosrc: require("./../../../../assets/audio/BlindingLights.mp3")
        };
    },
    watch: {},
    computed: {},
    methods: {
        ...mapActions('blog', {
            setTagId: "setTagId"
        }),
        handleChoseTag(id) {
            this.setTagId(id)
            this.$router.push({
                name: 'BlogHome'
            })
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
    }
};
</script>

<style lang="scss" scoped>
.rightbar {
    .part {
        width: 100%;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 8px;
        padding: 12px 16px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
    }

    &-poem {

        font-size: 14px;
    }

    &-tag {

        &-title {
            font-size: 18px;
            margin-bottom: 10px;
        }

        span {
            color: #eb7350;
            margin: 5px 15px 0 0;
            cursor: pointer;
            font-size: 15px;
            float: left;
        }
    }
}
</style>
