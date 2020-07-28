<template>
	<div>
		<div>管理员角色</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#" >
			</el-table-column>
			<el-table-column prop="name" label="用户名" >
			</el-table-column>
			<el-table-column prop="pickname" label="昵称" >
			</el-table-column>
			<el-table-column prop="sex" label="性别" >
			</el-table-column>
			<el-table-column prop="phone" label="手机">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="200">
			</el-table-column>
			<el-table-column prop="avatar" label="头像" >
				<template scope="scope">
					<img :src="scope.row.avatar"  width="50">
				</template>
			</el-table-column>
			<el-table-column  label="操作" width="230">
				<el-button type="primary" plain icon="el-icon-edit" size="mini">编辑</el-button>
				<el-button type="danger" plain icon="el-icon-delete" size="mini">删除</el-button>
			</el-table-column>
		</el-table>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
					id: '1',
					name: 'admin',
					pickname:'赵薇',
					sex: '女',
					phone: ' 15863008280',
					email:'nn880328@126.com',
					avatar:require('@/assets/img/admin/psb.jpg'),
				}, {
					id: '2',
					name: 'tom',
					pickname:'黄小米',
					sex: '女',
					phone: ' 13475829262',
					email:'nn880328@126.com',
					avatar:require('@/assets/img/admin/psb.jpg'),
				},
				{
					id: '3',
					name: 'moz',
					pickname:'罗志祥',
					sex: '男',
					phone: ' 15863008280',
					email:'nn880328@126.com',
					avatar:require('@/assets/img/admin/psb.jpg'),
				}]
			}
		}
	}
</script>

<style>
</style>
