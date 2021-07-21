<?
require_once("php/news.php");
$news = getArticles(6);
?>

<main class="main">
	<div class="wrapper">

		<section id="news" class="news">
			<h1 class="news__title title">
				Новости спорта
			</h1>

			<div class="news-items">
				<?
				for ($i = 0; $i < count($news); $i++)
					require("templates/news-template.php");
				?>
			</div>

			<div class="news__more">
				<div class="news__btn btn btn--md">Еще новости</div>
			</div>
		</section>

	</div>

	<? if (isset($_SESSION['account_type']) && $_SESSION['account_type'] === 'admin') : ?>
		<div class="add-news-btn btn btn--md">Добавить новость</div>
	<? endif; ?>

	<?
	require_once("components/blocks/top.php");
	?>
</main>