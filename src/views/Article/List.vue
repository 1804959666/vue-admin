<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>文章列表</span>
				<!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
			</div>
			<!-- <div>文章列表</div> -->
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="id" label="#" width="100">
				</el-table-column>
				<el-table-column prop="cate_1st_name" label="一级分类" width="100">
				</el-table-column>
				<el-table-column prop="cate_2nd_name" label="二级分类">
				</el-table-column>
				<el-table-column label="主图" prop="img">
					<template scope="scope">
						<el-image :src="scope.row.main_photo" width="80"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="title" label="标题">
				</el-table-column>
				<el-table-column prop="daterel" label="发布日期">
				</el-table-column>
				<el-table-column prop="daterup" label="更新日期">
				</el-table-column>
				<el-table-column label="操作" width="230">
					<template slot-scope="scope">
						<router-link :to="{name:'ArticleEdit',params:{id:scope.row.id}}">
							<el-button type="primary" plain icon="el-icon-edit" size="mini">编辑</el-button>
						</router-link>
						<!-- <el-button type="primary" plain icon="el-icon-edit" size="mini">
							<router-link to="/user/edit">编辑</router-link>
						</el-button> -->
						<el-button type="danger" plain icon="el-icon-delete" size="mini" @click="remove(scope.row.id,scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>

</template>

<script>
	import { Article } from "@/api/index";
	export default {
		data() {
			return {
				tableData: [],
				// isLoading: false
			}
		},
		created() {
			//获取列表数据
			this.loadList();
		},
		methods: {
			async loadList() {
				// this.isloading = true;
				let { status, total, data } = await Article.list({ pagesize: 10, pageindex: 1 }); //调用
				if (status) {
					this.tableData = data;
				}
			},
			remove(id, i) {
				console.log(id)
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						type: 'warning'
					}).then(async () => {
						let { status } = await Article.remove({ id: id });
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
