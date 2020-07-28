<template>

	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑文章</span>
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
					<el-select @change="handleCate_1stChang" v-model="form.cate_1st" placeholder="请选择一级分类">
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

			<el-button type="primary" style="margin-left: 80px;" @click="submitForm('form')">保存修改</el-button>
		</el-form>

	</el-card>
	<!-- register -->
</template>

<script>
	import Upload from '@/components/Upload.vue'
	import { Article } from "@/api/index";
	import { Category } from '@/api/index'
	import E from 'wangeditor'
	export default {
		props: ['id'],
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
					avatar: '',
					content: '',
					main_photo: '',
				},
				options_1st: [],
				options_2nd: [],

			}
		},
		methods: {
			Success({ status, msg, data }) {
				console.log(data)
				this.form.main_photo = data
			},
			async loadSubcate(id) {
				let { status, data } = await Category.subcate({ id })
				return data;
			},
			//一级分类change
			async handleCate_1stChang(val) {
				let options = await this.loadSubcate(val)
				this.options_2nd = options
				this.form.cate_2nd = options[0].id
			},
			submitForm(formName) {
				this.$refs[formName].validate(async(valid) => {
					if (!valid) {
						return false
					}
					let { status, msg } = await Article.modify({ ...this.form }); //发送ajax
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
			},
			async loadInfo(id) {
				let { status, data } = await Article.edit({ id })
				if (status) {
					return data;
				}
			},
		},
		async mounted() {
			//获取一级分类
			this.options_1st = await this.loadSubcate(0);
			//获取详情
			let article = await this.loadInfo(this.id)
			this.form = article;
			//获取二级分类
			this.options_2nd = await this.loadSubcate(article.cate_1st);


			console.log(this.$refs.editor);
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.form.content = html
			}
			editor.create()
			editor.txt.html(this.form.content)
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
