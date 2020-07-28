<template>
	<!-- <div> -->
		<!-- <nav>
			<router-link to="/acticle/list" exact active-class="current">文章列表</router-link>
			<router-link to="/acticle/release" exact active-class="current">文章发布</router-link>
			<router-link to="/login" exact active-class="current">登录</router-link>
			<router-link to="/register" exact active-class="current">注册</router-link>
		</nav> -->
		<router-view></router-view>
	<!-- </div> -->
</template>

<script>
	export default { 
		name: 'app',
	}
</script>

<style>
	/* 公共类 */
	body,
	html {
		padding: 0;
		margin: 0;
		height: 100%;
		width: 100%;
	}

	a {
		text-decoration: none;
		color: #666;
	}
	/* nav{
		padding: 30px;
	}
	nav a{
		margin: 0 30px;
	}
	nav a.current{
		color: orange;
		font-weight: bold;
	} */
</style>
