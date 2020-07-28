<template>
	<Transfer @left="Left" @right="Right" :form="form" :form_two="form_two"></Transfer>
</template>

<script>
	import Transfer from '@/components/Transfer.vue'
	export default {
		// 注册组件
		components: {
			Transfer
		},
		data() {
			return {
				form: [{
					name: '备选项1',
					checked: false,
					isRemove: true
				}, {
					name: '备选项2',
					checked: false,
					isRemove: true
				}, {
					name: '备选项3',
					checked: false,
					isRemove: true
				}, {
					name: '备选项4',
					checked: false,
					isRemove: true
				}, {
					name: '备选项5',
					checked: false,
					isRemove: true
				}, ],
				form_two: []
			};
		},
		methods: {
			Right() {
				for (var i = 0; i < this.form.length; i++) {
					if (this.form[i].checked == true) {
						this.form[i].isRemove = false;
						this.form_two.push(this.form[i])
						this.form[i].checked = false
					} else {
						this.form[i].checked = false
						this.form[i].isRemove = true;
					}
				}
				for (var j = this.form.length - 1; j >= 0; j--) {
					if (this.form[j].isRemove == false) {
						this.form.splice(j, 1)
					}
				}
			},
			Left() {
				for (var i = 0; i < this.form_two.length; i++) {
					if (this.form_two[i].checked == true) {
						this.form_two[i].isRemove = false;
						this.form.push(this.form_two[i])
						this.form_two[i].checked = false
					} else {
						this.form_two[i].checked = false
						this.form_two[i].isRemove = true;
					}
				}
				for (var j = this.form_two.length - 1; j >= 0; j--) {
					if (this.form_two[j].isRemove == false) {
						this.form_two.splice(j, 1)
					}
				}
			}
		}
	}
</script>

<style>

</style>
