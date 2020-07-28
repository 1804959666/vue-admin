<template>
	<div class="counter">
		<button type="button" class="decrease" @click="handleDecrease">-</button>
		<span class="number" >{{value}}</span>
		<button type="button" class="increase" @click="handleIncrease">+</button>
	</div>
</template>

<script>
	export default{
		props: ['value', 'min', 'max', 'step'],
		methods: {
			handleIncrease() {
				if (this.value < this.max) {
					var step=this.step;
					this.$emit('up',step);
				}
			},
			handleDecrease() {
				if (this.value > this.min) {
					var step=this.step;
					this.$emit('down',step);
				}
			},
		},
	}
</script>

<style>
	.counter {
		display: flex;
		align-items: center;
		width: 200px;
	}
	
	.counter .decrease,
	.counter .increase {
		padding: 6px 20px;
		border: 1px solid #999999;
		border-radius: 3px;
		font-size: 18px;
		cursor: pointer;
	}
	
	.counter .decrease {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	
	.counter .increase {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	
	.counter .number {
		padding: 6px;
		text-align: center;
		min-width: 100px;
		border-top: 1px solid #999999;
		border-bottom: 1px solid #999999;
	}
</style>
