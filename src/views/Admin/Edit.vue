<template>

	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑管理员</span>
		</div>

		<el-form ref="form" :model="form" :rules="rules" label-width="80px">

			<el-form-item label="用户名" prop="username">
				<el-input v-model="form.username"></el-input>
			</el-form-item>

			<el-form-item label="姓名" prop="fullname">
				<el-input v-model="form.fullname"></el-input>
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

			<el-form-item label="邮箱" prop="email">
				<el-input v-model="form.email" :type="type"></el-input>
			</el-form-item>

			<el-form-item label="头像" prop="avatar">
				<!-- 需要定义:form="form" :type="type" form是下面daty里面的form对象 -->
				<Upload :form="form.avatar" :type="type" @success="Success" @remove="form.avatar = ''"></Upload>
				<!-- <el-upload class="avatar-uploader" action="/upload/common" :data="{type:'avatar'}" :show-file-list="false"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="form.avatar" :src="form.avatar" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload> -->
				<!-- <el-avatar :size="50" shape="square" :src="form.avatar"></el-avatar> -->
				<!-- <el-image style="width: 100px; height: 100px" :src="form.avatar" :fit="fit"></el-image> -->
			</el-form-item>

			<el-button type="primary" style="margin-left: 80px;" @click="submitForm('form')">保存修改</el-button>
		</el-form>

	</el-card>
	<!-- register -->
</template>

<script>
	// 将组建import进来
	import Upload from '@/components/Upload.vue'
	import { Admin } from '@/api/index.js'
	export default {
		// 注册组件
		components: {
			Upload
		},
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
			}
			return {
				// 定义type
				type: 'avatar',
				form: {
					username: '',
					fullname: '',
					sex: '',
					tel: '',
					email: '',
					avatar: '',
					imageUrl: '',
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},

					],

					fullname: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
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
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],

				}
			}
		},
		created() {
			//$route vs $routerc
			// console.log(this.$route)
			// console.log(this.$router)
			this.loadInfo(this.$route.params.id)
		},
		watch:{
			'$route'(to,from){
				let {id} = to.params;
				this.loadInfo(id)
				console.log(to);
				console.log(from)
			}
		},
		methods: {
			
			Success({ status, msg, data }) {
				console.log(data)
				this.form.avatar = data
			},
			//获取管理员的个人资料
			async loadInfo(id) {
				let { status, data } = await Admin.info({ id })
				if (status) {
					this.form = data
					// data.avatar = 'http://localhost:3001/' + data.avatar.replace("../", "");
				}
			},
			onSubmit() {
				console.log('submit!');
			},

			submitForm(formName) {
				this.$refs[formName].validate(async valid => {
					if (!valid) {
						return false;
					}
					let { status, msg } = await Admin.edit({ ...this.form }); //发送ajax
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

			// handleAvatarSuccess(res, file, fileList) {
			// 	if(res.status){
			// 		this.form.avatar = res.data;
			// 	}else{

			// 	}
			// },
			// beforeAvatarUpload(file) {
			// 	const isJPG = file.type === 'image/jpeg';
			// 	const isLt2M = file.size / 1024 / 1024 < 2;

			// 	if (!isJPG) {
			// 		this.$message.error('上传头像图片只能是 JPG 格式!');
			// 	}
			// 	if (!isLt2M) {
			// 		this.$message.error('上传头像图片大小不能超过 2MB!');
			// 	}
			// 	return isJPG && isLt2M;
			// }
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



	/* 上传头像 */
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
