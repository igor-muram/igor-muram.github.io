<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ui-button',
};
</script>

<style lang="sass">
.button
	padding: 10px 15px
	background: none
	border: 1px solid teal
	color: teal
	cursor: pointer
	display: inline-block
	user-select: none
	& + .button
		margin-left: 15px
	&--right
		align-self: flex-end
</style>
