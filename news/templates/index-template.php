<?php
require_once("php/news.php");
$news = getArticles(0, 6);
?>

<main class="main">
	<div class="wrapper">

		<section id="news" class="news">
			<h1 class="news__title title">Новости</h1>

			<div class="news-items">
				<?php
				for ($i = 0; $i < count($news); $i++)
					require("templates/news-template.php");
				?>
			</div>

			<div class="news__more">
				<div class="news__btn btn btn--md" id="more-news-btn" count_show="6" count_add="3">Еще новости</div>
			</div>
		</section>

	</div>

	<?php if (isset($_SESSION['account_type']) && $_SESSION['account_type'] === 'admin') : ?>
		<div class="add-news-btn btn btn--md">Добавить новость</div>
	<?php endif; ?>

	<?php require_once("components/blocks/top.php"); ?>
</main>