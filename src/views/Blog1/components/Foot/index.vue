<template>
<div class="foot">
    <span class="runtime">
        <i class="el-icon-thumb runtime-icon"></i>
        本博客已萌萌哒运行了 {{runtime}}
    </span>
</div>
</template>

<script>
export default {
    data() {
        return {
            timer: null,
            starttime: "2020-4-12 20:00:00",
            runtime: ""
        };
    },
    methods: {
        getRunTime() {
            let s1 = new Date(this.starttime);
            let s2 = new Date();
            let runTime = parseInt((s2.getTime() - s1.getTime()) / 1000);
            let day = Math.floor(runTime / 86400);
            runTime = runTime % 86400;
            let hour = Math.floor(runTime / 3600);
            runTime = runTime % 3600;
            let minute = Math.floor(runTime / 60);
            runTime = runTime % 60;
            let second = runTime;
            this.runtime = `${day}天${hour}小时${minute}分钟${second}秒`;
        }
    },
    mounted() {
        this.timer = setInterval(() => {
            this.getRunTime();
        }, 1000);
    },
    destroyed() {
        this.timer = null;
    }
};
</script>

<style lang="scss" scoped>
.foot {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 8px 20px;
    font-size: 16px;

    .runtime {
        position: relative;

        .runtime-icon {
            font-size: 18px;
            color: #00a1d6;
            position: absolute;
            left: -25px;
            margin-right: 10px;
            animation: rotatee 1s infinite;

            @keyframes rotatee {
                0% {
                    bottom: 0;
                }

                100% {
                    bottom: 5px;
                }
            }
        }
    }
}
</style>
