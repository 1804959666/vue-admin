<template>

	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>账户资料</span>
		</div>

		<el-form ref="form" :rules="rules" :model="form" label-width="80px">

			<el-form-item label="用户名" prop="username">
				<el-input v-model="form.username" disabled=""></el-input>
			</el-form-item>

			<el-form-item label="姓名" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>

			<el-form-item label="角色" prop="role">

				<el-select v-model="form.role">
					<el-option label="超级管理员" value="超级管理员" el-select></el-option>
					<el-option label="一般管理员" value="一般管理员"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="form.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="手机" prop="phone">
				<el-input v-model="form.phone"></el-input>
			</el-form-item>

			<el-form-item label="邮箱" prop="email">
				<el-input v-model="form.email"></el-input>
			</el-form-item>

			<el-form-item label="头像">
				<el-avatar :size="100" :src="form.avatar"></el-avatar>
			</el-form-item>

			<el-button type="primary" style="margin-left: 80px;" @click="submitForm('form')">修改资料</el-button>
		</el-form>

	</el-card>
</template>

<script>
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
					username: 'admin',
					name: '赵薇',
					role: '超级管理员',
					sex: '',
					phone: '15863008280',
					email: 'nn880@163.com',
					avatar: require('@/assets/img/admin/psb.jpg'),
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},

					],

					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
					],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					phone: [{
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

					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},

					],

				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
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

	a {
		/* color: black; */
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
