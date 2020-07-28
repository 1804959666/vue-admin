<template>
	<div class="admin-list">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>管理员列表</span>
				<!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
			</div>
			<!-- <div>管理员列表</div> -->
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="id" label="#">
				</el-table-column>
				<el-table-column prop="username" label="用户名">
				</el-table-column>
				<el-table-column prop="fullname" label="昵称">
				</el-table-column>
				<el-table-column prop="sex" label="性别">
				</el-table-column>
				<el-table-column prop="tel" label="手机">
				</el-table-column>
				<el-table-column prop="email" label="邮箱" width="200">
				</el-table-column>
				<el-table-column prop="avatar" label="头像">
					<template scope="scope">
						<img :src="scope.row.avatar" width="50">
					</template>
				</el-table-column>
				<el-table-column label="操作" width="230">
					<template slot-scope="scope">
						<!-- <el-link href="`#/admin/edit/${scope.row.id}`">
							<el-button type="primary" plain icon="el-icon-edit" size="mini">
								编辑
							</el-button>
						</el-link> -->
						<router-link :to="{name:'AdminEdit',params:{id:scope.row.id}}">
							<el-button type="primary" plain icon="el-icon-edit" size="mini">
								编辑
							</el-button>
						</router-link>

						<el-button type="danger" plain icon="el-icon-delete" size="mini" @click="removeAdmin(scope.row.id,scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>

</template>

<script>
	import { Admin } from "@/api/index";
	export default {
		data() {
			return {
				tableData: []
			}
		},
		created() {
			this.adminList()
		},
		methods: {
			async adminList() {
				let { status, data } = await Admin.list({})
				if (status) {
					this.tableData = data;
				}
			},
			removeAdmin(id, i) {
				console.log(id)
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						type: 'warning'
					}).then(async () => {
						let { status } = await Admin.remove({ id: id });
						if (status) {
							//更新Dom
							this.$message.success("删除成功");
							this.tableData.splice(i, 1)
						} else {
							this.$message.success("删除失败");
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
</style>
