<template>
	<div class="navbar">
		<div class="navbar-logo">
			<img src="../assets/img/navbar/logo.png" height="55px">
			<i class="el-icon-s-fold"></i>
		</div>
		<div class="navbar-select">
			<el-dropdown>
				<span class="el-dropdown-link">
					<!-- <el-avatar  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar> -->
					赵薇<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>修改信息</el-dropdown-item>
					<el-dropdown-item>退出系统</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
</script>

<style>
	.navbar {
		background-color: black;
		height: 55px;
		color: white;
		line-height: 55px;
		padding-left: 20px;
		display: flex;
		justify-content: space-between;
		padding-right: 20px;
	}

	.navbar-logo {
		height: 55px;
		box-sizing: border-box;
	}

	.el-icon-s-fold {
		position: absolute;
		top: 21px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #fff;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}
</style>
