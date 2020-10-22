<template>
    <div class="fillcontain">
        <div>
            <el-form :inline="true">
                <el-form-item label="时间筛选">
                    <el-date-picker v-model="search_date.startDate" type="date" placeholder="开始时间"></el-date-picker> -- 
                    <el-date-picker v-model="search_date.endDate" type="date" placeholder="结束时间"></el-date-picker>
                    <!-- <el-date-picker
                      v-model="search_date.startDate"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker> -->
                </el-form-item>
                <el-form-item class="">
                    <el-button type="primary" size="mini" @click="handSearch">筛选</el-button>
                </el-form-item>
                <el-form-item class="addButton">
                    <el-button type="primary" size="mini" @click="handSave" v-if="user.identity == 'manager'">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table v-if="tableData.length>0" :data="tableData" border style="width: 100%" max-height="830">
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
                <el-table-column label="操作" align="center" v-if="user.identity == 'manager'">
                    <template slot-scope="scope" >
                    <el-button
                        type="warning"
                        size="small"
                        @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>     
        </div>
        <!-- 分页 -->
        <el-row>
            <el-col :span="24">
                <div class="pagination">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="pagination.page_index"
                      :page-sizes="pagination.page_sizes"
                      :page-size="pagination.page_size"
                      :layout="pagination.layout"
                      :total="pagination.total">
                    </el-pagination> 
                </div>
            </el-col>
        </el-row>
        <DialogFound :dialog="dialog" :form="form" @update="getProfile"></DialogFound>
    </div>
</template>
<script>
    import DialogFound from "../components/DialogFound.vue"
    export default {
        name:"foundList",
        components:{
            DialogFound
        },
        computed:{
            user(){
                return this.$store.getters.user;
            }
        },
        data(){
            return {
                tableData:[],// 点击分页后的表格数据
                allTableData:[],//表格数据
                searchTableData:[],//筛选后的表格数据
                pagination:{
                    page_index:1,//当前位于哪一页
                    total:0,//总数
                    page_size:10,//一页显示多少条
                    page_sizes:[5,10,15,20],//每页显示多少条
                    layout:"total, sizes, prev, pager, next, jumper"
                },
                search_date:{
                    startDate:"",//开始时间
                    endDate:""//结束时间
                },
                dialog:{
                    show:false,//弹框是否关闭  false：关闭，true:显示
                    title:"",//弹框的标题
                    option:""//弹框类型  add：添加，edit：编辑修改
                },
                form: {
                    type: "",//收支类型
                    describe: "",//收支描述
                    income: "",//收入
                    expend: "",//支出
                    cash: "",//账户金额
                    remark: "",//备注
                    id: ""//数据 ID
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
                    // this.tableData = res.data;
                    this.allTableData = res.data;
                    this.filterTableData = res.data;
                    //设置分页数据
                    this.setPagination();
                })
            },
            setPagination(){
                this.pagination.total = this.allTableData.length;
                this.pagination.page_index = 1;
                this.pagination.page_size = 5;

                this.tableData = this.allTableData.filter((item,index) =>{
                    return index < this.pagination.page_size;
                })
            },
            handleEdit(row){//编辑
                this.dialog = {
                    show:true,
                    title:"修改信息",
                    option: "edit"
                }
                this.form = {
                    type: row.type,
                    describe: row.describe,
                    income: row.income,
                    expend: row.expend,
                    cash: row.cash,
                    remark: row.remark,
                    id: row._id
                }
            },
            handleDelete(row){//删除
                console.log(row)
                this.$axios.delete('/api/profile/delete/' + row._id).then(res => {
                    this.$message("删除成功");
                    this.getProfile();
                });
            },
            handSave(){//添加
                this.dialog = {
                    show:true,
                    title:"添加信息",
                    option: "add"
                }
                this.form = {
                    type: "",
                    describe: "",
                    income: "",
                    expend: "",
                    cash: "",
                    remark: "",
                    id: ""
                }
            },
            handSearch(){//筛选
                if(!this.search_date.startDate || !this.search_date.endDate){
                    this.$message({
                        type:'warning',
                        message:"请选择筛选区间"
                    })
                    // this.getProfile();
                    return
                }

                let startTime = this.search_date.startDate.getTime();
                let endTime = this.search_date.endDate.getTime();
                this.allTableData = this.searchTableData.filter((item,index) => {
                    let date = new Date(item.date);
                    let time = date.getTime();
                    return time >= startTime && time <= endTime;
                })
                this.setPagination();
            },
            handleSizeChange(page_size){//选择每页显示多少条
                this.pagination.page_index = 1;
                this.pagination.page_size = page_size;
                this.tableData = this.allTableData.filter((item,index) => {
                    console.log(index)
                    console.log(page_size)
                    return index < page_size;
                })
                console.log(this.tableData)
            },
            handleCurrentChange(page){//切换页码
                
                let pageNum = this.pagination.page_size * (page - 1);//获取 点击的页码 开始数据的下标
                // 【第一种】
                // let table = this.allTableData.filter((item,index) => { //数据的
                //     return index >= pageNum;
                // })
                // this.tableData = table.filter((item,index) => {
                //     return index < this.pagination.page_size;
                // })
                // 【第二种】
                let total = this.pagination.page_size * page;
                let tables = [];
                for(let i = pageNum; i < total;i++){
                    if(this.allTableData[i]){
                        tables.push(this.allTableData[i])
                    }
                    this.tableData = tables;
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
/*.addButton{
    float: right;
}*/
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
