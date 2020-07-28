<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>分类列表</span>
			</div>
			<!-- 树形组件 -->
			<el-tree ref="tree" :load="loadNode" node-key="id" lazy :default-expanded-keys="[0]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button type="text" icon="el-icon-edit" :disabled="node.level==1" size="mini" @click.stop="() => openEditModal(node,data)">
							编辑
						</el-button>
						<el-button type="text" icon="el-icon-plus" size="mini" @click.stop="() => openInsertModal(node,data)">
							添加
						</el-button>
						<el-button type="text" icon="el-icon-delete" size="mini" @click.stop="() => remove(node, data)">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" :visible.sync="insertModalShow">
			<el-form :model="insertForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow = false">取 消</el-button>
				<el-button type="primary" @click="handleInsertNode">添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑分类" :visible.sync="editModalShow">
			<el-form :model="editForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button type="primary" @click="edit">保 存</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import { Category } from '@/api/index.js';
	export default {
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				insertForm: {
					name: '',
					parent_id: '',
				},
				editForm: {
					id: '',
					name: '',
					parent_id: '',
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				insertModalShow: false,
				editModalShow: false,
			};
		},
		methods: {
			//删除
			remove(node, data) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					console.log(data.id)
					// let id = data;
					let { status, msg } = await Category.remove({ ...data })
					if (status) {
						this.$message.success('删除成功');
					}
				}).catch(() => {
					this.$message.info('删除失败');
					console.log(data.id)
				});
			},
			async loadNode(node, resolve) {
				//节点对象+返回节点对象数据
				console.log(node, resolve);
				if (node.level == 0) {
					//返回
					return resolve([{ id: 0, name: "全部分类" }]);
				}
				console.log(node);
				//父级节点id
				let { id } = node.data;
				//获取子节点数据
				let { status, data } = await Category.subcate({ id })
				if (status) {
					return resolve(data);
				}
			},
			//打开编辑的madal
			openEditModal(node, data) {
				this.editForm = { ...data }
				this.node = node;
				this.editModalShow = true
			},
			//编辑节点
			async edit() {
				// 1.表单验证
				// 2.发送ajax
				let { status, msg, data } = await Category.edit({ ...this.editForm })
				if (status) {
					this.$message.success(msg);
					//更新tree节点
					this.node.data = this.editForm;
					this.editModalShow = false
				}
			},
			//打开添加的madal
			openInsertModal(node, data) {
				//node:节点对象；data:节点数据
				this.node = node;
				console.log(node, data)
				this.insertForm.parent_id = data.id
				this.insertModalShow = true
			},
			//插入节点
			async handleInsertNode() {
				//表单验证
				let { status, msg, data } = await Category.insert({ ...this.insertForm })
				if (status) {
					this.$message.success(msg);
					//更新tree节点
					this.$refs.tree.append({ ...data, ...this.insertForm }, this.node);
					this.insertModalShow = false
				}
			}
		}
	};
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
