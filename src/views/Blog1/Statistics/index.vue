<template>
<div class="statistics">
    <div class="statistics-head">
        <p class="selected">统计</p>
    </div>
    <div class="statistics-main">
        <div id="echarts" class="echarts"></div>
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import {
    getBlogTagStatisticsAPI
} from "@/api/blog";
const echarts = require("echarts");
export default {
    components: {},
    data() {
        return {
            chartData: [],
            myChart: null
        };
    },
    computed: {
        ...mapState("app", {
            bodyWidth: state => state.bodyWidth
        }),
        getAllBogCount() {
            let num = 0;
            this.chartData.map(v => (num += v.value));
            return num;
        }
    },
    watch: {
        bodyWidth(val) {
            this.myChart.resize();
        }
    },
    methods: {
        drawChart() {
            this.myChart.setOption({
                backgroundColor: "#ffffff",
                title: {
                    text: "博客分类统计",
                    left: "center",
                    top: 20,
                    textStyle: {
                        color: "#cccccc"
                    }
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                visualMap: {
                    show: false,
                    min: 0,
                    max: this.getAllBogCount,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [{
                    name: "访问来源",
                    type: "pie",
                    radius: "65%",
                    center: ["50%", "50%"],
                    data: this.chartData.sort(function (a, b) {
                        return a.value - b.value;
                    }),
                    roseType: "radius",
                    label: {
                        color: "#333333"
                    },
                    labelLine: {
                        lineStyle: {
                            color: "#333333"
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    itemStyle: {
                        color: "red",
                        shadowBlur: 200,
                        shadowColor: "rgba(0, 0, 0, 0.5)"
                    },
                    animationType: "scale",
                    animationEasing: "elasticOut",
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }]
            });
        },
        async getBlogTagStatistics() {
            try {
                let response = await getBlogTagStatisticsAPI();
                if (response.code == 35000) {
                    this.chartData = response.data;
                } else {
                    this.$message.error(response.message);
                }
            } catch (err) {
                this.$message.error(err);
            }
        },
        async initData() {
            await this.getBlogTagStatistics();
            this.myChart = echarts.init(document.getElementById("echarts"));
            this.drawChart();
        }
    },
    mounted() {
        this.initData();
    }
};
</script>

<style lang="scss" scoped>
.statistics {
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

        span {
            font-size: 14px;
            margin-left: 20px;
            color: #eb7350;
        }
    }

    &-main {
        width: 100%;
        background: #ffffff;
        min-height: 50px;
        position: relative;

        .echarts {
            height: 700px;
        }
    }
}
</style>
