<template>
	<div class="user-edit">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑用户</span>
			</div>
		
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
		
				<el-form-item label="用户名">
					<el-input v-model="form.username" disabled=""></el-input>
				</el-form-item>
		
				<el-form-item label="昵称" prop="name">
					<el-input v-model="form.nickname"></el-input>
				</el-form-item>
		
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="form.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
		
				<el-form-item label="手机" prop="tel">
					<el-input v-model="form.tel"></el-input>
				</el-form-item>
		
				<el-button type="primary" style="margin-left: 80px;" @click="submitForm('form')">保存修改</el-button>
			</el-form>
		
		
		</el-card>
	</div>
	
</template>

<script>
	import { UserList } from "@/api/index";
	export default {
		data() {
			var checkphone = (rule, value, callback) => {
				// let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
				if (value == "") {
					callback(new Error("请输入手机号"));
				} else if (!this.isCellPhone(value)) { //引入methods中封装的检查手机格式的方法
					callback(new Error("请输入正确的手机号!"));
				} else {
					callback();
				}
			};
			return {
				form: {
					// id:id,
					nickname: "",
					sex: "",
					tel: "",
					username: ""
				},
				rules: {
					
					name: [],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					tel: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							validator: checkphone,
							message: '请输入正确格式的手机号',
							trigger: 'blur'
						}
					],
					
				
				}
			}
		},
		created() {
			//获取列表数据
			this.loadInfo(this.$route.params.id)
		},
		methods: {
			async loadInfo(id) {
				let { status, data } = await UserList.info({ id })
				if (status) {
					this.form = data
					// data.avatar = 'http://localhost:3001/' + data.avatar.replace("../", "");
				}
			},
			submitForm(formName,id) {
				this.$refs[formName].validate(async valid => {
					if (!valid) {
						return false;
					}
					let { status, msg } = await UserList.edit( this.$route.params.id,{...this.form} ); //发送ajax
					if (status) {
						this.$message.success(msg);
						
					} else {
						this.$message.error(msg);
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			isCellPhone(val) {
				if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
					return false;
				} else {
					return true;
				}
			},
		}
	}
</script>

<style>
	.login-bg {
		width: 100%;
		height: 100%;
	}

	.user-edit a {
		/* color: #B3D8FF !important; */
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
		clear: both
	}

	.box-card {
		width: 100%;
	}

</style>
