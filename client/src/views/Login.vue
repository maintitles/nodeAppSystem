<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">后台管理系统</span>
            </div>
        
            <el-form :rules="rules" :loginUser="loginUser" ref="loginUser" class="loginForm" label-width="60px">
                <el-form-item label="邮箱">
                    <el-input v-model="loginUser.email" placeholder="请输入email"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input placeholder="请输入密码" type="password" v-model="loginUser.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button >
                </el-form-item>
                <div class="tiparea">
                    <p>还没有账号？<router-link to="/register">注册</router-link></p>
                </div>
            </el-form>
        </section>
    </div>
</template>

<script>
    import jwt_decode from "jwt-decode";
    export default {
        name:"login",
        data() {
            return {
                loginUser:{
                    email:"",
                    password:""
                },
                rules:{
                    email:[
                        {
                            type:"email",
                            require:true,
                            message:"邮箱格式不正确",
                            trigger:"change"
                        }
                    ],
                    password:[
                        {require:true,message:"密码不能为空",trigger:"blur"},
                        {min:6,max:30,message:"长度在6到30个字符之间",trigger:"blur"}
                    ]
                } 
            }
        },
        methods:{
            submitForm(){
                this.$axios.post("/api/users/login",this.loginUser).then((res) => {
                    // 获取token 
                    console.log(res)
                    const { token } = res.data;
                    localStorage.setItem("eleToken",token);
                    const decoded = jwt_decode(token);//解析token
                    this.$router.push("/index");
                })
            }
        }
    }
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>

