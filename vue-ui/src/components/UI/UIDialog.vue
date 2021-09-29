<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ui-dialog',
  mixins: [toggleMixin],
};
</script>

<style lang="sass" scoped>
.dialog
	display: flex
	position: fixed
	top: 0
	left: 0
	right: 0
	bottom: 0
	background: rgba(#000, .5)
	&__content
		margin: auto
		background: #fff
		border-radius: 12px
		min-height: 50px
		min-width: 320px
		padding: 20px
</style>
