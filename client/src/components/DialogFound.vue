<template>
    <div class="dialogFound">
        <el-dialog
            :title="dialog.title"
            :visible.sync="dialog.show"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :modal-append-to-body="false">
            <div class="form">
                <el-form 
                    ref="form"
                    :model="form" 
                    label-width="120px"
                    style="margin:10px;width:auto;">
                    <el-form-item label="收支类型">
                        <el-select v-model="form.type" placeholder="收支类型">
                            <el-option v-for="(item,index) in format_type" :key="index" :label="item" :value="item">
                                
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="describe" label="收支描述:">
                        <el-input type="describe" v-model="form.describe"></el-input>
                    </el-form-item>

                    <el-form-item prop="income" label="收入:">
                        <el-input type="income" v-model="form.income"></el-input>
                    </el-form-item>

                    <el-form-item prop="expend" label="支出:">
                        <el-input type="expend" v-model="form.expend"></el-input>
                    </el-form-item>

                    <el-form-item prop="cash" label="账户现金:">
                        <el-input type="cash" v-model="form.cash"></el-input>
                    </el-form-item>

                    <el-form-item label="备注:">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </el-form-item> 
                </el-form>
            </div>    
            
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name:"dialogFound",
        props:{
            dialog:Object,
            form:Object
        },
        data(){
            return {
                formData:{
                    type:"",
                    describe:"",
                    income:"",
                    expend:"",
                    cash:"",
                    remark:"",
                    id:""
                },
                format_type:[
                    "提现",
                    "提现手续费",
                    "充值",
                    "优惠券",
                    "充值礼券",
                    "转账"
                ]
            }
        }   
    }
</script>
<style>
</style>
