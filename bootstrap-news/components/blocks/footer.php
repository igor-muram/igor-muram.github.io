<footer class="footer">
	<a href="index.php" class="footer__logo"></a>

	<div class="footer-social">
		<ul class="footer-social__list">
			<li><a href="#!"><i class="fab fa-instagram"></i></a></li>
			<li><a href="#!"><i class="fab fa-facebook-f"></i></a></li>
			<li><a href="#!"><i class="fab fa-vk"></i></a></li>
			<li><a href="#!"><i class="fab fa-youtube"></i></a></li>
			<li><a href="#!"><i class="fab fa-twitter"></i></a></li>
			<li><a href="#!"><i class="fab fa-linkedin-in"></i></a></li>
		</ul>
	</div>

	<nav class="footer-nav">
		<ul class="footer-nav__list">
			<li><a href="index.html">Новости</a></li>
			<? if (isset($_SESSION['user'])) : ?>
				<li><a href="php/logout.php" class="registration-link">Выход</a></li>
			<? else : ?>
				<li><a href="#!" class="registration-link">Регистрация</a></li>
				<li><a href="#!" class="authorization-link">Авторизация</a></li>
			<? endif; ?>
			<li><a href="#!" class="contact-link">Написать</a></li>
		</ul>
	</nav>
</footer>