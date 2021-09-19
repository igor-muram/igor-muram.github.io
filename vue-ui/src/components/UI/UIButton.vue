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
	transition: all .3s ease
	&:active, &:hover
		color: #fff
	&:hover
		background: lighten(teal, 5%)
	&:active
		background: lighten(teal, 10%)
	& + .button
		margin-left: 15px
	&--right
		align-self: flex-end
</style>
