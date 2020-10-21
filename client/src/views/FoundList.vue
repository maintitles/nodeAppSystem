<template>
    <div class="fillcontain">
        <div>
            <el-form :inline="true">
                <el-form-item label="时间筛选">
                    <el-date-picker v-model="search_date.startDate" type="date" placeholder="开始时间"></el-date-picker>--
                    <el-date-picker v-model="search_date.endDate" type="date" placeholder="结束时间"></el-date-picker>
                    <!-- <el-date-picker
                      v-model="search_date.startDate"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker> -->
                </el-form-item>
                <el-form-item class="addButton">
                    <el-button type="primary" @click="handSave">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-if="tableData.length>0" :data="tableData" border style="width: 100%" max-height="450">
            <el-table-column label="序号" type="index" align="center" width="70"></el-table-column>
            <el-table-column prop="date" label="创建时间" align="center" width="250">
                <template slot-scope="scope">
                    <!-- <el-icon name="time"></el-icon> -->
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
            <el-table-column prop="describe" label="收支描述" align="center" width="180"></el-table-column>
            <el-table-column prop="income" label="收入" align="center" width="170">
                <template slot-scope="scope">
                    <span style="color:#00d053">+ {{ scope.row.income }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="expend" label="支出" align="center" width="170">
                <template slot-scope="scope">
                    <span style="color:#f56767">- {{ scope.row.expend }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="cash" label="账户现金" align="center" width="170">
                <template slot-scope="scope">
                    <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                <el-button
                type="warning"
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <DialogFound :dialog="dialog" :form="form"></DialogFound>
    </div>
</template>
<script>
    import DialogFound from "../components/DialogFound.vue"
    export default {
        name:"foundList",
        components:{
            DialogFound
        },
        data(){
            return {
                tableData:[],
                search_date:{
                    startDate:"",
                    endDate:""
                },
                dialog:{
                    show:false,
                    title:"",
                    option:""
                },
                form: {
                    type: "",
                    describe: "",
                    income: "",
                    expend: "",
                    cash: "",
                    remark: "",
                    id: ""
                },
            }
        },
        created(){
            this.getProfile();
        },
        methods:{
            getProfile(){
                this.$axios("/api/profile")
                .then(res => {
                    console.log(res.data)
                    this.tableData = res.data;
                })
            },
            handleEdit(index,row){//编辑
                this.dialog = {
                    show:true,
                    title:"编辑信息",
                    option: "edit"
                }
            },
            handleDelete(index,row){//删除
                console.log(index,row)
            },
            handSave(){//添加
                this.dialog = {
                    show:true,
                    title:"添加信息",
                    option: "add"
                }
            }
        }
    }
</script>
<style scoped>
.fillcontain {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
}
.addButton{
    float: right;
}
</style>
