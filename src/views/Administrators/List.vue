<template>
	<div class="table">
		<div class="list">管理员列表</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="date" label="#" width="150">
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="150">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="150">
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="150">
			</el-table-column>
			<el-table-column prop="tal" label="手机">
			</el-table-column>
			<el-table-column prop="emil" label="邮箱">
			</el-table-column>
			<el-table-column prop="img" label="头像">
				<img src="../../assets/img/avatar.jpg" alt="">
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
					username: 'admin',
					name:'赵薇',
					sex:'女',
					emil:'1804959666@qq.com',
					tal: '17860786131',
				},
				{
					date: '2',
					username: 'tom',
					name:'黄小米',
					sex:'女',
					emil:'1804959666@qq.com',
					tal: '17860786131',
				},
				{
					date: '3',
					username: 'moz',
					name:'罗志祥',
					sex:'男',
					emil:'1804959666@qq.com',
					tal: '17860786131',
				}]
			}
		}
	}
</script>

<style>
	
</style>
