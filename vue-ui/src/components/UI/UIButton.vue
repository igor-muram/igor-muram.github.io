<template>
  <div class="button">
    <slot></slot>
  </div>
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
	&--right
		align-self: flex-end
</style>
