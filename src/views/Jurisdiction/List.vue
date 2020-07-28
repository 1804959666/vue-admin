<template>
	<div class="table" style="width: 50%;">
		<div class="list">
			文章列表
			<div style="float: right;">
				<el-button type="primary" icon="el-icon-circle-plus-outline">添加角色</el-button>
			</div>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="date" label="#" width="250">
			</el-table-column>
			<el-table-column prop="class" label="分类" width="250">
			</el-table-column>
			<el-table-column prop="operation" label="操作">
				<el-button type="primary" icon="el-icon-edit">编辑</el-button>
				<el-button type="danger" icon="el-icon-delete">删除</el-button>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
					date: '1',
					class: '超级管理员',
				}, {
					date: '2',
					class: '管理员',
				}, {
					date: '3',
					class: '编辑',
				}, ]
			}
		}
	}
</script>

<style>
</style>
