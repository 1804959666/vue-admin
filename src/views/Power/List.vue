<template>
	<div class="user-edit">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>管理员角色</span>
				<el-button @click="openinsertModule" style="float: right" type="primary" plain size="mini">添加角色</el-button>
			</div>

			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="id" label="#">
				</el-table-column>

				<el-table-column prop="name" label="分类">
					<!-- <el-button type="primary" plain icon="el-icon-edit" size="mini"> -->
					<!-- </el-button> -->
				</el-table-column>

				<el-table-column label="操作" width="230">
					<template slot-scope="scope">
						<el-button type="primary" plain icon="el-icon-edit" size="mini" @click="open(scope.row.name,scope.row.id,scope.$index)">
							编辑
							<!-- <router-link to="/admin/edit">编辑</router-link> -->
						</el-button>
						<el-button type="danger" plain icon="el-icon-delete" size="mini" @click="removeRole(scope.row.id,scope.$index)">删除</el-button>
					</template>

				</el-table-column>
			</el-table>


		</el-card>
	</div>

</template>

<script>
	import { PowerList } from "@/api/index";
	export default {
		data() {
			return {
				tableData: []
			}
		},
		created() {
			//获取列表数据
			this.powerlist();
		},
		methods: {
			async powerlist() {
				// this.isloading = true;
				let { status, data } = await PowerList.list({}); //调用
				if (status) {
					this.tableData = data;
				}
			},
			//添加角色
			openinsertModule() {
				this.$prompt("请输入添加的角色名称", "添加角色", {
						inputPattern: /\S/,
						inputErrorMessage: '不能输入空白字符'
					}).then(async ({ value }) => {
						let { status, data } = await PowerList.insert({ name: value });
						if (status) {
							//更新Dom
							this.tableData.push({ name: value, ...data })
							this.$message.success("添加成功");
						}
					})
					.catch(() => {
						this.$message.info('取消添加');
					})
			},
			//删除
			removeRole(id, i) {
				console.log(id)
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						type: 'warning'
					}).then(async () => {
						let { status } = await PowerList.remove(id);
						if (status) {
							//更新Dom
							this.$message.success("删除成功");
							this.tableData.splice(i, 1)
						}
					})
					.catch(() => {
						this.$message.success("取消成功");
					})
			},
			open(name, id, i) {
				this.$prompt('请输入名称', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						inputValue: name
					})
					.then(async ({ value }) => {
						let { status } = await PowerList.edit(id, { name: value });
						if (status) {
							//更新Dom
							this.$message.success("修改成功");
							// this.tableData.splice(i, 1, this.value)
							this.tableData.forEach((item,index)=>{
								if(index == i){
									item.name = value
								}
							})
						}
					})
					.catch(() => {
						this.$message.success("取消成功");
					})
			}
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
