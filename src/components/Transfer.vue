<template>
	<div>
		<div>
			<div class="box">
				<div class="title">
					<input type="checkbox" v-model="checkedAll">列表1
				</div>
				<div class="title" v-for="(item,index) in form" :key="index" style="margin-top: 10px;">
					<input type="checkbox" v-model="item.checked">{{item.name}}
				</div>
			</div>
			<div class="box-content">
				<el-button type="primary" @click="left" icon="el-icon-caret-left"></el-button>
				<el-button type="primary" @click="right" icon="el-icon-caret-right"></el-button>
			</div>
			<div class="box box1">
				<div class="title">
					<input type="checkbox" v-model="checkedAll1">列表2
				</div>
				<div class="title" v-for="(item,index) in form_two" :key="index" style="margin-top: 10px;">
					<input type="checkbox" v-model="item.checked">{{item.name}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['form', 'form_two'],
		computed: {
			checkedAll: {
				get: function() {
					var num = 0;
					this.form.forEach(function(item, index) {
						if (item.checked) {
							num++;
						}
					});
					return num == this.form.length;
				},
				set: function(newValue) {
					this.form.forEach(function(item, index) {
						item.checked = newValue;
					});
				}
			},
			checkedAll1: {
				get: function() {
					var num = 0;
					this.form_two.forEach(function(item, index) {
						if (item.checked) {
							num++;
						}
					});
					return num == this.form_two.length;
				},
				set: function(newValue) {
					this.form_two.forEach(function(item, index) {
						item.checked = newValue;
					});
				}
			}
		},
		methods:{
			right(){
				this.$emit('right');
			},
			left(){
				this.$emit('left');
			}
		}
	};
</script>

<style>
	.box {
		width: 100px;
		/* height: 700px; */
		border: 1px solid #eee;
	}

	.box-content {
		position: absolute;
		left: 200px;
		top: 150px;
	}

	.box1 {
		position: absolute;
		top: 0;
		left: 400px;
	}
</style>
