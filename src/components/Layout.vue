<template>
	


	<el-container>
		<!-- 顶部菜单 -->
		<el-header>
			<NavBar></NavBar>
		</el-header>

		<el-container>
			<!-- 侧边栏菜单 -->
			<el-aside width="200px">
				<LeftMenu></LeftMenu>
			</el-aside>
			<!-- 主题内容 -->
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
	
</template>

<script>
	import NavBar from '@/components/NavBar.vue'
	import LeftMenu from '@/components/LeftMenu.vue'

	export default {
		components: {
			NavBar,
			LeftMenu
		}
	}
</script>

<style>
	
</style>
