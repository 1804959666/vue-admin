<template>
	<div class="user-list">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
				<!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
			</div>
			<!-- <div>用户列表</div> -->
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="id" label="#" width="180">
				</el-table-column>
				<el-table-column prop="username" label="用户名" width="180">
				</el-table-column>
				<el-table-column prop="nickname" label="昵称">
				</el-table-column>
				<el-table-column prop="sex" label="性别">
				</el-table-column>
				<el-table-column prop="tel" label="手机">
				</el-table-column>
				<el-table-column label="操作" width="230">
					<template slot-scope="scope">
						<router-link :to="{name:'UserEdit',params:{id:scope.row.id}}">
							<el-button type="primary" plain icon="el-icon-edit" size="mini">
								编辑
							</el-button>
						</router-link>
						<!-- <el-button type="primary" plain icon="el-icon-edit" size="mini">
							<router-link to="/user/edit">编辑</router-link>
						</el-button> -->
						<el-button type="danger" plain icon="el-icon-delete" size="mini" @click="removeUser(scope.row.id,scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>

</template>

<script>
	import { UserList } from "@/api/index";
	export default {
		data() {
			return {
				tableData: []
			}
		},
		created() {
			//获取列表数据
			this.userlist();
			// this.loadInfo(this.$route.params.id)
		},
		methods: {
			async userlist() {
				// this.isloading = true;
				let { status, data } = await UserList.list({}); //调用
				if (status) {
					this.tableData = data;
				}
			},
			removeUser(id, i) {
				console.log(id)
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						type: 'warning'
					}).then(async () => {
						let { status } = await UserList.remove(id);
						if (status) {
							//更新Dom
							this.$message.success("删除成功");
							this.tableData.splice(i, 1)
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
	.user-list a {
		/* color: #409EFF ; */
	}
</style>
