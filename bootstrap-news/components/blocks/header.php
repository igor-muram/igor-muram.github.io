<header class="header">
	<a href="index.php" class="header__logo"></a>

	<nav class="header-nav">
		<ul class="header-nav__list">
			<li><a href="index.php">Новости</a></li>
			<? if (isset($_SESSION['user'])) : ?>
				<li><a href="php/logout.php">Выход</a></li>
			<? else : ?>
				<li><a href="#!" class="registration-link">Регистрация</a></li>
				<li><a href="#!" class="authorization-link">Авторизация</a></li>
			<? endif; ?>
			<li><a href="#!" class="contact-link">Написать</a></li>

		</ul>

		<div class="header-nav__close">
			<div class="header-nav__close-line"></div>
			<div class="header-nav__close-line"></div>
		</div>
	</nav>

	<div class="header__burger burger">
		<div class="burger__line"></div>
		<div class="burger__line"></div>
		<div class="burger__line"></div>
	</div>
</header>