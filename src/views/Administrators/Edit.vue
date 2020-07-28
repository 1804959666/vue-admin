<template>
	<div class="table">
		<div class="list">编辑管理员</div>
		<div class="floor1">
			<span style="margin-right: 5px;">用户名</span>
			<el-input v-model="input" placeholder="请输入内容" style="width: calc(100% - 60px);"></el-input>
		</div>
		<div class="floor1">
			<span style="margin-right: 5px; margin-left: 15px;">姓名</span>
			<el-input v-model="input" placeholder="请输入内容" style="width: calc(100% - 60px);"></el-input>
		</div>
		<div class="floor1">
			<span style="margin-right: 5px; margin-left: 15px;">性别</span>
			<template>
				<el-radio v-model="radio" label="1">男</el-radio>
				<el-radio v-model="radio" label="2">女</el-radio>
			</template>
		</div>
		<div class="floor1">
			<span style="margin-right: 5px; margin-left: 15px;">手机</span>
			<el-input v-model="input" placeholder="请输入内容" style="width: calc(100% - 60px);"></el-input>
		</div>
		<div class="floor1">
			<span style="margin-right: 5px; margin-left: 15px;">邮箱</span>
			<el-input v-model="input" placeholder="请输入内容" style="width: calc(100% - 60px);"></el-input>
		</div>
		<div class="floor1">
			<span style="margin-right: 5px; margin-left: 15px; float: left;">头像</span>
			<el-upload action="#" list-type="picture-card" :auto-upload="false">
				<i slot="default" class="el-icon-plus"></i>
				<div slot="file" slot-scope="{file}">
					<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
					<span class="el-upload-list__item-actions">
						<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
							<i class="el-icon-zoom-in"></i>
						</span>
						<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
							<i class="el-icon-download"></i>
						</span>
						<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
							<i class="el-icon-delete"></i>
						</span>
					</span>
				</div>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</div>
		<div class="floor1" style="margin-bottom: 50px;">
			<el-button type="primary" style="margin-left: 50px;">保存修改</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				input: '',
				radio: '1',
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false
			}
		},
		methods: {
			handleRemove(file) {
				console.log(file);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleDownload(file) {
				console.log(file);
			}
		}
	}
</script>

<style>
	.floor1 {
		width: 90%;
		margin: auto;
		/* height: 40px; */
		margin-top: 20px;
		line-height: 40px;
	}

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
