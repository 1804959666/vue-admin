<template>
	<div class="login-bg">
		<!-- <h4>登录</h4> -->

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>登录</span>
				<!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
			</div>

			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
				<el-form-item label="账户" prop="username">
					<el-input v-model="ruleForm.username" prefix-icon="el-icon-user" placeholder="请输入账户名!"></el-input>
					<!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
				</el-form-item>

				<el-form-item label="密码" prop="password">
					<el-input v-model="ruleForm.password" prefix-icon="el-icon-key" placeholder="请输入密码!" show-password></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="handleLogin('ruleForm')">登录</el-button>
				</el-form-item>
			</el-form>
			<div class="opreat">
				<router-link to="/register">注册账户</router-link>
				<router-link to="/register">忘记密码?</router-link>
			</div>
		</el-card>
		<!-- register -->
	</div>
</template>

<script>
	import { Admin } from "@/api/index";
	console.log(Admin);
	export default {
		data() {
			return {
				ruleForm: {
					username: "",
					password: ""
				},
				rules: {
					username: [{
						required: true,
						message: "请输入用户名",
						trigger: "blur"
					}],
					password: [{
						required: true,
						message: "请输入密码",
						trigger: "blur"
					}]
				}
			};
		},
		methods: {
			handleLogin(formName) {
				this.$refs[formName].validate(async valid => {
					if (!valid) {
						return false;
					}
					let { status, msg, data } = await Admin.login({ ...this.ruleForm }); //发送ajax
					// console.log(res)
					if (status) {
						//储存token、uid、role
						sessionStorage.token = data.token;
						sessionStorage.uid = data.id;
						sessionStorage.role = data.role;
						this.$message.success(msg);
						//是否有redirect参数？
						let { redirect } = this.$route.query;
						if (redirect) {
							this.$router.replace(redirect);
						} else {
							//跳转
							this.$router.replace('/article/list');
						}
					} else {
						this.$message.error(msg);
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	};
</script>
<!-- bool属性 -->
<!-- 独立一块作用域，只影响自己的作用域，不影响其他css -->
<style scoped>
	.login-bg {
		width: 100%;
		height: 100%;
		background: url(../assets/img/login-bg.jpg) no-repeat top center;
		background-size: cover;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both;
	}

	.login-bg .box-card {
		width: 380px;
		position: fixed;
		right: 100px;
		top: 50%;
		/* margin-top: -120px; */
		transform: translateY(-50%);
	}

	.opreat {
		display: flex;
		justify-content: space-between;
	}
</style>
