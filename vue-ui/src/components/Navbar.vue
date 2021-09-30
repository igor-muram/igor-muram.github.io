<template>
  <div class="navbar">
    <div class="logo" title="Главная" @click="$router.push('/')"></div>
    <div class="navbar__buttons">
      <ui-button @click="$router.push('/posts')">Посты</ui-button>
      <ui-button @click="$router.push('/about')">О приложении</ui-button>
      <ui-button @click="$router.push('/store')">Store</ui-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass">
.logo
	background: #999
	height: 37px
	width: 37px
	border-radius: 50px
	cursor: pointer

.navbar
	padding: 15px
	box-shadow: 2px 2px 4px gray
	display: flex
	align-items: center
	&__buttons
		margin-left: auto
</style>
