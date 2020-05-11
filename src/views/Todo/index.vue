<template>
<div class="todo">
    <el-button class="todo-addbtn" @click="handleAdd" type="primary">添加任务</el-button>
    <el-table :data="todoList" border style="width: 100%">
        <el-table-column prop="id" label="Id" align="center" width="80"></el-table-column>
        <el-table-column prop="name" label="名稱" align="center"></el-table-column>
        <el-table-column prop="content" label="內容" align="center"></el-table-column>
        <el-table-column prop="deadline" label="日期" align="center"></el-table-column>
        <el-table-column label="状态" align="center" width="200">
            <template slot-scope="scope">
                {{status[scope.row.status]}}
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
            <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
                <el-button @click="handleComplate(scope.row.id)" type="success" size="small">完成</el-button>
                <el-button @click="handleDel(scope.row.id)" type="danger" size="small">刪除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="添加任务" :visible.sync="showAddInfo" width="30%">
        <el-form label-position="right" label-width="80px" :model="createInfo">
            <el-form-item label="任务名称">
                <el-input v-model="createInfo.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="任务內容">
                <el-input v-model="createInfo.content" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="截止時間">
                <el-date-picker v-model="createInfo.deadline" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showAddInfo = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    todoCreateAPI,
    getTodoListAPI,
    updateTodoAPI,
    updateStatusTodoAPI
} from "@/api/todo";
export default {
    data() {
        return {
            showAddInfo: false,
            todoList: [],
            createInfo: {},
            totalCount: 0,
            page: {
                pagesize: 10,
                pagenum: 1
            },
            status: {
                1: "代办",
                2: "已完成",
                3: "已删除"
            }
        };
    },
    methods: {
        // 添加
        handleAdd() {
            this.createInfo = {
                name: "",
                deadline: "",
                content: ""
            };
            this.showAddInfo = true;
        },
        // 編輯
        handleEdit(info) {
            this.createInfo = info;
            this.showAddInfo = true;
        },
        // 完成
        handleComplate(id) {
            let data = {
                id: id,
                status: 2
            };
            this.updateStatusTodo(data);
        },
        // 刪除
        handleDel(id) {
            let data = {
                id: id,
                status: 3
            };
            this.updateStatusTodo(data);
        },
        // 提交
        handleSubmit() {
            if (this.createInfo.id) {
                // 編輯
                this.updateTodo();
            } else {
                // 添加
                this.todoCreate();
            }
        },
        async updateStatusTodo(data) {
            try {
                let response = await updateStatusTodoAPI(data);
                if (response.code == 35000) {
                    this.getTodoList();
                } else {
                    this.$message.error(response.message);
                }
            } catch (err) {
                this.$message.error(err);
            }
        },
        async updateTodo() {
            try {
                let response = await updateTodoAPI(this.createInfo);
                if (response.code == 35000) {
                    this.getTodoList();
                    this.showAddInfo = false;
                } else {
                    this.$message.error(response.message);
                }
            } catch (err) {
                this.$message.error(err);
            }
        },
        async todoCreate() {
            try {
                let response = await todoCreateAPI(this.createInfo);
                if (response.code == 35000) {
                    this.getTodoList();
                    this.showAddInfo = false;
                } else {
                    this.$message.error(response.message);
                }
            } catch (err) {
                this.$message.error(err);
            }
        },
        async getTodoList(status) {
            try {
                let response = await getTodoListAPI({
                    status: status || -1,
                    ...this.page
                });
                this.todoList = response.data.rows;
                this.totalCount = response.data.count;
                console.log(todoList);
            } catch (err) {
                this.$message.error(err);
            }
        }
    },
    mounted() {
        this.getTodoList();
    }
};
</script>

<style scoped>
.todo {
    width: 100%;
    padding: 50px 5%;
}

.todo-addbtn {
    margin-bottom: 30px;
}
</style>
