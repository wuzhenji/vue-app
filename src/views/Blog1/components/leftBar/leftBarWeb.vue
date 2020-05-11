<template>
<div class="leftbar">
    <div class="leftbar-user">
        <div class="leftbar-user-bg"></div>
        <div class="leftbar-user-name">@吴振吉</div>
        <div class="leftbar-user-avatar"><img src="@/assets/image/blog/theweeknd1.jpeg" alt=""></div>
        <div class="leftbar-user-count">
            <li>
                <span>30</span>
                <p>文章</p>
            </li>
            <li>
                <span>52</span>
                <p>说说</p>
            </li>
            <li>
                <span>1676</span>
                <p>评论</p>
            </li>
        </div>
    </div>
    <div class="leftbar-usersocial">
        <li>
            <i class="el-icon-chat-square"></i>15195035689@163.com
        </li>
        <li>
            <i class="el-icon-mobile-phone"></i>15195035689
        </li>
        <li>
            <i class="el-icon-chat-square"></i>15195035689@163.com
        </li>
    </div>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {}
};
</script>

<style lang="scss" scoped>
.leftbar {
    &-user {
        width: 100%;
        height: 188px;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 8px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
        position: relative;

        &-bg {
            width: 100%;
            height: 64px;
            background-image: url("./../../../../assets/image/blog/theweeknd2.jpg");
            background-position: center center;
            background-repeat: no-repeat;
            background-attachment: scroll;
            background-size: cover;
        }

        &-name {
            width: 60%;
            font-size: 16px;
            font-weight: 500;
            margin: 10px 0 0 80px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        &-avatar {
            width: 56px;
            height: 56px;
            position: absolute;
            left: 16px;
            top: 48px;
            border-radius: 50%;
            border: 3px solid #ffffff;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        &-count {
            margin: 0 30px;
            display: flex;

            li {
                width: 33.3%;
                display: flex;
                flex-direction: column;
                align-items: center;

                span {
                    padding-top: 25px;
                    font-weight: bold;
                    font-size: 14px;
                    color: #00a1d6;
                }

                p {
                    padding-top: 9px;
                    font-weight: bold;
                    font-size: 12px;
                    letter-spacing: 0;
                    color: #99a2aa;
                }
            }
        }
    }

    &-usersocial {
        width: 100%;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 8px;
        padding: 12px 16px;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

        li {
            height: 44px;
            line-height: 44px;
            border-bottom: 1px solid #f0f0f0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;

            i {
                margin-right: 5px;
            }
        }
    }
}
</style>
