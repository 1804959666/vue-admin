<template>

	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>发布文章</span>
		</div>

		<el-form ref="form" :model="form" label-width="80px">

			<el-form-item label="标题">
				<el-input v-model="form.title"></el-input>
			</el-form-item>

			<el-form-item label="描述">
				<el-input v-model="form.description"></el-input>
			</el-form-item>

			<el-form-item label="分类">
				<el-col :span="6">
					<el-select v-model="form.cate_1st" placeholder="请选择一级分类">
						<el-option v-for="option in options_1st" :key="option.id" :label="option.name" :value="option.id" el-select></el-option>
					</el-select>
				</el-col>

				<el-col :span="6">
					<el-select v-model="form.cate_2nd" placeholder="请选择文章分类">
						<el-option v-for="option in options_2nd" :key="option.id" :label="option.name" :value="option.id" el-select></el-option>
					</el-select>
				</el-col>


			</el-form-item>


			<el-form-item label="主图">
				<!-- <el-avatar :size="50" shape="square" :src="form.avatar"></el-avatar> -->
				<Upload :form="form.main_photo" :type="type" @success="Success" @remove="form.main_photo = ''"></Upload>
			</el-form-item>

			<el-form-item label="内容" prop="content">

				<div ref="editor" style="text-align:left" v-model="form.content"></div>

				<!-- <div id="editor" style="text-align:left"></div> -->

			</el-form-item>

			<el-button type="primary" style="margin-left: 80px;" @click="submitForm('form')">发布文章</el-button>
		</el-form>

	</el-card>
	<!-- register -->
</template>

<script>
	import Upload from '@/components/Upload.vue'
	import { Category } from '@/api/index'
	import { Article } from '@/api/index'
	import E from 'wangeditor'
	export default {
		components: {
			Upload
		},
		data() {
			return {
				type: 'avatar',
				form: {
					title: '',
					description: '',
					cate_1st: '',
					cate_2nd: '',
					email: '',
					content: '',
					main_photo: '',
				},
				options_1st: [],
				options_2nd: [],
			}
		},
		methods: {
			async loadSubcate(id) {
				let { status, data } = await Category.subcate({ id })
				return data;
			},
			Success({ status, msg, data }) {
				console.log(data)
				this.form.main_photo = data
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						return false
					}
					// this.form.main_photo = this.form.avatar
					let { status, data,msg } = await Article.add({ ...this.form })
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

			handleAvatarSuccess(res, file) {
				console.log(res, file);
				this.form.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				console.log(file);
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		},
		watch: {
			"form.cate_1st": async function(val) {
				console.log(val)
				//获取二级分类
				let options = await this.loadSubcate(val)
				this.options_2nd = options
				//默认选中第一项
				this.form.cate_2nd = options[0].id
			},
		},
		async created() {
			let options = await this.loadSubcate(0) //.then((options) => {
			this.options_1st = options
			//})
			// this.loadInfo(this.id)
		},

		mounted() {
			// console.log(this.$refs.editor);
			var editor = new E(this.$refs.editor)
			//同步form数据
			editor.customConfig.onchange = (html) => {
				this.form.content = html
			}
			//配置图片上传
			// 配置服务器端地址
			editor.customConfig.uploadImgServer = '/upload/editor/';
			//配置自定义filename
			editor.customConfig.uploadFileName = 'file';
			//配置自定义header
			editor.customConfig.uploadImgHeaders = {
				'Authorization': `Bearer ${sessionStorage.token}`
			}
			//base64储存图片
			editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
			editor.create()
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
